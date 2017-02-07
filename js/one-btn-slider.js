var Calc = {
	$wrapper: $('.calc__question-slider'),
	$slides: $('.calc__question-slide'),
	$nextSlideBtn: $('.calc__btn-next'),
	$submitBtn: $('.calc__btn-submit'),
	active: 1,
	$cta: $('.calc__btn-interested'),

	count: 0,

	vars: function() {
		Calc.count = Calc.$slides.length;
	},

	slideMe: function () {

		var currentSlide = $('.calc__question-slide-' + Calc.active);
		if (Calc.count > Calc.active) {
			Calc.active++;
			currentSlide.removeClass('active').next().addClass('active');
		}

		if(Calc.count === Calc.active) {
			Calc.$nextSlideBtn.addClass('is-hidden');
			Calc.$submitBtn.addClass('is-visible');
		}
	},

	resetMe: function () {
		Calc.$slides.first().addClass('active');
		Calc.$slides.last().removeClass('active');
		Calc.$nextSlideBtn.removeClass('is-hidden');
		Calc.$submitBtn.removeClass('is-visible');
		Calc.active = 1;
	},

	init: function () {
		Calc.vars();
		Calc.$nextSlideBtn.on('click', function (e) {
			e.preventDefault();
			Calc.slideMe();
		});
	}
};
