var plane = $('#plane');
TweenMax.to(plane, 5, {
	bezier: {
		autoRotate: 45,
		type: 'thru', // default
		curviness: 2,
		values: [
			{ left:150, top: 50 },
			{ left:300, top: 200 },
			{ left:450, top: 50 },
			{ left:600, top: 200 },
			{ left:750, top: 50 },
			{ left:900, top: 200 },
			{ left:150, top: 50 }
		]
	},
	repeat: -1,
	ease: Linear.easeNone
});