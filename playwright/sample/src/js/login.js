import { checkFormValidityInBlur, confirmIfCanSubmit } from "./modules/validation";
import { togglePasswordDisplay } from "./modules/togglepassword";
import { Chance } from "chance";
const chance = new Chance();

const userIdOfInput = document.querySelector(".js-form-userid");
const passwordOfInput = document.querySelector(".js-form-password");
const formElements = [userIdOfInput,passwordOfInput];
const eyeIcon = document.querySelector(".js-eye-icon");
const errorOfPassword = document.querySelector('[data-name="password-error"]');
const submitButton = document.querySelector(".js-submit-button");
const invalidItems = document.getElementsByClassName("invalid");

formElements.forEach(element => {
    element.classList.add("invalid");

    element.addEventListener("blur", (e) => {
        if(e.relatedTarget === eyeIcon) {
            if(passwordOfInput.value && errorOfPassword.textContent === "入力してください") errorOfPassword.textContent = "";
            return;
        }

        checkFormValidityInBlur(submitButton, e.target);
        confirmIfCanSubmit(submitButton,invalidItems);
    });
});

eyeIcon.addEventListener("click", togglePasswordDisplay);
eyeIcon.addEventListener("blur", (e) => {
    if(e.relatedTarget === passwordOfInput) return;
    checkFormValidityInBlur(submitButton, passwordOfInput);

    if(invalidItems > 0) return;
    confirmIfCanSubmit(submitButton,invalidItems);
});

const tryToLogin = async() => {
    let result;
    try {
        result = await checkToRegistered();
        localStorage.setItem("token", result.token);
    } catch(rejectObj) {
        result = rejectObj;
    } finally {
        window.location.href = result.token ? "./index.html" : "./notautherize.html";
    }
}

const checkToRegistered = () => {
    return new Promise((resolve, reject) => {
        const inputsValues = {
            userId: userIdOfInput.value,
            password: passwordOfInput.value
        }
        const registeredData = JSON.parse(localStorage.getItem("registeredData"));

        if ((inputsValues.userId === registeredData.name || inputsValues.userId === registeredData.email) && (inputsValues.password === registeredData.password)) {
            resolve({ token: chance.apple_token(), ok: true, code: 200 });
        } else {
            reject({ ok: false, code: 401 });
        }
    })
}

submitButton.addEventListener("click", tryToLogin);
