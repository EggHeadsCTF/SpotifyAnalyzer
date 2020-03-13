$(document).ready(() => {
    

    let statsTable = $("#stats-table").DataTable({
        scrollCollapse: true,
        autoWidth: false,
        //"dom": '<"toolbar"lf>rtip',
        "columnDefs": [
            { "width": "2%", "targets": 0},
            { "width": "30%", "targets": 1},
            { "width": "7%", "targets": [2,3,4,5,6,7]},
        ]
    });

    statsTable.on('search', (e) => {
        console.log(e);
    })
    //$("div.toolbar").append('<button id="viewmode"><i class="fas fa-table" aria-hidden="true"></i></button>');

    $("#viewmode").click(() => {
        $("#viewmode").html($("#viewmode").html() == 'List&nbsp;<i class="fas fa-list" aria-hidden="true"></i>' ? 
                                                    'Table&nbsp;<i class="fas fa-table"></i>' : 'List&nbsp;<i class="fas fa-list"></i>')
        $("#stats-table-div").toggle();
        $("#stats-list-div").toggle();
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