/**
 * Created by Daniel on 6/28/2017.
 */

const thresholdForDots = 4; // when to activate dots after number 1 or before the highest number;
const thresholdForNumberUpdates = 7; // when to activate number updating, paginator can have mazximum 7 numbers in view

function updatePage(pageNumber) {
    console.log(`will go to page number ${pageNumber}`);
    /* AJAX CODE */
}

function updateNumbers(numbersSelector, clickedNumber, highestNumber) {
    let numbersArray = [];

    let firstDotsActivated = clickedNumber >= (highestNumber - thresholdForDots);
    let lastDotsActivated = clickedNumber <= thresholdForDots;
    let bothDotsActivated = clickedNumber > thresholdForDots && clickedNumber <= (highestNumber - thresholdForDots);

    switch (true) {
        case bothDotsActivated:
            numbersArray = [1, '...', clickedNumber - 1, clickedNumber, clickedNumber+1, '...', highestNumber];
            break;
        case lastDotsActivated:
            numbersArray = [1, 2, 3, 4, 5, '...', highestNumber];
            break;
        case firstDotsActivated:
            numbersArray = [1, '...', highestNumber - thresholdForDots, highestNumber - (thresholdForDots-1), highestNumber - (thresholdForDots-2), highestNumber - 1, highestNumber];
            break;
        case 'default':
            console.log('no condition has been met');
            return;
    }

    for (let i = 0; i < numbersArray.length; i++) {
        numbersSelector[i].text = numbersArray[i];
        numbersSelector[i].dataset.page = numbersArray[i];

        /* highlight number */
        numbersArray[i] === clickedNumber ? numbersSelector[i].classList.add('active') : numbersSelector[i].classList.remove('active');

        /* activate dots */
        numbersArray[i] === '...' ? numbersSelector[i].classList.add('dotted') : numbersSelector[i].classList.remove('dotted');
    }

}

function getHighestNumber(elementsArray) {
    let itsAnArray = Array.prototype.slice.call(elementsArray, 0 ); // [...elementsArray] babel wont convert spread operator for IE11
    let newArray = itsAnArray.map((element) => parseInt(element.dataset.page));
    let newArrayWithoutFalsyVals = newArray.filter(x => x);
    return Math.max.apply(Math, newArrayWithoutFalsyVals);
}

function highlightNumber(numbersSelector, clickedNumber) {
    for (let i = 0; i < numbersSelector.length; i++) {
        i === (clickedNumber - 1) ? numbersSelector[i].classList.add('active') : numbersSelector[i].classList.remove('active');
    }
}

function updatePaginatorByNumbers(e) {
    /* matches makes sure element exists even if it's loaded dynamically */
    let matchesNumber = e.target.matches ? e.target.matches('.paginator__number') : event.target.msMatchesSelector('.paginator__number');
    if (!matchesNumber) return;
    e.preventDefault();
    const clickedNumber = e.target;
    const pageNumber = parseInt(clickedNumber.dataset.page);
    const paginatorContainer = clickedNumber.parentNode; // parent of numbers
    const numbersAll = paginatorContainer.querySelectorAll('.paginator__number'); // accessing dynamically created numbers
    const highestNumber = getHighestNumber(numbersAll);
    highestNumber > thresholdForNumberUpdates ? updateNumbers(numbersAll, pageNumber, highestNumber) : highlightNumber(numbersAll, pageNumber);

    updatePage(pageNumber);
}

function updatePaginatorByArrows(e) {
    /* matches makes sure element exists even if it's loaded dynamically */
    let matchesArrow = e.target.matches ? e.target.matches('.paginator__arrow') : event.target.msMatchesSelector('.paginator__arrow');
    if (!matchesArrow) return;
    e.preventDefault();
    const clickedArrow = e.target;
    const clickedArrowDirection = clickedArrow.dataset.direction;

    const subtract = clickedArrowDirection === 'subtract';
    const add = clickedArrowDirection === 'add';


    const clickedArrowParent = clickedArrow.parentNode;
    const numbersAll = clickedArrowParent.querySelectorAll('.paginator__number');
    const pageCurrentNumber = parseInt(clickedArrowParent.querySelector('.paginator__number.active').dataset.page);
    const highestNumber = getHighestNumber(numbersAll);

    const isLowest = pageCurrentNumber === 1;
    const isHighest = pageCurrentNumber === highestNumber;

    if(highestNumber > thresholdForNumberUpdates) {
        switch (true) {
            case subtract:
                if(isLowest) return;
                updateNumbers(numbersAll, pageCurrentNumber - 1, highestNumber);
                updatePage(pageCurrentNumber - 1);
                break;
            case add:
                if(isHighest) return;
                updateNumbers(numbersAll, pageCurrentNumber + 1, highestNumber);
                updatePage(pageCurrentNumber + 1);
                break;
            case 'default':
                console.log('arrows - no condition has been met');
                return;
        }
    } else {
        switch (true) {
            case subtract:
                if(isLowest) return;
                highlightNumber(numbersAll, pageCurrentNumber - 1);
                break;
            case add:
                if(isHighest) return;
                highlightNumber(numbersAll, pageCurrentNumber + 1);
                break;
            case 'default':
                console.log('something is wrong, could not highlight any number');
                return;
        }
    }
}

document.addEventListener('click', (e) => updatePaginatorByNumbers(e));
document.addEventListener('click', (e) => updatePaginatorByArrows(e));



