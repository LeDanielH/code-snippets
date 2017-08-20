var Landing = {
	$section: $('.landing'),

	/* SLIDER */
	$slider: $('.landing__slider'),
	$slides: $('.landing__slide').toArray(),

	setOnAllDevices: function () {
		// hide elements in css and add class firstview to these elements
		// this is taken care of in the firstview.js file
	},

	resizeHandler: function() {
		// add class 'fullscreen' to these elements
		// this is taken care of in the fullscreen.js file
	},

	// Slider
	activeSlide: 0,
	sliderInterval: null,
	sliderDelay: 5500,

	initSlider: function ()
	{
		// select slides
		this.$slides = $('.landing__slide');

		// how many slides
		this.slidesTotal = this.$slides.length;

		// swith them after interval
		this.sliderInterval = setInterval(this.switchSlide.bind(this), this.sliderDelay);

		// scale them first
		this.$slides.eq(this.activeSlide).find('.landing__slide-scaler').addClass('scale-in');
	},

	switchSlide: function()
	{
		var $prevSlide = this.$slides.eq(this.activeSlide);
		var $prevSlideScaler = $prevSlide.find('.landing__slide-scaler');

		this.activeSlide++;
		if (this.activeSlide == this.slidesTotal) this.activeSlide = 0;

		var $newSlide = this.$slides.eq(this.activeSlide);
		var $newSlideScaler = $newSlide.find('.landing__slide-scaler');


		$prevSlideScaler.removeClass('scale-in');
		$newSlide.addClass('fade-in');
		$prevSlide.removeClass('fade-in');
		$newSlideScaler.addClass('scale-in');

		// Preload next image
		var $nextImg = this.$slides.eq(this.activeSlide + 1).find('.landing__slide-scaler');
		var dataSrc = $nextImg.attr('data-src');
		if ($nextImg && !$nextImg.hasClass('is-loaded')) {
			$nextImg
				.addClass('is-loaded')
				.css('background-image', 'url(' + dataSrc + ')')
				.removeAttr('data-src');
		}
	},

	init: function () {
		Landing.initSlider();
	}
};
