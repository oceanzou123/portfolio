$(function() {


    var scrollTop = 0; // global scrollTOp variable
    var scrollTopPadding = 0; // distance from top that the video will scroll to when bio activated
    var scrollTransitionThreshold = 100; // when to toggle on/off the bio state

    function hideElements() {
        $("nav").addClass("hidden");
        $("#progressbar").addClass("shrunk");
        $("#chapters").addClass("shrunk");
        $("#playPauseButtons").addClass("hidden");
        $("#video-title").addClass("hidden");
        $("#helpmesee").addClass("hidden");
        $("#time").addClass("hidden");
    }

    function showElements() {
        $("nav").removeClass("hidden");
        $("#progressbar").removeClass("shrunk");
        $("#chapters").removeClass("shrunk");
        $("#playPauseButtons").removeClass("hidden");;
        $("#video-title").removeClass("hidden");
        $("#helpmesee").removeClass("hidden");
        $("#time").removeClass("hidden");
    }

    hideElements();
    var i = null;
    var win = $(window);
    $("body").mousemove(function() {
        clearTimeout(i);
        showElements();
        i = setTimeout(hideElements, 3000);
    }).click(function() {
        clearTimeout(i);
        showElements();
        i = setTimeout(hideElements, 3000);
    });

});