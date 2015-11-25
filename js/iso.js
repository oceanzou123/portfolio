$(function() {

/* =========================================================
 * populate animation
 * ========================================================= */

    var itemList = ['#item-1', '#item-2', '#item-3', '#item-4', '#item-5',
        '#item-6', '#item-7', '#item-8', '#item-9', '#item-10',
        '#item-11', '#item-12', '#item-13', '#item-14', '#item-15', 
        '#item-16', '#item-17', '#item-18', '#item-19', '#item-20'];

    var itemListLength = itemList.length;

    function showYourself() {
        for (var i = 0; i < itemListLength; i++) {
            var scrollTop     = $(window).scrollTop(),
                elementOffset = $(itemList[i]).offset().top,
                distance      = (elementOffset - scrollTop);
            if (distance < ($(window).height()) ) {
                $(itemList[i]).addClass("onscreen");
            }
        }
    }

    showYourself();
    $(window).scroll(function(){
        showYourself();
    });

/* =========================================================
 * Design Type DropDown
 * ========================================================= */

    $("#answers").hover(
        function () {
            $(this).addClass("open");
        },
        function () {
            $(this).removeClass("open");
        }
    );

    $("#answers").click(function() {
        if ($(window).width() <= 768) {
            $("#answers").addClass("open");
        }
    });

/* =========================================================
 * Isotope shtuff
 * ========================================================= */

    var $container = $('.isotope'),
        $select = $('#filters ul li');

    $container.isotope({
        itemSelector: '.item',
        filter: '*',
        animationOptions: {
            duration: 0,
            easing: 'ease-in-out',
            queue: false
        },
        masonry: { columnWidth: 0 }
    });
 
    // filter items on list item click
    $select.click(function() {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 500,
                easing: 'ease-out',
                queue: false
            }
         });
        for (var i = 0; i < itemListLength; i++) {
            $(itemList[i]).addClass("onscreen");
        }
        if (selector == "*") {             $("#first").text("all"); }
        if (selector == ".product") {      $("#first").text("product"); }
        if (selector == ".interaction") {  $("#first").text("interaction"); }
        if (selector == ".graphic") {      $("#first").text("graphic"); }
        if (selector == ".brand") {        $("#first").text("brand"); }
        if (selector == ".experience") {   $("#first").text("experience"); }
        if (selector == ".arch") {         $("#first").text("architecture"); }
        if (selector == ".italian") {      $("#first").text("Italian"); }
        if (selector == ".northwest") {    $("#first").text("North-West"); }
        $("#answers").toggleClass("open");
        return false;
    });

});