var Projects = {
	$body: $('body'),
	$section: $('.projects'),
	$box: $('.projects__box'),
	$overlay: $('.projects__overlay'),
	$link: $('.projects__link'),
	$text: $('.projects__text'),
	$description: $('.projects__text-description'),
	$images: $('.projects__images'),
	$controls: $('.projects__controls'),
	$social: $('.projects__social'),
	$cover: $('.projects__cover'),
	$closeButton: $('.projects__close'),
	$wrapper: $('.projects__wrapper'),
	$header: $('.projects__heading'),
	$hp: $('.hp'),
	$boxPlaceholder: $('<div class="projects__placeholder style="background: crimson;"><div>'),
	activeBox: null,
	clickDisabled: false,

	/* FOR OPENING */
	boxOffsets: {},
	boxDimensions: {},

	/* FOR CLOSING */
	placeholderOffsets:{},
	placeholderDimensions:{},

	toBeAnimated: [],

	vars: function() {

		Projects.toBeAnimated = [
			Projects.$box
		];
	},

	getCurrentValues: {
		box: function (open) {
			Projects.$boxParent = Projects.$box.parent();
			Projects.$boxCurrent = $(open).closest('.projects__box');
			Projects.boxDimensions = {
				width: Projects.$boxCurrent.width(),
				height: Projects.$boxCurrent.height()
			};

			Projects.boxOffsets.top = Projects.$boxCurrent.offset().top - $(window).scrollTop();
			Projects.boxOffsets.left = Projects.$boxCurrent.offset().left;
			Projects.boxOffsets.right = $(window).width() - Projects.boxOffsets.left - Projects.boxDimensions.width;
			Projects.boxOffsets.bottom = $(window).height() - Projects.boxOffsets.top - Projects.boxDimensions.height;

		},
		placeholder: function(close) {
			Projects.placeholderDimensions = {
				width: Projects.$boxPlaceholder.width(),
				height: Projects.$boxPlaceholder.height()
			};
			Projects.placeholderOffsets.top = Projects.$boxPlaceholder.offset().top - $(window).scrollTop();
			Projects.placeholderOffsets.left = Projects.$boxPlaceholder.offset().left;
			Projects.placeholderOffsets.right = $(window).width() - Projects.placeholderOffsets.left - Projects.boxDimensions.width;
			Projects.placeholderOffsets.bottom = $(window).height() - Projects.placeholderOffsets.top - Projects.boxDimensions.height;
		}

	},

	close: function() {
		if (Projects.clickDisabled) return false;
		Projects.clickDisabled = true;

		var $activeBox = $(Projects.$box).filter('.is-active');
		var $controls = $activeBox.find('.projects__controls');
		var $images = $activeBox.find('.projects__images');
		var $social = $activeBox.find('.projects__social');
		var $text = $activeBox.find('.projects__text');
		var $cover = $activeBox.find('.projects__cover');


		var $boxElements = [$controls[0], $images[0], $social[0], $text[0]];
		if (!$activeBox) {
			return false;
		}

		var $placeholderNext = $activeBox.next();

		Projects.getCurrentValues.placeholder();

		var tlm = new TimelineMax({
			onComplete: function() {
				$activeBox.removeClass('is-active');
				$activeBox.removeAttr('style');
				$placeholderNext.remove();
				Nav.$navButton.removeClass('is-hidden');
			}
		});
		tlm
			.to(Projects.$overlay, 0.2, {
				'overflow': 'hidden'
			})

			.staggerTo($boxElements, 0.15, {
				opacity: 0,
			}, 0.15)

			.to($activeBox, 0.6, {
				top: Projects.placeholderOffsets.top,
				right: Projects.placeholderOffsets.right,
				bottom: Projects.placeholderOffsets.bottom,
				left: Projects.placeholderOffsets.left,
				ease: Power2.easeInOut,
				onComplete: function() {
					$text.removeClass('is-active');
					$social.removeClass('is-active');
				}
			})
			.to($text, 0.3, {
				opacity: 1
			})
			.to($cover, 0.6, {
				scale: 1,
				ease: Power4.easeOut,
				onComplete: function() {
					Projects.clickDisabled = false;
					var scrollFromTop = Projects.$hp.scrollTop();
					Projects.$hp.removeClass('is-fixed');
					Projects.$overlay.removeClass('is-active');
					$(window).scrollTop(scrollFromTop);
				}
			});

		Projects.activeBox = false;
	},

	open: function(e) {
		if (Projects.clickDisabled) return false;
		Projects.clickDisabled = true;
		Projects.getCurrentValues.box(this);
		e.preventDefault();

		if (Projects.activeBox) return false;

		Projects.activeBox = parseInt(Projects.$boxCurrent.data('box'));
		Projects.$boxCurrent.after($(Projects.$boxPlaceholder));

		var $placeholder = Projects.$boxParent.find('.projects__placeholder');
		var $controls = Projects.$boxCurrent.find('.projects__controls');
		var $images = Projects.$boxCurrent.find('.projects__images');
		var $social = Projects.$boxCurrent.find('.projects__social');
		var $cover = Projects.$boxCurrent.find('.projects__cover');
		var $text = Projects.$boxCurrent.find('.projects__text');


		var $boxElements = [$text[0], $social[0], $images[0], $controls[0]];

		$placeholder.css('height', Projects.boxDimensions.height);
		Nav.$navButton.addClass('is-hidden');
		Projects.$boxCurrent.addClass('is-active');
		TweenMax.set($controls[0], {
			opacity: 0
		});

		var tlm = new TimelineMax({
			onComplete: function() {
				var scrollFromTop = $(window).scrollTop();
				Projects.$hp.addClass('is-fixed');
				// $('body').css('overflow','hidden');
				Projects.$overlay.css('overflow','scroll');
				Projects.$hp.scrollTop(scrollFromTop);			}
		});
		tlm
			.to($text, 0.3, {
				opacity: 0,
			})
			.to($cover, 0.3, {
				scale: 0,
				ease: Power4.easeIn
			},0)
			.fromTo(Projects.$boxCurrent, 0.6, {
				top: Projects.boxOffsets.top,
				right: Projects.boxOffsets.right,
				bottom: Projects.boxOffsets.bottom,
				left: Projects.boxOffsets.left
			}, {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				ease: Power2.easeInOut,
				onComplete: function() {
					$text.addClass('is-active');
					$social.addClass('is-active');
				}
			}, 0.3)
			.staggerTo($boxElements, 0.4, {
				scale: 1,
				opacity:1,
				onComplete: function() {
					Projects.clickDisabled = false;
				}
			}, 0.2);
	},

	init: function() {
		Projects.vars();
		Projects.$link.click(Projects.open);

		Projects.$closeButton.click('click', function(e) {
			e.preventDefault();
			Projects.close();
		});

	}
};
