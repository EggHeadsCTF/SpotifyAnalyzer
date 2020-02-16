$(document).ready(() => {

    $('#input-album').keypress(function (key) {
        //Enter key pressed
        if(key.which == 13)  {
           $('#analyze').click();
           return false;  
         }
       });  
    
    $("#analyze").click(() => {
        console.log('good')
        let query = $('#input-album').val();
        $('#analyze').attr('class', 'button is-medium is-rounded is-loading')
        //$('#progress-bar').css('display', 'block');
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
                    $('#err-text').text('Invalid URL. Please enter a valid track/album URL');
                } else if(result === 'api_error') {
                    $('#err').css('display', 'block');
                    $('#err-text').text('Error occurred. Please make sure you entered a valid track/album URL');
                } else {
                    $('#err').css('display', 'none');
                    let info = result.trackInfo;
                    let stats = result.audioFeatures;

                    // Server sends track obj
                    if(result.type === "track") {
                        let trackTitle = info.name;
                        let danceability = Math.round(stats.danceability * 100) + "%";
                        let energy = Math.round(stats.energy * 100) + "%";
                        let loudness = Math.round(Math.abs(-60 + Math.abs(stats.loudness))) + "dB";
                        let instrumentalness = Math.round(stats.instrumentalness * 100) + "%";
                        let speechiness = Math.round(stats.speechiness * 100) + "%";
                        let tempo = Math.round(stats.tempo) + 'bpm';
                        let trackHTML = `
                            <div class="container">
                                <b><p class="heading" style="font-size: 1.3em">Track</p></b>
                                <b><p class="title" id="track">${trackTitle}</p></b>
                                <br><br>

                                <div class="level">
                                    <div class="level-item">
                                        <div>
                                            <b><p class="heading">Danceability​​​     </p></b><br>
                                            <p class="title" id="track">${danceability}</p>
                                        </div>
                                    </div>
                                    <div class="level-item">
                                        <div>
                                            <b><p class="heading">Energy     </p></b><br>
                                            <p class="title" id="track">${energy}</p>
                                        </div>
                                    </div>
                                    <div class="level-item">
                                        <div>
                                            <b><p class="heading">Loudness     </p></b><br>
                                            <p class="title" id="track">${loudness}</p>
                                        </div>
                                    </div>
                                    <div class="level-item">
                                        <div>
                                        <b><p class="heading">Instrumentalness     </p></b><br>
                                        <p class="title" id="track">${instrumentalness}</p>
                                        </div>
                                    </div>
                                    <div class="level-item">
                                        <div>
                                        <b><p class="heading">Speechiness     </p></b><br>
                                        <p class="title" id="track">${speechiness}</p>
                                        </div>
                                    </div>
                                    <div class="level-item">
                                        <div>
                                        <b><p class="heading">Tempo     </p></b><br>
                                        <p class="title" id="track">${tempo}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

                        $('#stat-list').append(trackHTML);

                        $('#album').text(info.album.name);
                        console.log(info.album.artists[0].name);
                        $('#artist').text(info.album.artists[0].name);
                        $('#album-image').attr('src', info.album.images[1].url);
                    } 
                    // Server sends album obj
                    else if(result.type == "album") {
                        if(info.length != stats.length) {
                            console.log("What the flippity fuck happened");
                        } else {
                            console.log(info);

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
                                    <div class="container">
                                        <b><p class="heading" style="font-size: 1.3em;">Track</p></b>
                                        <b><p class="title" id="track">${trackTitle}</p></b>
                                        <br><br>

                                        <div class="level">
                                            <div class="level-item">
                                                <div>
                                                    <b><p class="heading">Danceability​​​     </p></b><br>
                                                    <p class="title" id="track">${danceability}</p>
                                                </div>
                                            </div>
                                            <div class="level-item">
                                                <div>
                                                    <b><p class="heading">Energy     </p></b><br>
                                                    <p class="title" id="track">${energy}</p>
                                                </div>
                                            </div>
                                            <div class="level-item">
                                                <div>
                                                    <b><p class="heading">Loudness     </p></b><br>
                                                    <p class="title" id="track">${loudness}</p>
                                                </div>
                                            </div>
                                            <div class="level-item">
                                                <div>
                                                <b><p class="heading">Instrumentalness     </p></b><br>
                                                <p class="title" id="track">${instrumentalness}</p>
                                                </div>
                                            </div>
                                            <div class="level-item">
                                                <div>
                                                <b><p class="heading">Speechiness     </p></b><br>
                                                <p class="title" id="track">${speechiness}</p>
                                                </div>
                                            </div>
                                            <div class="level-item">
                                                <div>
                                                <b><p class="heading">Tempo     </p></b><br>
                                                <p class="title" id="track">${tempo}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br><br><br><br><br><br>`;

                                $('#stat-list').append(trackHTML);
                            }
                        }

                        $('#album').text(info[0].album.name);
                        $('#artist').text(info[0].album.artists[0].name);
                        console.log(info[0].album.artists[0].name);
                        $('#album-image').attr('src', info[0].album.images[1].url);
                    }
                    // Server sends playlist obj
                    else if(result.type == "playlist") {
                        let tracks = result.trackInfo.tracks;
                        let playlistInfo = result.playlistInfo;
                        let stats = result.audioFeatures.audio_features;
                        
                        for(let i = 0; i < tracks.length; i++) {
                            
                            let trackTitle = tracks[i].name;
                            let trackArtist = tracks[i].artists[0].name;
                            let danceability = Math.round(stats[i].danceability * 100) + "%";
                            let energy = Math.round(stats[i].energy * 100) + "%";
                            let loudness = Math.round(Math.abs(-60 + Math.abs(stats[i].loudness))) + "dB";
                            let instrumentalness = Math.round(stats[i].instrumentalness * 100) + "%";
                            let speechiness = Math.round(stats[i].speechiness * 100) + "%";
                            let tempo = Math.round(stats[i].tempo) + 'bpm';
                            
                            let trackHTML = `
                                <div class="container">
                                    <div class="level">
                                        <div class="level-item">
                                            <b><p class="heading" style="font-size: 1.3em;">Track​​​     </p></b>
                                            <b><p class="title" id="track">${trackTitle}</p></b>
                                        </div>
                                        <div class="level-item">
                                            <b><p class="heading">By​​​     </p></b>
                                            <b><p class="title" id="track" style="font-size: 1.6em">${trackArtist}</p></b>
                                            <br><br>
                                        </div>
                                    </div>
                                    
                                    

                                    <div class="level">
                                        <div class="level-item">
                                            <div>
                                                <b><p class="heading">Danceability​​​     </p></b><br>
                                                <p class="title" id="track">${danceability}</p>
                                            </div>
                                        </div>
                                        <div class="level-item">
                                            <div>
                                                <b><p class="heading">Energy     </p></b><br>
                                                <p class="title" id="track">${energy}</p>
                                            </div>
                                        </div>
                                        <div class="level-item">
                                            <div>
                                                <b><p class="heading">Loudness     </p></b><br>
                                                <p class="title" id="track">${loudness}</p>
                                            </div>
                                        </div>
                                        <div class="level-item">
                                            <div>
                                            <b><p class="heading">Instrumentalness     </p></b><br>
                                            <p class="title" id="track">${instrumentalness}</p>
                                            </div>
                                        </div>
                                        <div class="level-item">
                                            <div>
                                            <b><p class="heading">Speechiness     </p></b><br>
                                            <p class="title" id="track">${speechiness}</p>
                                            </div>
                                        </div>
                                        <div class="level-item">
                                            <div>
                                            <b><p class="heading">Tempo     </p></b><br>
                                            <p class="title" id="track">${tempo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br><br><br><br><br><br>`;

                                $('#stat-list').append(trackHTML);
                            }
                            $('#album').text(playlistInfo.name);
                            $('#artist').text(playlistInfo.owner.display_name);
                            $('#album-image').attr('src', playlistInfo.images[0].url);
                        }

                        $('#statistics').css('display', 'block');
                    }

                    $('#analyze').attr('class', 'button is-medium is-rounded')
                    //$('#progress-bar').css('display', 'none');
            }
        });
    });
});