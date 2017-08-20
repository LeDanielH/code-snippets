var Logo = {
	$placeholder: $('.logo__placeholder'),
	$image: $('.logo__image-wrapper'),

	vars: function() {
		Logo.placeholderTopOffset = Logo.$placeholder.offset().top + 300;
	},

	scrollHandler: function() {
		Logo.isFixed = $(window).scrollTop() > Logo.placeholderTopOffset;
		Logo.$image.toggleClass('is-fixed', Logo.isFixed);
	},

	resizeHandler: function() {
		Logo.vars();
	},

	load: {
		desktop: function() {
			Logo.$image.attr('src', Logo.$image.attr('data-src'));
			Logo.$image.addClass('logo__image-gif');
			Logo.$image.removeAttr('data-src');
		}
	}
};
