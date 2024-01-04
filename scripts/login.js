function onchangeEmail() {
   toggleButtonsDisable();
   toggleEmailErrors();
}

function onchangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function toggleEmailErrors() {
    const email = form.email().value
    form.emailObg().style.display = email ? "none" : "block";
    
    form.emailInv().style.display = validateEmail(email) ? "none" : "block"
   
}

function togglePasswordErrors() {
    const password = form.password().value
    form.senhaObg().style.display = password ? "none" : "block"
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverpasswordbutton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isPasswordValid() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false;
    }
    return true;
}

const form = {
    email: () => document.getElementById('email'),
    emailInv: () => document.getElementById('emailInv'),
    emailObg: () => document.getElementById('emailObg'),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById('password'),
    senhaObg: () => document.getElementById('senhaObg'),
    recoverpasswordbutton: () => document.getElementById('recover-password-button')
}