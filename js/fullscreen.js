/*
	TO USE THIS SCRIPT
	1. html => 	add class 'fullscreen' to the elements you want to stretch to fullheight;
	2. js => 	initialize this script
*/
var FullScreen = {
    $element: $('.fullscreen'),
    init: function () {
        windowHeight = $(window).innerHeight();
        FullScreen.$elements.each(function (i, el) {
            FullScreen.$elements[i].css('height', 0);
            FullScreen.$elements[i].css('height', windowHeight);
        });
    }
};
