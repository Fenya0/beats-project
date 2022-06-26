const hamburgerButton = document.querySelector("#hamburger");
const fullscreenMenu = document.querySelector("#fullscreen");
const exitMenu = document.querySelector("#exit");
const computedStyles = getComputedStyle(fullscreen);

hamburgerButton.addEventListener("click", e => {
    e.preventDefault();
    let currentMenu = computedStyles.display

});
