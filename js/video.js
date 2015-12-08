$(function() {

    /* global variables */

    var scrollTop = 0; // global scrollTOp variable
    var scrollTopPadding = 0; // distance from top that the video will scroll to when bio activated
    var scrollTransitionThreshold = 100; // when to toggle on/off the bio state
    var play = true;

/* =========================================================
 * Hiding and showing elements on mouse movement
 * ========================================================= */

    function hideElements() {
        if (scrollTop < scrollTransitionThreshold) {
            $("nav").addClass("hidden");
            $("#progressbar").addClass("shrunk");
            $("#chapters").addClass("shrunk");
            $("#playPauseButtons").addClass("hidden");
            $("#video-title").addClass("hidden");
            $("#helpmesee").addClass("hidden");
            $("#time").addClass("hidden");
        }
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

    function toggleBio() {
        scrollTop = $(window).scrollTop();
        if (scrollTop > scrollTransitionThreshold) {
            $("#overlay").addClass("dim");
            $("#helpmeseeBio").addClass("show");
            $("#bio").addClass("show");
            $("#helpmesee").addClass("superHidden");
            $("#playPauseButtons").addClass("scrolled");
            $("#time").addClass("scrolled");
            $("#progressbarprogress").addClass("dark");
            $("#chapters").addClass("dark");
        } else {
            $("#overlay").removeClass("dim");
            $("#helpmeseeBio").removeClass("show");
            $("#bio").removeClass("show");
            $("#helpmesee").removeClass("superHidden");
            $("#playPauseButtons").removeClass("scrolled");
            $("#time").removeClass("scrolled");
            $("#progressbarprogress").removeClass("dark");
            $("#chapters").removeClass("dark");
        }
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

/* =========================================================
 * Open / Close About Section
 * ========================================================= */

    function moveBioButton() {
        var buttonBottom = scrollTop - 66;
        var scrollThreshold = $(window).height() - 66;
        if (buttonBottom > 66 && buttonBottom < scrollThreshold) {
            $('#video-title').addClass("scrolled");
            $('#video-title').css({
                bottom: buttonBottom
            });
        } else if (buttonBottom >= scrollThreshold) {
            $('#video-title').css({
                bottom: scrollThreshold
            });
        } else {
            $('#video-title').removeClass("scrolled");
            $('#video-title').css({
                bottom: 66
            });
        }
    }

   $(window).scroll(function(){
        showElements();
        toggleBio();
        moveBioButton();
   });

    if ($('#topOfBio').length > 0 ) {
       $('#video-title').click(function(e) {
                if (scrollTop < scrollTransitionThreshold) {
                    $('html, body').animate({
                        scrollTop: $("#topOfBio").offset().top - scrollTopPadding
                    }, 750, 'easeOutQuart');
                } else {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 750, 'easeInBack');
                }
        });
    }

/* =========================================================
 * Moving the Nav Bar
 * ========================================================= */

    $(window).scroll(function(event){
       if (scrollTop > $(window).height() - 85) {
            $('nav.video-nav').css({
                top: -85
            });
        } else {
            $('nav.video-nav').css({
                top: 0
            });
        }
    });

/* =========================================================
 * Vimeo Video Handling
 * ========================================================= */

    var durationator = 0;  // duration of video in seconds

    // Listen for the ready event for any vimeo video players on the page
    var vimeoPlayers = document.querySelectorAll('iframe'),
        player;

    for (var i = 0, length = vimeoPlayers.length; i < length; i++) {
        player = vimeoPlayers[i];
        $f(player).addEvent('ready', ready);
    }

    /**
     * Utility function for adding an event. Handles the inconsistencies
     * between the W3C method for adding events (addEventListener) and
     * IE's (attachEvent).
     */
    function addEvent(element, eventName, callback) {
        if (element.addEventListener) {
            element.addEventListener(eventName, callback, false);
        }
        else {
            element.attachEvent(eventName, callback, false);
        }
    }

    /**
     * Called once a vimeo player is loaded and ready to receive
     * commands. You can add events and make api calls only after this
     * function has been called.
     */
    function ready(player_id) {


        var container = document.getElementById(player_id).parentNode.parentNode,
            froogaloop = $f(player_id),
            apiConsole = container.querySelector('.console .output');

        function apiLog(message) {
            apiConsole.innerHTML = message + '\n' + apiConsole.innerHTML;
        }

        function setupSimpleButtons() {
            var buttons = container.querySelector('div .simple'),
                playBtn = buttons.querySelector('.play'),
                pauseBtn = buttons.querySelector('.pause'),
                volumeOffBtn = buttons.querySelector('.volume-off'),
                volumeOnBtn = buttons.querySelector('.volume-on');

            // Call play when play button clicked
            addEvent(playBtn, 'click', function() {
                froogaloop.api('play');
                $("#playButton").removeClass("show");
                $("#pauseButton").addClass("show");
                play = true;
            }, false);

            // Call pause when pause button clicked
            addEvent(pauseBtn, 'click', function() {
                froogaloop.api('pause');
                $("#playButton").addClass("show");
                $("#pauseButton").removeClass("show");
                play = false;
            }, false);

            // Call volume when volume button clicked
            addEvent(volumeOffBtn, 'click', function() {
                froogaloop.api('setVolume', 0);
                $("#volumeOffBtn").removeClass("show");
                $("#volumeOnBtn").addClass("show");
            }, false);

            addEvent(volumeOnBtn, 'click', function() {
                froogaloop.api('setVolume', 1);
                $("#volumeOffBtn").addClass("show");
                $("#volumeOnBtn").removeClass("show");
            }, false);

        }
        
        /*
         * Pause video when spacebar is pressed
         *
         */
        
        $(window).keydown(function(e) {
			if(e.keyCode == '32') {
				console.log("Spacebar");
				if(play) {
					console.log("Pause Video");
					froogaloop.api('pause');
		            $("#playButton").addClass("show");
		            $("#pauseButton").removeClass("show");
		            play = false;
				} else {
					console.log("Play Video");
					froogaloop.api('play');
	                $("#playButton").removeClass("show");
	                $("#pauseButton").addClass("show");
	                play = true;	
				}
			}
			return false;
		});

        // function for converting seconds into a time to be displayed
        function secondsToHms(d) {
            d = Number(d);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);
            return ((m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s); 
        }

        function setupEventListeners() {
            var checkboxes = container.querySelector('.listeners'),
                progressor = 0,
                myWidth = 0,
                playProgressChk = checkboxes.querySelector('.playProgress');

            function onPlayProgress() {

                    froogaloop.addEvent('playProgress', function(data) {

                        /* change width of progress bar */
                        durationator = data.duration;
                        progressor = data.seconds / data.duration * 100;
                        document.getElementById('progressbarprogress').style.width = progressor + '%';

                        /* change time */
                        var element = document.getElementById("progress");
                        element.innerHTML = secondsToHms(data.seconds);
                        var element = document.getElementById("duration");
                        element.innerHTML = secondsToHms(data.duration);

                        /* if end of video */
                        if (progressor == 100 ) {
                            if ($('#topOfBio').length > 0 ) { // if the bio actually exists
                                if (scrollTop < scrollTransitionThreshold) { // if bio isn't already open
                                    $('html, body').animate({
                                        scrollTop: $("#topOfBio").offset().top - scrollTopPadding
                                    }, 750, 'easeOutQuart');
                                }
                                $("#playButton").addClass("show");
                                $("#pauseButton").removeClass("show");
                            }
                        }
                    });

            }
            addEvent(playProgressChk, 'change', onPlayProgress, false);
            onPlayProgress();
        }

        setupSimpleButtons();
        setupEventListeners();

        // function for changing the time of the video when clicking on chapters or progress bar
        function postToiFrame(action, val) {
            var data = { method: action };
            data.value = val;
            console.log(data);
            $("#video-frame")[0].contentWindow.postMessage(JSON.stringify(data), "http://player.vimeo.com/video/98224743");
        }

        $('#progressbar').click(function(e) {
            var changeProgress = Math.round((e.pageX - 30) / $('#progressbar').width() * durationator);
            postToiFrame("seekTo", changeProgress);
        }); 

        // change time on progress bar click
        $("div.chapter").click(function() {
            postToiFrame("seekTo", $(this).attr('seekTo'));
            return false;
        });
    }

});
