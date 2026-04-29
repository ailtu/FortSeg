if (localStorage.getItem("auth") !== "true") {
    window.location.href = "login.html";
}

const users = [
    { id: 1, nome: "João Silva", email: "joao@email.com", status: "Ativo" },
    { id: 2, nome: "Maria Souza", email: "maria@email.com", status: "Inativo" },
    { id: 3, nome: "Carlos Lima", email: "carlos@email.com", status: "Ativo" }
];

const table = document.getElementById("userTable");

// renderizar tabela
users.forEach(user => {
    const row = `
    <tr>
      <td>${user.id}</td>
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>${user.status}</td>
    </tr>
  `;
    table.innerHTML += row;
});

function logout() {
    localStorage.removeItem("auth");
    window.location.href = "login.html";
}