/**
 * Created by Daniel on 6/27/2017.
 */
function openPopUp(e) {
    let matches = e.target.matches ? e.target.matches('.popup-trigger') : event.target.msMatchesSelector('.popup-trigger');
    if (!matches) return;
    const opener = e.target;
    const wrapper = opener.parentNode;
    const otherSojkaPopUps = document.querySelectorAll('.popup');
    for (let i = 0; i < otherSojkaPopUps.length; i++) { otherSojkaPopUps[i].classList.remove('is-opened');}
    wrapper.classList.add('is-opened');
}

function closePopUp(e) {
    let matches = e.target.matches ? e.target.matches('.popup-close') : event.target.msMatchesSelector('.popup-close');
    if (!matches) return;
    const opener = e.target;
    const wrapper = opener.parentNode.parentNode;
    wrapper.classList.remove('is-opened');
}

document.addEventListener('click', (e) => closePopUp(e));
document.addEventListener('click', (e) => openPopUp(e));



