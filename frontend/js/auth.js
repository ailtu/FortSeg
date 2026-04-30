const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value;
    const senha = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            // salva usuário logado
            localStorage.setItem("auth", "true");
            localStorage.setItem("user", JSON.stringify(data.user));

            // redireciona
            window.location.href = "dashboard.html";
        } else {
            errorMsg.textContent = data.error;
        }

    } catch (error) {
        console.error(error);
        errorMsg.textContent = "Erro ao conectar com o servidor";
    }
});