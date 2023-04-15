import { checkFormValidityInBlur } from "./modules/validation";
import { togglePasswordDisplay } from "./modules/togglepassword";

const passwordOfInput = document.querySelector(".js-form-password");
const confirmPasswordOfInput = document.querySelector(".js-form-confirm-password");
const currentPasswordOfInput = document.querySelector(".js-form-current-password");
const formElements = [passwordOfInput, confirmPasswordOfInput, currentPasswordOfInput];
const errorOfConfirmPassword = document.querySelector('[data-name="confirm-password-error"]');
const eyeIcons = document.querySelectorAll(".js-eye-icon");
const submitButton = document.querySelector(".js-submit-button");

const getErrorElement = (element) => element.parentElement.querySelector(".js-error");
const getInputElement = (element) => element.parentElement.querySelector("input");
const isMatchValue = (input, confirmInput) => input.value === confirmInput.value;
const isMatchPassword = (userData) => currentPasswordOfInput.value === userData.password;
const hasInvalidClass = () => formElements.some(element => element.classList.contains("invalid"));
const confirmIfCanSubmit = () => submitButton.disabled = !isMatchValue(passwordOfInput, confirmPasswordOfInput)

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", (e) => {
        if(e.relatedTarget === element.parentElement.querySelector(".js-eye-icon")) {
            if(element.value && getErrorElement(element).textContent === "入力してください") getErrorElement(element).textContent = "";
            return;
        }
        checkFormValidityInBlur(submitButton, element);

        if (passwordOfInput.value && confirmPasswordOfInput.value) errorOfConfirmPassword.textContent = isMatchValue(passwordOfInput, confirmPasswordOfInput) ? "" : "上記のPasswordと異なります。もう一度入力してください。";
        if (formElements.some(element => element.classList.contains("invalid"))) return;
        
        confirmIfCanSubmit();
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

const changeAndSetPassword = (userData) => {
    userData.password = passwordOfInput.value;
    localStorage.setItem("registeredData", JSON.stringify(userData));
}

submitButton.addEventListener("click", () => {
    const token = localStorage.getItem("token");
    const registeredData = JSON.parse(localStorage.getItem("registeredData"));

    if(!token) {
        window.location.href = "./notautherize.html";
        return;
    }

    if(!registeredData) {
        localStorage.removeItem("token");
        window.location.href = "./notautherize.html";
        return;
    }

    if(!isMatchPassword(registeredData)){
        document.querySelector('[data-name="current-password-error"]').textContent = "パスワードが一致しません";
        submitButton.disabled = true;
        return;
    }

    changeAndSetPassword(registeredData);
    const urlParameter = `?token=${token}`;
    window.location.href = `./reset-password-done.html${urlParameter}`;
});
