document.addEventListener('DOMContentLoaded', function () {
    var elemById = document.getElementById('someObj');
    var elemByClass = document.querySelectorAll('.someObj');
    var elemInsideElem = getElemById.querySelectorAll('.someElemInsideAnotherElem');
    var elemByClassLength = elemByClass.length;
    var elemLeftOffset = elemById.getBoundingClientRect().left;
    Array.prototype.forEach.call(elemByClass, function (el, i) {
        if (step == i) { el.classList.add('active'); }
        else { el.classList.remove('active'); }
    });
});

function onMouseMove(x) { console.log(x); }
document.addEventListener('mousemove', function (e) {
    onMouseMove(e.clientX);
});

