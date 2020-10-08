$(document).ready(() => {
    

    $(".navbar-burger").click(() => {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

    $('#analyze').click(() => {
        $('#analyze').addClass('is-loading');
    });

    $('#albumBtn').click(() => {
        $('#trackResults').hide();
        $('#playlistResults').hide();
        $('#albumResults').show();

        $('#albumBtn').attr("class", "button is-success");
        $('#playlistBtn').attr("class", "button");
        $('#trackBtn').attr("class", "button");
    });
    $('#playlistBtn').click(() => {
        $('#trackResults').hide();
        $('#playlistResults').show();
        $('#albumResults').hide();

        $('#albumBtn').attr("class", "button");
        $('#playlistBtn').attr("class", "button is-success");
        $('#trackBtn').attr("class", "button");
    });
    $('#trackBtn').click(() => {
        $('#trackResults').show();
        $('#playlistResults').hide();
        $('#albumResults').hide();

        $('#albumBtn').attr("class", "button");
        $('#playlistBtn').attr("class", "button");
        $('#trackBtn').attr("class", "button is-success");
    });

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
});