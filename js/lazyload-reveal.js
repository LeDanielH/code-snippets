var Countries = {
	$lazy: $('.lazy'),
	$country: $('.country'),
	isRevealed: {},
	isLoaded: {},

	lazyLoadAssets: function () {
		var currentScroll = $(window).scrollTop() + ($(window).height() * 2);
		for (var i = 0; i < Countries.$lazy.length; i++) {

			var lazyOffset = $(Countries.$lazy[i]).offset().top;
			if (currentScroll > lazyOffset) {
				if (this.isLoaded[i]) continue;

				var imageSrc = $(Countries.$lazy[i]).attr('data-src');
				$(Countries.$lazy[i]).attr('src', imageSrc);
				this.isLoaded[i] = true;

			}
		}
	},

	setCountries: function () {

		Countries.$country.each(function (i, el) {
			Countries.$number = $(Countries.$country[i]).find('.country__col-1');
			Countries.$image = $(Countries.$country[i]).find('.country__col-2');
			Countries.$description = $(Countries.$country[i]).find('.country__col-3');

			Countries.$svg = $(Countries.$country[i]).find('.country__contours svg');
			Countries.$svgOuter = $(Countries.$country[i]).find('.contour-outer');
			Countries.$svgMiddle = $(Countries.$country[i]).find('.contour-middle');
			Countries.$svgInner = $(Countries.$country[i]).find('.contour-inner');

			TweenMax.set([Countries.$number, Countries.$description, Countries.$image], {
				autoAlpha: 0,
				y: 30
			});

			TweenMax.set([Countries.$svgOuter, Countries.$svgMiddle, Countries.$svgInner], {
				drawSVG: '50% 50%'
			});
		});

	},

	reveal: function () {
		var currentSroll = $(window).scrollTop() + ($(window).height() * 0.7);
		Countries.$country.each(function (i, el) {
			if (Countries.isRevealed[i]) return;

			var countryOffset = $(Countries.$country[i]).offset().top;
			if (currentSroll > countryOffset) {


				Countries.$number = $(Countries.$country[i]).find('.country__col-1');
				Countries.$image = $(Countries.$country[i]).find('.country__col-2');
				Countries.$description = $(Countries.$country[i]).find('.country__col-3');

				Countries.$svg = $(Countries.$country[i]).find('.country__contours svg');
				Countries.$svgOuter = $(Countries.$country[i]).find('.contour-outer');
				Countries.$svgMiddle = $(Countries.$country[i]).find('.contour-middle');
				Countries.$svgInner = $(Countries.$country[i]).find('.contour-inner');

				var revealTimeline = new TimelineMax({

				});

				revealTimeline
					.staggerTo([Countries.$number, Countries.$image, Countries.$description], 1, {
						autoAlpha: 1,
					 	y: 0,
						ease: Power1.easeOut

					},0.35, 'revealingCountries')
					.staggerTo([Countries.$svgOuter, Countries.$svgMiddle, Countries.$svgInner], 1, {
						drawSVG: '100%',
						ease: Power4.easeOut

					},0.4, 'revealingCountries+=0.4')
					.timeScale(0.97);

				if (window.weather) {
					var $weatherWrap = $(this).find('.country__values-temp'); //Find the weather information container
					var coords = $(this).data('coords').split(',', 2); //Extract coordinates
					window.weather
						.getForCoords(coords[0], coords[1])
						.done(function (response) {
							$weatherWrap.find('.country__values-temp-number').html(Math.round(response.currently.temperature)); //Temperature
							$weatherWrap.find('.country__values-icon').html('<i class="icon-weather-' + response.currently.icon + '"></i>'); //Icon
						})
						.fail(function () {
							$weatherWrap.find('.country__values-temp-number').html('--')
						});
				}

				Countries.isRevealed[i] = true;
			}
		});
	},

	init: function () {
		$(window).on('scroll', function() {
			Countries.lazyLoadAssets();
			Countries.reveal();
		});
	}
};
