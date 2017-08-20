document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var MoveByMouseMove = {

        wrapper: document.getElementById('element'),
        toBeSwitched: document.querySelectorAll('.element__toBeSwitched'),
        lastMouseMove: 0,

        vars: function () {
            MoveByMouseMove.toBeSwitched = wrapper.querySelectorAll('.element__toBeSwitched');
            MoveByMouseMove.width = MoveByMouseMove.wrapper.offsetWidth;
            MoveByMouseMove.imagesLength = MoveByMouseMove.toBeSwitched.length;
        },

        turnHeads: function (x) {
            MoveByMouseMove.offset = MoveByMouseMove.wrapper.getBoundingClientRect().left;
            MoveByMouseMove.mouseXAxisRatio = (x - MoveByMouseMove.offset) / MoveByMouseMove.width;

            if (MoveByMouseMove.mouseXAxisRatio < 0) MoveByMouseMove.mouseXAxisRatio = 0;
            if (MoveByMouseMove.mouseXAxisRatio > 1) MoveByMouseMove.mouseXAxisRatio = 1;
            var step = Math.round(MoveByMouseMove.mouseXAxisRatio * (MoveByMouseMove.imagesLength - 1));
            Array.prototype.forEach.call(MoveByMouseMove.toBeSwitched, function (el, i) {
                if (step == i) {
                    el.classList.add('active');
                } else {
                    el.classList.remove('active');
                }
            });
        },

        init: function () {
            MoveByMouseMove.vars();
            document.addEventListener('mousemove', function (e) {
                if (MoveByMouseMove.lastMouseMove + 20 > Date.now()) return;
                MoveByMouseMove.lastMouseMove = Date.now();
                MoveByMouseMove.turnHeads(e.clientX);
            });

        }
    };
    return MoveByMouseMove.init();
});
