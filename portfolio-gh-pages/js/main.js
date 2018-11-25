$(function() {

/* =========================================================
 * Nav change
 * ========================================================= */

	var scrollTopReset = 0;
	var scrollTop = 0;

	$(window).scroll(function(){
		if ($(window).width() > 768) {
		    scrollTop = $(window).scrollTop();
		    if (scrollTop > 80) {
		    	$("#nav-logo").addClass("scrolled");
		    	$('nav').addClass("untouchable");
		    }
		    else {
		    	$("#nav-logo").removeClass("scrolled");
		    	$('nav').removeClass("untouchable");
		    }
			var newScrollTop = -(scrollTop - scrollTopReset);
			if (scrollTop > 0 && scrollTop < 200) {
				$('nav').css({
		            marginTop: newScrollTop
		        });
			} else if (scrollTop >= 200) {
				$('nav').css({
		            marginTop: -200
		        });
			} else {
				$('nav').css({
		            marginTop: 0
		        });
			}
		}
	});

	$('#nav-logo-controls').click(function() {
		if ($(window).width() > 768) {
			var scrollTopReset = scrollTop;
			var newScrollTop = -(scrollTop - scrollTopReset);
			$('nav').animate({
	            marginTop: newScrollTop
	        }, 350);
	        $("#nav-logo").removeClass("scrolled");
	        $('nav').removeClass("untouchable");
	    } else {
	    	$('nav ul').toggleClass("down");
	    	$('#nav-logo-controls').toggleClass("down");
	    }
	});

/* =========================================================
 * Past link expand nav
 * ========================================================= */

	$("#pastLinkToggle").click(function(e) {
		$("#past").toggleClass("expanded");
		$("nav").toggleClass("past-expanded");
		e.preventDefault();
	});

	$(window).scroll(function(){ 
		$("#past").removeClass("expanded");
		$("nav").removeClass("past-expanded");
	});

/* =========================================================
 * Past link expand nav
 * ========================================================= */

	$("#pastLinkToggle2").click(function(e) {
		$("#past-hero").toggleClass("expanded");
		$("nav.hero2").toggleClass("past-expanded");
		e.preventDefault();
	});

	$(window).scroll(function(){ 
		$("#past-hero").removeClass("expanded");
		$("nav.hero2").removeClass("past-expanded");
	});

/* =========================================================
 * Homepage hover state
 * ========================================================= */

	$("#interviewLink").mouseover(function() {
		$('#interview-hero-video').get(0).play();
		$("#team-hero-video").removeClass("visible");
		$("#experience-hero-video").removeClass("visible");
		$("#interview-hero-video").addClass("visible");
	});

	 $("#experienceLink").mouseover(function() {
		$('#experience-hero-video').get(0).play();
		$("#team-hero-video").removeClass("visible");
		$("#interview-hero-video").removeClass("visible");
		$("#experience-hero-video").addClass("visible");
	});

	 $("#teamLink").mouseover(function() {
		$('#team-hero-video').get(0).play();
		$("#experience-hero-video").removeClass("visible");
		$("#interview-hero-video").removeClass("visible");
		$("#team-hero-video").addClass("visible");
	});

 /* =========================================================
 * Resize Map properly
 * ========================================================= */

	function resizeMap() {
		var h = $(window).height();
		var hTwo = Math.round(h * 2.5);
		if (h < 750) {
			$('#map').css({
		        height: h,
		        width: hTwo
		    });
		} else {
			$('#map').css({
		        height: 750,
		        width: 1875
		    });
		}
	}

	resizeMap();
	$( window ).resize(function() {
		resizeMap() 
	});

});

