$('#dots circle').each(function() {
	var opacityRandom = Math.random() * 0.6 + 0.4; // ragne * min value of 0.4
	var xPos = Math.random() * 500 - 250; // range -250 to 250
	var yPos = Math.random() * 500 - 250;
	var delayRandom = Math.random() * 2;

	TweenMax.set(this, {
		x: xPos,
		y: yPos
	});

	TweenMax.to(this, 2, {
		x: 0,
		y: 0,
		opacity: opacityRandom,
		// ease: Elastic.easeOut,
		ease: Power4.easeInOut,
		delay: delayRandom
	});
});

var mySVG = $('#logo').drawsvg({
	duration: 1000,
	callback: function() {
		TweenMax.to('#company', 2, {
			opacity: 1
		});
	}
});

mySVG.drawsvg('animate');