var Slideout = {
	$pageWrapper: $('.page__wrap'),
	$opener: $('.open'),
	$exiter: $('.close'),
	$body: $('body'),
	$slide: $('.layout__slider'),
	lastScrolled: 0,
	open: function (currentAttr) {
		var currentTarget = Slideout.$slide.find($("div[data-target='" + currentAttr +"']"));
		currentTarget.addClass('active').siblings().removeClass('active');
		Slideout.$body.css({'overflow':'hidden'});
		Slideout.$pageWrapper
			.addClass('slide-active');

		if (w.layout === 'mobile') {
			setTimeout(function() {
				Slideout.lastScrolled = w.top;
				Slideout.$pageWrapper.css({'position':'fixed'});
			}, 600);
		}

		if (currentAttr == 'calc') {
			Anal.calcIsVisible();
		}
	},

	close: function() {
		Slideout.$body.css('overflow', 'auto');
		Slideout.$pageWrapper.removeClass('slide-active');

		//doscroll na posledni pozici pred otevrenim slidu
		if (w.layout === 'mobile') {
			Slideout.$pageWrapper.css({'position': 'absolute'});
			window.scrollTo(0, Slideout.lastScrolled);
		}

		//odebrani activu u slidu az po zajeti
		setTimeout(function() {
			$('.layout__slide.active').removeClass('active');
		}, 600);
	},

	init: function () {

		Slideout.$opener.on('click', function(e) {
			e.preventDefault();
			var currentAttr = $(e.currentTarget).attr('data-target');
			Slideout.open(currentAttr);
		});

		Slideout.$exiter.on('click', function(e) {
			e.preventDefault();
			Slideout.close();
		});
	}
};
