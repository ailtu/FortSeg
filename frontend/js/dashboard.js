// proteção de rota
if (localStorage.getItem("auth") !== "true") {
  window.location.href = "login.html";
}

const table = document.getElementById("userTable");

// buscar usuários do backend
async function loadUsers() {
  try {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();

    console.log(users); // 👈 DEBUG

    table.innerHTML = "";

    users.forEach(user => {
      const row = `
        <tr>
          <td>${user.id}</td>
          <td>${user.nome}</td>
          <td>${user.email}</td>
          <td>${user.funcao}</td>
        </tr>
      `;
      table.innerHTML += row;
    });

  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
}

// carregar ao abrir página
loadUsers();

// logout
function logout() {
  localStorage.removeItem("auth");
  window.location.href = "login.html";
}