import { checkFormValidityInBlur } from "./modules/validation";
import { togglePasswordDisplay } from "./modules/togglepassword";
import { Chance } from "chance";
const chance = new Chance();

const urlParameter = Object.fromEntries(new URLSearchParams(window.location.search));
const currentPageToken = urlParameter.token;
const registeredToken = localStorage.getItem("passwordReissueToken");

if(currentPageToken !== registeredToken) window.location.href = "./../notautherize.html";


const passwordOfInput = document.querySelector(".js-form-password");
const confirmPasswordOfInput = document.querySelector(".js-form-confirm-password");
const formElements = [passwordOfInput, confirmPasswordOfInput];
const errorOfConfirmPassword = confirmPasswordOfInput.nextElementSibling;
const submitButton = document.querySelector(".js-submit-button");
const eyeIcons = document.querySelectorAll(".js-eye-icon");

const getErrorElement = (element) => element.parentElement.querySelector(".js-error");
const getInputElement = (element) => element.parentElement.querySelector("input");
const isMatchPasswordFields = () => passwordOfInput.value === confirmPasswordOfInput.value;
const hasInvalidClass = () => formElements.some(element => element.classList.contains("invalid"));
const confirmIfCanSubmit = (input, confirmInput) => submitButton.disabled = input.value !== confirmInput.value;

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", (e) => {
        if(e.relatedTarget === element.parentElement.querySelector(".js-eye-icon")) {
            if(element.value && getErrorElement(element).textContent === "入力してください") getErrorElement(element).textContent = "";
            return;
        }

        checkFormValidityInBlur(submitButton, element);

        if (hasInvalidClass()) return;
        errorOfConfirmPassword.textContent = isMatchPasswordFields() ? "" : "上記のpasswordと異なります。もう一度入力してください。";
        confirmIfCanSubmit(passwordOfInput,confirmPasswordOfInput);
    });
});

eyeIcons.forEach(icon => {
    icon.addEventListener("click", togglePasswordDisplay)
})
eyeIcons.forEach(icon => {
    icon.addEventListener("blur", (e) => {
        if(e.relatedTarget === getInputElement(icon)) return;
        checkFormValidityInBlur(submitButton, getInputElement(icon));
    
        if(hasInvalidClass()) return;
        confirmIfCanSubmit();
    });
})

const changePassword = () => {
    const passwordValue = passwordOfInput.value;
    const userData = JSON.parse(localStorage.getItem("registeredData"));
    userData.password = passwordValue;
    localStorage.setItem("registeredData", JSON.stringify(userData));
}

submitButton.addEventListener("click", () => {
    changePassword();

    const token = chance.apple_token();
    const newUrlParameter = `?token=${token}`;

    localStorage.setItem("passwordReissueToken", token);
    window.location.href = `./password-done.html${newUrlParameter}`;
});
