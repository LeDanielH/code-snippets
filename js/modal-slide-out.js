var Modal = {
    $pageWrapper: $('.page__wrap'),
    $opener: $('.open'),
    $exiter: $('.close'),
    $body: $('body'),
    $slide: $('.layout__slider'),
    lastScrolled: 0,
    open: function (currentAttr) {
        var currentTarget = Modal.$slide.find($("div[data-target='" + currentAttr + "']"));
        currentTarget.addClass('active').siblings().removeClass('active');
        Modal.$body.css({ 'overflow': 'hidden' });
        Modal.$pageWrapper
            .addClass('slide-active');

        if (w.layout === 'mobile') {
            setTimeout(function () {
                Modal.lastScrolled = w.top;
                Modal.$pageWrapper.css({ 'position': 'fixed' });
            }, 600);
        }

        if (currentAttr == 'calc') {
            Anal.calcIsVisible();
        }
    },

    close: function () {
        Modal.$body.css('overflow', 'auto');
        Modal.$pageWrapper.removeClass('slide-active');

        //doscroll na posledni pozici pred otevrenim slidu
        if (w.layout === 'mobile') {
            Modal.$pageWrapper.css({ 'position': 'absolute' });
            window.scrollTo(0, Modal.lastScrolled);
        }

        //odebrani activu u slidu az po zajeti
        setTimeout(function () {
            $('.layout__slide.active').removeClass('active');
        }, 600);
    },

    init: function () {

        Modal.$opener.on('click', function (e) {
            e.preventDefault();
            var currentAttr = $(e.currentTarget).attr('data-target');
            Modal.open(currentAttr);
        });

        Modal.$exiter.on('click', function (e) {
            e.preventDefault();
            Modal.close();
        });
    }
};
