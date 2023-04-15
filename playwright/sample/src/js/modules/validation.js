const validationTerms = {
    name: {
        upperLimitOfText: 15
    },
    password: {
        pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/
    }
}

export const validationOptions = {
    name: {
        isValid: (target) => {
            return target.value.length < validationTerms.name.upperLimitOfText;
        },
        errorMessage: "ユーザー名は15文字以内で入力してください",
    },
    email: {
        isValid: (target) => {
            return target.validity.valid;
        },
        errorMessage: "メールアドレスの形式になっていません",
    },
    confirmEmail: {
        isValid: () => {
            return true;
        },
    },
    password: {
        isValid: (target) => {
            return validationTerms.password.pattern.test(target.value);
        },
        errorMessage: "8文字以上の大小の英数字を交ぜたものにしてください",
    },
    confirmPassword: {
        isValid: () => {
            return true;
        },
    },
    userId: {
        isValid: () => {
            return true;
        },
    },
    submitButton: {
        errorMessage: "既に登録済みのメールアドレスです",
    }
};

const addInvalidClass = target => target.classList.add("invalid");
const removeInvalidClass = target => target.classList.remove("invalid");
export const showErrorMessage = target => target.nextElementSibling.textContent = validationOptions[target.name].errorMessage;
const removeErrorMessage = target => target.nextElementSibling.textContent = "";
export const isEmptyOfInput = target => target.value.trim() === "";
const isValidFormInput = target => validationOptions[target.name].isValid(target);

export const confirmIfCanSubmit = (element,invalidItems) => element.disabled = invalidItems.length > 0;

export const checkFormValidityInBlur = (element, target) => {
    element.disabled = true;
    removeErrorMessage(element);

    if (isEmptyOfInput(target)) {
        addInvalidClass(target);
        target.nextElementSibling.textContent = "入力してください";
        return;
    }

    if (!isValidFormInput(target)) {
        showErrorMessage(target);
        addInvalidClass(target);
        return;
    }

    removeErrorMessage(target);
    removeInvalidClass(target);
};
