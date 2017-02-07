/*
	TO USE THIS SCRIPT
	1. css => 	hide elements in css
	2. css =>  	create class 'show' for each of them to show them after javascript has loaded
	3. html => 	add class 'firstview' to them in html
	4. js => 	initialize this script
*/

var FirstView = {
    $elements: $('.firstview'),
    init: function () {
        FirstView.$elements.each(function (i, elem) {
            $FirstView.$elements[i].addClass('show');
        });
    }
};
