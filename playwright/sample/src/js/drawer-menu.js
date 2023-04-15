const body = document.querySelector("body");
const hamburgerButton = document.getElementById("js-hamburger-button");
const drawerMenu = document.querySelector('[data-name="drawer-menu"]');
const focusControlTargets = [document.getElementById("js-form"), document.getElementById("js-title")];

const isOpen = (button) => button.getAttribute("aria-expanded") === "true";
const toggleInertAttribute = (targets, boolean) => {
    targets.forEach(target => {
        target.inert = boolean;
    })
}
const openMenu = (button, menu) => {
    body.classList.add("is-drawer-active");
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", false);
    button.setAttribute("aria-expanded", true);
    toggleInertAttribute(focusControlTargets,true);
}

const closeMenu = (button, menu) => {
    body.classList.remove("is-drawer-active");
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", true);
    button.setAttribute("aria-expanded", false);
    toggleInertAttribute(focusControlTargets,false);
}

hamburgerButton.addEventListener("click", (e) => {
    if(isOpen(e.target)){
        closeMenu(e.target, drawerMenu);
    } else {
        openMenu(e.target, drawerMenu);
    }
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("is-drawer-active")) {
        closeMenu(hamburgerButton, drawerMenu);
    }
});

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeMenu(hamburgerButton, drawerMenu);
})
