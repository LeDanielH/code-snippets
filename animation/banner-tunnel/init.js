var Banner;

document.addEventListener('DOMContentLoaded', function() {
	'use strict';
	Banner = {

		// TUNNEL
		$wrapper: document.getElementById('banner'),
		$tunnel1: document.getElementById('banner__tunnel-1'),
		$tunnel2: document.getElementById('banner__tunnel-2'),
		$tunnelEnd: document.getElementById('banner__tunnel-end'),
		$seats: document.getElementById('banner__seats'),
		$darken: document.getElementById('banner__darken'),

		// TRIANGLES
		$cominTop: document.getElementById('banner__comin-top'),
		$cominRight: document.getElementById('banner__comin-right'),
		$cominLeft: document.getElementById('banner__comin-left'),

		// TEXT ELEMENTS
		$title: document.getElementById('banner__title'),
		$cta: document.getElementById('banner__cta'),
		$footer: document.getElementById('banner__footer'),

		// ZOOM IN SETTINGS
		zoomInDuration: 3.7,
		seatsDuration: 2.7,
		zoomInEase: Power0.easeNone,
		zoomInScale: 8, // 180%
		zoomInRotation: 4,
		zoomInXAxis: -20,
		zoomInYAxis: -38,

		// COME IN SETTINGS
		comeInEase: Power3.easeOut,
		cominDuration: 0.8,
		waitBeforeComin: 2.2,
		textsStagger: 0.85,
		seatsScaleFrom: 1.1,
		seatsScaleDownYAxis: 0,
		seatsCominEase: Power1.easeOut,

		counter: 0,
		isSetting: false,
		initDelay: 0.1,

		// DEFINING TIMELINES BEFORE ADDING PROPERTIES TO THEM
		timelinesInit: {

			// TWO MAIN TIMELINES
			cominElements: new TimelineLite(),
			zoomIn: new TimelineLite({
				onComplete: function () {
					// GOOGLE WONT ALLOW ANIMATION LONGER THAN 30 SECONDS
					Banner.counter++;
					if (Banner.counter < 12) {
						this.restart();
					}
				}
			}),

			// TIMELINES THAT WILL GO INSIDE THE 'cominElements' TIMELINE
			setOtherElements: new TimelineLite({paused: true}),
			triangles: new TimelineLite({paused: true}),
			texts: new TimelineLite({paused: true}),
			darken: new TimelineLite({paused: true}),
			seats: new TimelineLite({paused: true})
		},

		animateZoomIn:function () {
			Banner.timelinesInit.zoomIn
			.addLabel('phase1')
			.set(Banner.$tunnel1, {
				opacity: 0,
				scale: 1,
				x: 0,
				y: 0
			},'phase1')
			.set(Banner.$tunnel2, {
				opacity: 1,
				scale: '1.' + Banner.zoomInScale/2,
				x: Banner.zoomInXAxis/2,
				y: Banner.zoomInYAxis/2
			}, 'phase1')

			.to(Banner.$tunnel1, Banner.zoomInDuration/2, {
				opacity: 1,
				scale: '1.' + Banner.zoomInScale/2,
				x: Banner.zoomInXAxis/2,
				y: Banner.zoomInYAxis/2,
				ease: Banner.zoomInEase
			}, 'phase1')
			.to(Banner.$tunnel2, Banner.zoomInDuration/2, {
				opacity: 0,
				scale: '1.' + Banner.zoomInScale,
				x: Banner.zoomInXAxis,
				y: Banner.zoomInYAxis,
				ease: Banner.zoomInEase
			}, 'phase1');
		},

		animateOtherElements: function () {

			Banner.timelinesInit.setOtherElements
				.set(Banner.$darken, {opacity: 0})
				.set(Banner.$cominTop, {y: '-100%'})
				.set(Banner.$cominRight, {x: '100%'})
				.set(Banner.$cominLeft, {x: '-100%'})
				.set(Banner.$cta, {y: '150%', transformStyle:"preserve-3d", rotationY: 10})
				.set(Banner.$title, {x: '-150%'})
				.set(Banner.$seats, {scale: Banner.seatsScaleFrom});

			Banner.timelinesInit.seats
			.to(Banner.$seats, Banner.seatsDuration, {
				x: -1,
				scale: 1,
				y: Banner.seatsScaleDownYAxis,
				ease: Banner.seatsCominEase
			});


			Banner.timelinesInit.triangles
			.staggerTo([Banner.$cominTop, Banner.$cominRight, Banner.$cominLeft], Banner.cominDuration, {
				x: '0%',
				y: '0%',
				ease: Banner.comeInEase
			});

			Banner.timelinesInit.texts
			.staggerTo([Banner.$title, Banner.$cta], Banner.cominDuration, {
				x: '0%',
				y: '0%',
				rotationY: 0,
				ease: Banner.comeInEase
			});

			Banner.timelinesInit.darken
			.to(Banner.$darken, Banner.cominDuration*2, {
				opacity: 0.2,
				ease: Banner.comeInEase
			});

			// THIS IS WHERE I CONTROL ALL OF THE TIMELINES WRITTEN ABOVE
			Banner.timelinesInit.cominElements
				.add(Banner.timelinesInit.setOtherElements.play())
				.addLabel('startComin')
				.add(Banner.timelinesInit.seats.play())
				.add(Banner.timelinesInit.triangles.play(), 'startComin+=' + Banner.waitBeforeComin)
				.add(Banner.timelinesInit.darken.play(), 'startComin+=' + Banner.waitBeforeComin)
				.add(Banner.timelinesInit.texts.play(), '-=' + Banner.textsStagger)
				.timeScale(1);
		},

		init: function() {
			Banner.animateOtherElements();
			Banner.animateZoomIn();
		}
	};

	Banner.init();
});
