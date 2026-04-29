const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        localStorage.setItem("auth", "true");
        window.location.href = "dashboard.html";
    } else {
        errorMsg.textContent = "Usuário ou senha inválidos!";
    }
});