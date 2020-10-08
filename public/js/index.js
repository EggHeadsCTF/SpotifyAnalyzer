$(document).ready(() => {

    function fadeIn() {
        var element = document.getElementById("loadIn");
        var op = 0.1;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 50);
    }

    /* $('#search-input').bind('input', () => {
        let $this = $(this);

        clearTimeout($this.data('timer'));
        console.log("set timer");
        $this.data('timer', setTimeout(function(){
            $this.removeData('timer');

            console.log('querying');
            let query = $('#search-input').val();
            if(query != '') {
                $.ajax({
                    type: 'POST',
                    url: '/ajax',
                    data: {query: query}
                }).done((response) => {
                    let result = JSON.parse(response);
                    result.tracks.items.forEach((element) => {
                        console.log("Name: ", element.name);
                        console.log("Album: ", element.album.name);
                        console.log("Artist: ", element.artists[0].name);
                        console.log();
                        
                    })
                    console.log(result.tracks);
                }).fail(() => {
                    console.error("bad ting");
                });
            }
            
        }, 1500));
        
    }); */

    $('#analyze').click(() => {
        if(!$('#search-input input:invalid')) {
            $('#analyze').addClass('is-loading');
        }
        
    });

    
});