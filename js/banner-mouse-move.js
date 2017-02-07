document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var Banner = {

        wrapper: document.getElementById('banner'),
        couples: document.querySelectorAll('.banner__couple'),
        lastMouseMove: 0,

        vars: function () {
            Banner.couples = wrapper.querySelectorAll('.banner__couple');
            Banner.width = Banner.wrapper.offsetWidth;
            Banner.imagesLength = Banner.couples.length;
        },

        turnHeads: function (x) {
            Banner.offset = Banner.wrapper.getBoundingClientRect().left;
            Banner.mouseXAxisRatio = (x - Banner.offset) / Banner.width;

            if (Banner.mouseXAxisRatio < 0) Banner.mouseXAxisRatio = 0;
            if (Banner.mouseXAxisRatio > 1) Banner.mouseXAxisRatio = 1;
            var step = Math.round(Banner.mouseXAxisRatio * (Banner.imagesLength - 1));
            Array.prototype.forEach.call(Banner.couples, function (el, i) {
                if (step == i) {
                    el.classList.add('active');
                } else {
                    el.classList.remove('active');
                }
            });
        },

        init: function () {
            Banner.vars();
            document.addEventListener('mousemove', function (e) {
                if (Banner.lastMouseMove + 20 > Date.now()) return;
                Banner.lastMouseMove = Date.now();
                Banner.turnHeads(e.clientX);
            });

        }
    };
    return Banner.init();
});
