Nav = {
	$header: $('.header'),
	$btn: $('.nav__btn'),
	$wrapper: $('.nav'),
	$linksBar: $('.nav__links'),
	$links: $('.nav__menu-item'),

	$navButton: $('.nav__hamburger'),
	$navButtonLine1: $('.nav__hamburger-line-1')[0],
	$navButtonLine2: $('.nav__hamburger-line-2')[0],
	$navButtonLine3: $('.nav__hamburger-line-3')[0],
	mobileOpen: false,
	clickDisabled: false,
	didScroll: false,
	lastScrollTop: 0,

	vars: function() {
		Nav.toBeAnimated =  [
			Nav.$wrapper,
			Nav.$navButton
		];
	},

	open: function() {
		if(Nav.clickDisabled) return false;
		Nav.clickDisabled = true;

		Nav.fullscreenNav(Nav.$wrapper);
		$.each(Nav.toBeAnimated, function(i, elem) {
			$(elem).addClass('is-active');
		});
		var tla = new TimelineMax();
		tla
			.to(Nav.$wrapper, 0, {autoAlpha: 1}, 0)
			.to(Nav.$navButtonLine2, 0.30, {scale: 0}, 0)
			.to(Nav.$navButtonLine1, 0.30, {y: 11}, 0)
			.to(Nav.$navButtonLine3, 0.30, {y: -11 }, 0)
			.to(Nav.$navButtonLine1, 0.30, {rotation: 45}, 0.30)
			.to(Nav.$navButtonLine3, 0.30, {
				rotation: -45,
				onComplete: function() {
					Nav.clickDisabled = false;
				}
			}, 0.30);

		Nav.mobileOpen = true;
	},

	close: function() {

		if(Nav.clickDisabled) return false;
		Nav.clickDisabled = true;

		$.each(Nav.toBeAnimated, function(i, elem) {
			$(elem).removeClass('is-active');
		});

		var tlr = new TimelineMax();
		tlr
			.to(Nav.$navButtonLine3, 0.30, {rotation: 0}, 0)
			.to(Nav.$navButtonLine1, 0.30, {rotation: 0}, 0)
			.to(Nav.$navButtonLine3, 0.30, {y: 0}, 0.30)
			.to(Nav.$navButtonLine1, 0.30, {y: 0}, 0.30)
			.to(Nav.$navButtonLine2, 0.30, {scale: 1}, 0.30)
			.to(Nav.$wrapper, 0, {
				autoAlpha: 0,
				onComplete: function() {
					Nav.clickDisabled = false;
				}
			}, 0.6);


		Nav.mobileOpen = false;

	},

	hideAfterClick: function() {
		Nav.$links.click(function() {
			Nav.mobileOpen = false;
			$.each(Nav.toBeAnimated, function(i, elem) {
				$(elem).removeClass('is-active');
			});
			Nav.close();
		});
	},

	scrollHandler: {
		btnActivate: function() {
			var currentScroll = $(window).scrollTop();
			var headerOffset = $(Nav.$header).offset().top;
			if(currentScroll > headerOffset) {
				Nav.$btn.addClass('active');
			} else {
				Nav.$btn.removeClass('active');
			}
		},

		hideNavLinks: function() {
			var delta = 5;
			var currentScroll = $(window).scrollTop();
			navbarHeight = Nav.$linksBar.height();

			if(Math.abs(Nav.lastScrollTop - currentScroll) <= delta) {
				return;
			}

			if(currentScroll > Nav.lastScrollTop && currentScroll > navbarHeight) {
				Nav.$wrapper.addClass('hidden');
			} else {
				if(currentScroll + $(window).height() < $(document).height()) {
					Nav.$wrapper.removeClass('hidden');
				}
			}
			Nav.lastScrollTop = currentScroll;
		},

		changeNavColor: function() { // this works only on the first change but not for other changes
			var currentScroll = $(window).scrollTop() + 100;

			for (var i = 0; i < Nav.$textLight.length; i++) {

				var textLightSectionOffset = $(Nav.$textLight[i]).offset().top;
				if (currentScroll > textLightSectionOffset) {
					Nav.$navLink.addClass('navlight').removeClass('navdark');
					Nav.$logo.addClass('navlight').removeClass('navdark');
				}
			}

			for (var y = 0; y < Nav.$textDark.length; y++) {

				var textDarkSectionOffset = $(Nav.$textDark[y]).offset().top;
				if (currentScroll > textDarkSectionOffset) {
					Nav.$navLink.addClass('navdark').removeClass('navlight');
					Nav.$logo.addClass('navdark').removeClass('navlight');
				}
			}
		}
	},

	init: function() {
		Nav.vars();

		$(Nav.$navButton).click(function(e) {
			e.preventDefault();

			if (Nav.mobileOpen) {
				Nav.close();
			} else {
				Nav.open();
			}
		});

		Nav.hideOnScroll();
	}
};
