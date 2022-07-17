const hamburgerButton = document.querySelector("#hamburger");
const fullscreenMenu = document.querySelector("#fullscreen");
const exitMenu = document.querySelector("#exit");

hamburgerButton.addEventListener("click", e => {
    e.preventDefault();
    
    fullscreenMenu.style.display = "block";
});

exitMenu.addEventListener("click", e => {
    e.preventDefault();
    
    fullscreenMenu.style.display = "none";
});