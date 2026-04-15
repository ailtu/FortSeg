function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const captcha = grecaptcha.getResponse();

  if (!username || !password) {
    alert("Preencha todos os campos!");
    return;
  }

  if (!captcha) {
    alert("Confirme o captcha!");
    return;
  }

  console.log("Login enviado:", {
    username,
    password,
    captcha
  });

  alert("Login validado (simulação)");
}

function forgotPassword() {
  alert("Recuperação de senha será implementada em breve.");
}