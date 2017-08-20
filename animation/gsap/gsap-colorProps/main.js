var gradientColors = {
	inner: 'red',
	outer: 'black'
};
updateColor();

TweenMax.to(gradientColors, 3, {
	colorProps: {
		inner: gradientColors.outer,
		outer: gradientColors.inner
	},
	onUpdate: updateColor,
	ease: Linear.easeNone,
	repeat: -1,
	yoyo: true
});

function updateColor() {

	var text = $('.text'),
		square = $('#square'),
		gradient = 'radial-gradient(' + gradientColors.inner + ', ' + gradientColors.outer + ')';

	text.html(gradient);
	square.css('background-image', gradient);

}