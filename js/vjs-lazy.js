/**
 * Created by Daniel on 7/10/2017.
 */

const LazyPageSection = {
    lastScroll: 0,
    debounce: 1000,
    isLoaded: {},
    loadCount: 0,

	load: function (container) {
		var dataLocation = container.dataset.location;
		if (!dataLocation) {
			container = $(container).parent()[0];
			dataLocation = container.dataset.location;
			if (!dataLocation) { return; }
		}
		if (!$(container).hasClass('not-loaded')) return;
		LazyPageSection.loadCount++;
		if (!container.id) container.id = "ajax__container" + LazyPageSection.loadCount;
		var id = container.id;
		//				console.log("loading " + id);
		Linksoft.Web.LoadByAjax(id, {
			url: dataLocation,
			cache: container.dataset.cache || false,
			":background": true,
			successHandler: function () {
				$('#' + id).removeClass('not-loaded');
				LazyPageSection.handler();
			}
		});
	},

    loadContent: function (loadInto) {
        if (!loadInto.length) return;
		this.currentScroll = $(window).scrollTop();
		//console.log("loadContent: currentScroll", this.currentScroll);

        for(let i = 0; i < loadInto.length; i++) {
			if (this.isLoaded[i]) continue;
            const targetOffset = loadInto[i].offsetTop;
            const windowHeight = window.innerHeight;
            const toBeLoaded = this.currentScroll > (targetOffset - 2*windowHeight);
//            console.log(this.currentScroll + ' > ' + (targetOffset - windowHeight), loadInto[i]);
			if (toBeLoaded) {
				if (!$(loadInto[i]).hasClass('not-loaded')) {
					this.isLoaded[i] = true;
				} else {
					LazyPageSection.load(loadInto[i]);
					this.isLoaded[i] = true;
				}
				/*
                const dataLocation = loadInto[i].dataset.location;
				if (!loadInto[i].id) loadInto[i].id = "ajax__container" + i;
				var id = loadInto[i].id;
//				console.log("loading " + id);
				Linksoft.Web.LoadByAjax(id, {
                    url: dataLocation,
                    cache: false,
					":background": true,
					successHandler: function () {
						$('#'+id).removeClass('not-loaded');
					}
	            });
				*/
				
				break;
            }
		}
		if (this.isLoaded[loadInto.length - 1]) {
//			console.log("remove listener");
			document.removeEventListener('scroll', LazyPageSection.handler);
			document.removeEventListener('resize', LazyPageSection.handler);
			document.removeEventListener('hashchange', LazyPageSection.handler);
			window.clearInterval(LazyPageSection.timerId);
		}
	},
	handler: function () {
		if (LazyPageSection.lastScroll + LazyPageSection.debounce > Date.now()) return;
		LazyPageSection.lastScroll = Date.now();
		LazyPageSection.loadContent(LazyPageSection.ajaxContainers)
	},
	init: function () {
//		console.log("init started");
		LazyPageSection.ajaxContainers = document.querySelectorAll('.ajax__container');
		if (!LazyPageSection.ajaxContainers) return;
		document.addEventListener('scroll', LazyPageSection.handler);
		document.addEventListener('resize', LazyPageSection.handler);
		document.addEventListener('hashchange', LazyPageSection.handler);
		LazyPageSection.timerId = window.setInterval(LazyPageSection.handler, 1000);
		LazyPageSection.handler();
		
//		console.log("init done");
    }
};

$(LazyPageSection.init);
window.LazyPageSection = LazyPageSection;
