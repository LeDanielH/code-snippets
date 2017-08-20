var Paralax = {

	$elements: $('.paralax'), 	// multiple elements
	intensity: 270,

	move: {

		single: function(element, intensity) {
			var wScroll = $(window).scrollTop();
			if (wScroll > element.offset().top - $(window).height()) {
				element.css({
					'transform': 'translate3d(0px, ' + ((wScroll - element.offset().top) / ($(window).height())) *  - intensity + 'px, 0)'
				});
			}
		},

		all: function(intensity) {
			Paralax.$elements.each(function(i, el) {
				if (wScroll > Paralax.$elements[i].offset().top - $(window).height()) {
					Paralax.$elements[i].css({
						'transform': 'translate3d(0px, ' + ((wScroll - Paralax.$elements[i].offset().top) / ($(window).height())) *  - intensity + 'px, 0)'
					});
				}
			});
		}
	},

	/* THIS INIT IS INITIALIZED IN scroll.js */
	init: function() {
		Paralax.move.single(Paralax.$image, Paralax.intensity); // single takes two parameters
		Paralax.move.all(Paralax.intensity); // all takes 1 parameter
	}
};
