if (localStorage.getItem("auth") !== "true") {
    window.location.href = "login.html";
}

fetch("http://localhost:3000/users")

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