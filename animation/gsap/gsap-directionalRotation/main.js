// var ring01 = $('#ring01');
var rings = $('g[id^="ring"]');
$('#rings').hover(function() {
	rings.each(function() {
		backHome($(this));
	});
}, function() {
	rings.each(function() {
		randomize($(this));
	});
});

rings.each(function() {
	randomize($(this));
});
// TweenMax.set(ring01, {
// 	transformOrigin: 'center',
// 	rotation: '45deg'
// });
/*
TweenMax.to(ring01, 5, {
	transformOrigin: 'center',
	directionalRotation: {
		rotation: '180_cw',
		// rotationY: '180_ccw',
		// useRadian: true
	}
	
	// directionalRotation: '360_short', // does the same as rotation but works in 3d!
	// rotation: '360_short',
});
*/

function randomize(ring) {
	var degrees = Math.round(Math.random()*360);
	TweenMax.to(ring, 10, {
		transformOrigin: 'center',
		rotation: degrees + '_short'
	});
}

function backHome(ring) {
	TweenMax.to(ring, 2, {
		transformOrigin: 'center',
		rotation: '0_ccw',
		ease: Elastic.easeOut
	});
}