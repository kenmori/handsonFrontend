import { checkFormValidityInBlur, confirmIfCanSubmit } from "./modules/validation";
import { Chance } from "chance";
const chance = new Chance();

const emailOfInput = document.querySelector(".js-form-email");
const submitButton = document.querySelector(".js-submit-button");
const invalidItems = document.getElementsByClassName("invalid");

emailOfInput.addEventListener("blur", (e) => {
    e.target.classList.add("invalid");
    checkFormValidityInBlur(submitButton, e.target);
    confirmIfCanSubmit(submitButton,invalidItems);
});

const tryToSubmit = async() => {
    let result;
    try {
        result = await checkToRegistered();
        localStorage.setItem("passwordReissueToken", result.token);
    } catch(rejectObj) {
        result = rejectObj;
        submitButton.nextElementSibling.textContent = "一致するアカウントが見つかりませんでした";
        submitButton.disabled = true;
        return;
    } 
    const urlParameter = `?token=${result.token}`;
    window.location.href = `./register/password.html${urlParameter}`;
}

const checkToRegistered = () => {
    return new Promise((resolve, reject) => {
        const registeredData = JSON.parse(localStorage.getItem("registeredData"));
        
        if (emailOfInput.value === registeredData.email) {
            resolve({ token: chance.apple_token(), ok: true, code: 200 });
        } else {
            reject({ ok: false, code: 401 });
        }
    })
}

submitButton.addEventListener("click", tryToSubmit);
