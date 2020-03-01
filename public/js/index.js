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

    $('#analyze').click(() => {
        if(!$('#input-album input:invalid')) {
            $('#analyze').addClass('is-loading');
        }
        
    });

    
});