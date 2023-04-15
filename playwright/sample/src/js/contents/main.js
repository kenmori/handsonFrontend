const userMenuButton = document.getElementById("js-user-menu-button");
const logoutButton = document.getElementById("js-logout-button");
const menuCloseButton = document.getElementById("js-close-icon");
const userMenu = document.getElementById("js-user-menu");

const toggleUserMenu = () => userMenu.classList.toggle("is-active");

userMenuButton.addEventListener("click", () => {
    toggleUserMenu();
    displayUserInfo();
});
menuCloseButton.addEventListener("click", toggleUserMenu);

const displayUserInfo = () => {
    const userNameArea = document.getElementById("js-username");
    const emailArea = document.getElementById("js-email");
    const registeredData = JSON.parse(localStorage.getItem("registeredData"));

    userNameArea.textContent = registeredData.name;
    emailArea.textContent = registeredData.email;
}

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./index.html";
});
