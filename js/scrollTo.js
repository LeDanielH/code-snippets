var SmoothScroll = {
    nav: $('.nav__wrapper'),
    $target: '',
    duration: 1700,

    toSection: function (duration, finish) {
        SmoothScroll.$target = finish;
        var navHeight = SmoothScroll.nav.height();
        var targetOffset = $(SmoothScroll.$target).offset().top;
        var maxScroll = document.body.scrollHeight - $(window).height();
        var scroll = Math.min(targetOffset - navHeight, maxScroll);

        if (SmoothScroll.$target.length) {
            $('html, body').animate({
                scrollTop: scroll
            }, duration, 'easeInOutCubic');
            console.log(SmoothScroll.$target);
        }
    },

    init: function () {
        SmoothScroll.vars();
        $('a[href^="#"]').on('click', function (e) {
            if (!finish) {
                var finish = $($(this).attr('href'));
            } else {
                var finish = finish;
            }
            e.preventDefault();
            SmoothScroll.toSection(SmoothScroll.duration, finish);
        });
    }
};
