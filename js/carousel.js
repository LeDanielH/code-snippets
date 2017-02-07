var Carousel = {

	$slides : $('.map__fact'),
	$triggers: $('.map__facts-trigger__wrapper'),
	$arrowLeft : $('#map__facts-left'),
	$arrowRight : $('#map__facts-right'),
	$slidesParent: $('.map__facts-panels'),
	currentIndex : 0,
	lastClick: 0,
	animLength: 600, // set in css transition, if you change it here, change it in css too.
	slidesTotal: null,

	setCarousel: function() {
		slidesTotal = Carousel.$slides.length;

		if(Carousel.currentIndex > slidesTotal - 1) Carousel.currentIndex = 0;
		if(Carousel.currentIndex < 0) Carousel.currentIndex = slidesTotal - 1;

		Carousel.$slides.eq(Carousel.currentIndex).addClass('is-active').siblings().removeClass('is-active');
		Carousel.$triggers.eq(Carousel.currentIndex).addClass('is-active');

		Carousel.$slides.eq(Carousel.currentIndex - 1).addClass('is-left');
		Carousel.$triggers.eq(Carousel.currentIndex - 1).addClass('is-left');

		Carousel.$slides.eq(Carousel.currentIndex + 1).addClass('is-right');
		Carousel.$triggers.eq(Carousel.currentIndex + 1).addClass('is-right');
	},

	customScrollbar: function () {
		$(".map__fact-copy").mCustomScrollbar({});
	},

	switchSlide: function () {
		if(Carousel.currentIndex > slidesTotal - 1) Carousel.currentIndex = 0;
		if(Carousel.currentIndex < 0) Carousel.currentIndex = slidesTotal - 1;

		Carousel.$slides.eq(Carousel.currentIndex).addClass('is-active').removeClass('is-right is-left').siblings().removeClass('is-active');
		Carousel.$triggers.eq(Carousel.currentIndex).addClass('is-active').removeClass('is-right is-left').siblings().removeClass('is-active');

		Carousel.$slides.eq(Carousel.currentIndex-1).addClass('is-left').removeClass('is-active is-right').siblings().removeClass('is-left');
		Carousel.$triggers.eq(Carousel.currentIndex-1).addClass('is-left').removeClass('is-active is-right').siblings().removeClass('is-left');

		if(Carousel.currentIndex == slidesTotal - 1) {
			Carousel.$slides.eq(0).addClass('is-right').removeClass('is-active is-left').siblings().removeClass('is-right');
			Carousel.$triggers.eq(0).addClass('is-right').removeClass('is-active is-left').siblings().removeClass('is-right');
		} else {
			Carousel.$slides.eq(Carousel.currentIndex+1).addClass('is-right').removeClass('is-active is-left').siblings().removeClass('is-right');
			Carousel.$triggers.eq(Carousel.currentIndex+1).addClass('is-right').removeClass('is-active is-left').siblings().removeClass('is-right');
		}
	},

	initCarousel: function () {
		Carousel.setCarousel();
		var hammer = new Hammer(Carousel.$slidesParent[0]);

		Carousel.$arrowLeft.on('click', function (e) {
			if (Carousel.lastClick + Carousel.animLength > Date.now()) return;
			Carousel.lastClick = Date.now();
			e.preventDefault();
			Carousel.currentIndex--;
			Carousel.switchSlide();
		});

		Carousel.$arrowRight.on('click', function (e) {
			if (Carousel.lastClick + Carousel.animLength > Date.now()) return;
			Carousel.lastClick = Date.now();
			e.preventDefault();
			Carousel.currentIndex++;
			Carousel.switchSlide();
		});

		hammer.on('swipeleft', function () {
			if (Carousel.lastClick + Carousel.animLength > Date.now()) return;
			Carousel.lastClick = Date.now();
			Carousel.currentIndex++;
			Carousel.switchSlide();
		});

		hammer.on('swiperight', function () {
			if (Carousel.lastClick + Carousel.animLength > Date.now()) return;
			Carousel.lastClick = Date.now();
			Carousel.currentIndex--;
			Carousel.switchSlide();
		});

	}
},
