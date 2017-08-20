var $circles = $('.circle'),
	tl = new TimelineMax(),
	imageUrls = [
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + getRandomNum(),
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + getRandomNum(),
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + getRandomNum(),
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + getRandomNum(),
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + getRandomNum(),
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + getRandomNum(),
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + getRandomNum(),
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + getRandomNum(),
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + getRandomNum(),
		'https://s3-us-west-2.amazonaws.com/s.cdpn.io/409269/valley.jpg?' + getRandomNum()
	],
	images = [],
	imgCount = 0;

for (var i = 0; i < imageUrls.length; i++) {
	images.push($("<img>"));
	images[i].load(checkLoadProgress);
	images[i].attr("src", imageUrls[i]);
}

function getRandomNum() {
	return Math.floor(Math.random() * 10000);
}

function checkLoadProgress() {
	imgCount++;
	console.log('Image is done loading', imgCount);
	if (imgCount >= imageUrls.length) {
		loaderOut();
	}
}

function loaderOut() { // after images are loaded ->
	tl.pause();

	var tl2 = new TimelineMax();
	var circleArray = ['.circle3', '.circle2'];
	tl2.insert(
		TweenMax.staggerTo(circleArray, 0.5, {
			opacity: 0
		}, 0.2)
	);

	tl2.insert(
		TweenMax.to('.circle1', 0.5, {
			width: '100%',
			scale: 1, // reset the scale cause we don't know at which point the first animation stops
			left: 0,
			marginLeft: 0,
			borderRadius: 0,
			ease: Power1.easeIn
		}), '+=0'
	);

	tl2.insert(
		TweenMax.to('.circle1', 0.5, {
			height: '100%',
			top: 0,
			marginTop: 0,
			ease: Elastic.easeInOut,
			onStart: function() {
				var cssUrl = 'url('+ imageUrls[0] +')';
				$('.img-container').css('background-image', cssUrl);
			}
		}), '+=0'
	);

	tl2.insert(
		TweenMax.to('.preloader', 0.5, {
			opacity: 0
		}), '+=0'
	);


}

TweenMax.set($circles, { // seting objects properties before the animation starts
	scale: 0
});

tl.insert(
	TweenMax.staggerTo($circles.toArray(), 1, { // how long each circle animation takes
		// make sure the array is in the right order
		opacity: 1,
		scale: 1,
		ease: Power1.easeIn
	}, 0.2) // how long one after the other
);

tl.insert(
	TweenMax.staggerTo($circles.toArray(), 1, {
		// opacity: 0,
		scale: 1.2,
		boxShadow: '0 25px 25px rgba(0,0,0,.4)',
		repeat: -1,
		yoyo: true,
		ease: Power1.easeOut
	}, 0.2), '-=0.4' // +=0 is a second argument of an insert method and it will put the animation at the end of the timeline
);