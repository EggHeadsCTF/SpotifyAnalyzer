$(document).ready(() => {

    // function getText(divID) {
    //     var w = window.open("test.html");
    //     w.addEventListener("load", function() {
    //         var body = w.document.body;
    //         var div = document.getElementById(divID);
    //         var textContent = body.textContent || body.innerText;
    //         console.log(textContent);
    //     });
    // }
    
    $("#analyze").click(() => {
        console.log('good')
        let query = $('#input-album').val();
        $('#progress-bar').css('display', 'block');
        $('#statistics').css('display', 'none');
        $('#stat-list').empty();
        $.ajax({
            type: "POST",
            url: "/ajax",
            data: {uri: query},
            success: (result) => {
                console.log(result);
                if(result === 'invalid_url') {
                    $('#err').css('display', 'block');
                    $('#err-text').text('Invalid URL. Please enter a valid track/album URL')
                } else {
                    $('#err').css('display', 'none');
                    let info = result.trackInfo;
                    let stats = result.audioFeatures;

                    if(result.type === "track") {
                        let trackTitle = info.name;
                        let danceability = Math.round(stats.danceability * 100) + "%";
                        let energy = Math.round(stats.energy * 100) + "%";
                        let loudness = Math.round(Math.abs(-60 + Math.abs(stats.loudness))) + "dB";
                        let instrumentalness = Math.round(stats.instrumentalness * 100) + "%";
                        let speechiness = Math.round(stats.speechiness * 100) + "%";
                        let tempo = Math.round(stats.tempo) + 'bpm';
                        let trackHTML = `
                            <table class="table">
                            <thead>
                                <tr>
                                    <th>Track</th>
                                    <th>Danceability</th>
                                    <th>Energy</th>
                                    <th>Loudness</th>
                                    <th>Instrumentalness</th>
                                    <th>Speechiness</th>
                                    <th>Tempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>${trackTitle}</th>
                                    <td>${danceability}</td>
                                    <td>${energy}</td>
                                    <td>${loudness}</td>
                                    <td>${speechiness}</td>
                                    <td>${tempo}</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                        $('#stat-list').append(trackHTML);
                        $('#album').text(info.album.name);
                        $('#album-image').attr('src', info.album.images[1].url);
                    } else if(result.type == "album") {
                        if(info.length != stats.length) {
                            console.log("What the flippity fuck happened");
                        } else {
                            console.log(info);
                            let tableHead = `
                                <table class="table">
                                <thead>
                                    <tr>
                                        <th>Track</th>
                                        <th>Danceability</th>
                                        <th>Energy</th>
                                        <th>Loudness</th>
                                        <th>Instrumentalness</th>
                                        <th>Speechiness</th>
                                        <th>Tempo</th>
                                    </tr>
                                </thead>
                                <tbody id="table-rows">`;
                            $('#stat-list').append(tableHead);

                            for(let i = 0; i < stats.length; i++) {
                                console.log(i);
                                
                                let trackTitle = info[i].name;
                                let danceability = Math.round(stats[i].danceability * 100) + "%";
                                let energy = Math.round(stats[i].energy * 100) + "%";
                                let loudness = Math.round(Math.abs(-60 + Math.abs(stats[i].loudness))) + "dB";
                                let instrumentalness = Math.round(stats[i].instrumentalness * 100) + "%";
                                let speechiness = Math.round(stats[i].speechiness * 100) + "%";
                                let tempo = Math.round(stats[i].tempo) + 'bpm';
                                console.log(instrumentalness);
                                
                                let trackHTML = `
                                    <tr>
                                        <th>${trackTitle}</th>
                                        <td>${danceability}</td>
                                        <td>${energy}</td>
                                        <td>${loudness}</td>
                                        <td>${instrumentalness}</td>
                                        <td>${speechiness}</td>
                                        <td>${tempo}</td>
                                    </tr>`;

                                $('#table-rows').append(trackHTML);
                            }

                            $('#stat-list').append(`</tbody>
                                                    </table>`);
                        }

                        $('#album').text(info[0].album.name);
                        $('#album-image').attr('src', info[0].album.images[1].url);
                    }

                    /*
                    $('#danceability').text(stats.danceability);
                    $('#energy').text(stats.energy);
                    $('#loudness').text(Math.abs(-60 + Math.abs(stats.loudness)));
                    $('#instrumentalness').text(stats.instrumentalness);
                    $('#speechiness').text(stats.speechiness);
                    $('#tempo').text(stats.tempo + 'bpm'); */
                    //acousticness
                    

                    $('#statistics').css('display', 'block');
                    }
                    $('#progress-bar').css('display', 'none');
            }
        });
    });
});