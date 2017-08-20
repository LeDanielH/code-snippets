var cycle = $('.fa-motorcycle'),
	letters = $('.letter').toArray(),
	icons = $('.icons i').toArray(),
	btnPause = $('#btn-pause'),
	btnResume = $('#btn-resume'),
	btnReverse = $('#btn-reverse'),
	tl = new TimelineMax(),
	tlr = new TimelineMax({
		repeat: 1, // repeat the whole animation bellow
		repeatDelay: 0.5
	}),
	navLink = $('.nav-link');



TweenLite.to(cycle, 2, {
	x: '600px'
});

TweenLite.from(cycle, 1, {
	rotation: -45,
	transformOrigin: '10px bottom', // x, y
	ease: Bounce.easeOut
});

tl
	.staggerFrom(letters, 1, {
		y: '-100px',
		ease: Elastic.easeOut,
	}, 0.25)

	.staggerFrom(icons, 1, { // this animation won't start if repeat of the previous is set to -1
		scale: 2,
		opacity: 0,
		ease: Power2.easeOut
	}, 0.15, '-=2') // 2 secs before the end of 1st
;

btnPause.click(function() {
	tl.pause();
});

btnResume.click(function() {
	// tl.resume(); //works too
	tl.play();
});

btnReverse.click(function() {
	tl.reverse();
});



navLink.hover(function() {
	// perform this on hover
	rotateAroundY($(this), '180');
}, function() {
	rotateAroundY($(this), '0');
});

function rotateAroundY (link, rotateVal) {
	// perform this on hover
	var icon = link.find('.fa');
	var circle = link.find('.circle');
	var sprites = [];
	sprites[0] = circle;
	sprites[1] = icon;
	tl.staggerTo(sprites, 0.5, {
		rotationY: rotateVal
	}, 0.25);
}