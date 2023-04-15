export const togglePasswordDisplay = (e) => {
    const selectedInput = e.target.nextElementSibling;

    if (selectedInput.type === "password"){
        selectedInput.type = "text";
        e.target.setAttribute("aria-label", "パスワードを非表示にします");
    } else {
        selectedInput.type = "password";
        e.target.setAttribute("aria-label", "パスワードを表示します");
    }
    e.target.classList.toggle("is-open");
}
