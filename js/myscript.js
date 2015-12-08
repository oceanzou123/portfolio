$(document).ready(function() {
  	$("article").css('display','none').fadeTo(1500, 8,'swing');


/*
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navigation').outerHeight();

		$(window).scroll(function(event){
		    didScroll = true;
		});

		setInterval(function() {
		    if (didScroll) {
		        hasScrolled();
		        didScroll = false;
		    }
		}, 250);

		function hasScrolled() {
		    var st = $(this).scrollTop();

		    // Make sure they scroll more than delta
		    if(Math.abs(lastScrollTop - st) <= delta)
		        return;

		    // If they scrolled down and are past the navbar, add class .nav-up.
		    // This is necessary so you never see what is "behind" the navbar.

		    if (st > lastScrollTop && st > navbarHeight){
		        // Scroll Down
		        $('nav').removeClass('fixed').addClass('navigation');


		    } else {
		        // Scroll Up
		        if(st + $(window).height() < $(document).height()) {
		            $('nav').addClass('fixed').removeClass('navigation');
		        }


		    }

		    lastScrollTop = st;
		}
	});




$(window).bind('scroll', function() {
			 if ($(window).scrollTop() > 200) {
				 $('nav').addClass('fixed');
			 }
			 else {
				 $('nav').removeClass('fixed');
			 }
		});

*/


$('button').click(function() {
  $(this).toggleClass('expanded').siblings('div').slideToggle();
});


$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('body').animate({
          scrollTop: target.offset().top
        }, 600);
        return false;
      }
    }
  });
});



	});
