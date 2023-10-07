const logoutButton = document.getElementById("js-logout-button");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "./login.html";
});
