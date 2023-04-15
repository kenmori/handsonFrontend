const urlParameter = Object.fromEntries(new URLSearchParams(window.location.search));
const currentPageToken = urlParameter.token;
const registeredToken = localStorage.getItem("token");
const isMismatchToken = (currentToken, registeredToken) => currentToken !== registeredToken;

if (!registeredToken || !currentPageToken){
    window.location.href = "./../notautherize.html";
}

if (isMismatchToken(currentPageToken, registeredToken)) {
    localStorage.removeItem("token");
    window.location.href = "./../notautherize.html";
}
