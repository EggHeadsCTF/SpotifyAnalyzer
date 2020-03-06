$(document).ready(() => {

    let options = {
        valueNames: ['danceability', 'energy', 'loudness', 'instrumentalness', 'speechiness', 'tempo']
    };

    let statList = new List('stats-list', options);
    
    let currentSort = "";

    $("#danceability-sort-btn").click(() => {
        statList.sort('danceability')
    });

    $(".navbar-burger").click(() => {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

    $(".dropdown").click(() => {
        $(".dropdown").toggleClass("is-active");
    })

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