var Section = {
	inView: null,
	inViewHeight: null,
	inViewTop: null,
	$inView: null,
	active: null,
	preload: null,
	$html: $('html'),
	$sections: $('.section'),
	ignoreScrollEvents: false,
	scrollTarget: null,
	hash: null,
	isInited: false,

	vars: function () {
		Section.hDocument = $(document).height();
		Section.inViewOffset = w.height / 2;
	},

	showSection: function ($section) {

	},

	setActive: function () {
		
		Section.vars();
		var top = w.top + Scrollto.navHeight;
		var activeId;
		var preloadId;
		var inView;
		var $section = null;

		// finde out which is in view or active
		Section.$sections.each(function(){
			var $section = $(this);
			var sectionTopCalc = sectionTop = $section.offset().top;
			var id = $section.attr('id').replace('section_', '');

			// console.log(id, top, sectionTop, sectionTop + $section.outerHeight());

			if(Section.hDocument === w.top + w.height) {
				activeId = Section.$sections.last().attr('id').replace('section_', '');
			}else if(top >= sectionTop && top <= (sectionTop + $section.outerHeight())){
				activeId = id;
			}

			sectionTopCalc = sectionTop - Section.inViewOffset;
			if(top >= sectionTopCalc && top <= (sectionTopCalc + $section.outerHeight())){
				inView = id;
			}

			sectionTopCalc = sectionTop - w.height * 0.65;
			if(top >= sectionTopCalc){
				preloadId = id;
			}

		});

		// set active navigation trigger
		if(Section.active != activeId && typeof inView !== 'undefined'){
			Section.active = activeId;

			if(typeof activeId === 'undefined'){ return; }

			$('.nav__bar a').removeClass('is-active');
			$('.nav__bar a[data-section=' + activeId + ']').addClass('is-active');

			Section.changeHash($('#section_' + activeId).data('hash'));
		}

		// if some fast scroll-teleport is triggered, just figure out which section is active
		if(
			Section.ignoreScrollEvents && 
			(Section.scrollTarget !== preloadId || Section.scrollTarget !== inView)
		){
			return false;
		}

		// next section is comming so we can load some assets
		if(Section.preload != preloadId && typeof preloadId !== 'undefined'){
			Section.preload = preloadId;

			$section = $('#section_' + preloadId);

			Section.callPreloadHandler($section, preloadId);
		}

		// set in view section
		if(Section.inView != inView && typeof inView !== 'undefined'){
			// if section is out of view, we can clean up (stop 
			Section.inView = inView;
			Section.$inView = $('#section_' + inView);
			// cache some info abou section
			Section.inViewHeight = Section.$inView.outerHeight();
			try {
				Section.inViewTop = Section.$inView.offset().top - Section.inViewOffset;
			} catch(e) {
				console.log(e, $section);
			}
			

			if(Section.$inView.hasClass('in-view') && (inView !== 'landing')){
				return;
			}

			// for example, after page refresh and jump to specific scrollTop position
			Section.callPreloadHandler(Section.$inView, inView);

			Section.$inView.addClass('in-view');
			// console.log(Section.$inView);

			// ARROW
			if(inView === 'landing' && !w.device.mobile) {
				Landing.timeline.arrow.play();
				// Undergong.timeline.pause(0, true);
			} else {
				Landing.timeline.arrow.pause(0);
			}

			if(inView === 'gong' && !w.device.mobile) {
				Gong.timeline.play();
				$('.logo__image').css('opacity', 1);
			}

			if(inView === 'undergong' && w.layout === 'desktop') {
				Undergong.timeline.boxDot.play();
			}

			if(inView === 'services__list' && !w.device.mobile) {
				Services.timeline.play();
			}


			if(inView === 'effectivity' && !w.device.mobile) {
				Effectivity.timeline.play();
			}

			if(inView === 'fair' && !w.device.mobile) {
				Fair.timeline.play();
			}

			if(inView === 'blob' && !w.device.mobile) {
				BlobSection.timeline.play();
			}

			if(inView === 'about' && w.layout === 'desktop') {
				About.init();
			}

			Section.showSection(Section.$inView);

		}

		// hanlde of progress for paralax, for example

		var scrolledInSection = w.top - (Section.inViewTop - Scrollto.navHeight);
		var percentage = Math.max(0, Math.min(1, scrolledInSection / Section.inViewHeight));

		if(Section.inView === 'benefits') {
			Benefits.onScrollUpdate(percentage);
		} else if (Section.inView === 'mtb') {
			Mtb.onScrollUpdate(percentage);
		}

	},

	callPreloadHandler: function($section, preloadId) {

		if($section.hasClass('is-preloaded')){
			return;
		}

		$section.addClass('is-preloaded');
	},

	changeHash: function (sectionId) {

		window.location.hash = sectionId;
		
		// dataLayer.push({
		// 	'event':'VirtualPageview',
		// 	'virtualPageId': sectionId
		// });
	},

	showSectionByHash: function (hash) {
		if(!hash && Section.hash){
			hash = Section.hash;
		}

		if(!hash) {
			return;
		}

		var $section = $('.section[data-hash=' + hash[0] + ']');
		Section.ignoreScrollEvents = true;
		Scrollto.target($section);
	},

	handleDeepLinksInit: function () {
		var hash = window.location.hash.split('#')[1].split('_');

		var $section = $('.section[data-hash=' + hash[0] + ']');

		if (!$section.length) { return; }

		Section.hash = hash;
		Section.ignoreScrollEvents = true;
		Section.scrollTarget = $section.attr('id').replace('section_', '');
		window.scroll(0, 0);
	},

	resizeHandler: function () {
		Section.vars();
		Section.setActive();
	},

	scrollHandler: function () {
		Section.setActive();
	},

	init: function () {

	}
};