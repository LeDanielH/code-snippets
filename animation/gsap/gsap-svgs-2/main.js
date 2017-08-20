
var star = $('.star');
var newShape = "99.7,0 115.2,52.5 158.5,19.1 140.2,70.6 194.8,69.1 149.7,100 194.8,130.9 140.2,129.4 158.5,180.9 115.2,147.6 99.7,200 84.3,147.6 41,180.9 59.3,129.4 4.6,130.9 49.7,100 4.6,69.1 59.3,70.6 41,19.1 84.3,52.5";

TweenMax.to(star, 9, {
	transformOrigin: '50% 50%',
	rotation: '360deg',
	repeat: -1,
	ease: Linear.easeNone
});

TweenMax.to(star, 2, {
	attr: {
		points: newShape
	},
	repeat: -1,
	yoyo: true,
	ease: Elastic.easeInOut
});