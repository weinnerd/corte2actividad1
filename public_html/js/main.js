function initRegistrationForm() {
    const registerForm = document.querySelector(".form-container form");
    if (!registerForm) return;

    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        console.log("El formulario se está enviando");

        // Obteniendo los valores del formulario
      // Dentro de la función de envío de formulario en initRegistrationForm
const userData = {
    fullname: document.getElementById("fullname").value,
    age: document.getElementById("age").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    profession: document.getElementById("profession").value,
    semester: document.getElementById("semester").value,
    password: document.getElementById("password").value // Guardar la contraseña
};


        // Guardando los datos en localStorage
        const userId = new Date().getTime(); // ID único basado en la hora actual
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

        // Redireccionar a la página donde se muestran los usuarios
        // Dentro de la función de envío de formulario en initRegistrationForm
window.location.href = "login.html";

    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Detectar la página actual y ejecutar la función correspondiente
    const pathname = window.location.pathname;
    if (pathname.match(/register\.html$/)) {
        initRegistrationForm();
    } else if (pathname.match(/users\.html$/)) {
        displayRegisteredUsers();
    }
});

function displayRegisteredUsers() {
    const usersTableBody = document.querySelector("#usersTable tbody");
    if (!usersTableBody) return;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.startsWith('user_')) continue; // Esto asegura procesar solo los items relevantes
        const userData = JSON.parse(localStorage.getItem(key));

        // Asegurándose de incluir el campo semestre
        const newRow = `<tr>
                            <td>${userData.fullname}</td>
                            <td>${userData.age}</td>
                            <td>${userData.phone}</td>
                            <td>${userData.email}</td>
                            <td>${userData.profession}</td>
                            <td>${userData.semester}</td> <!-- Datos del semestre añadidos -->
                        </tr>`;

        usersTableBody.innerHTML += newRow;
    }
}
function initLoginForm() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const userEmail = document.getElementById("email").value;
        const userPassword = document.getElementById("password").value;
        const user = findUserByEmailAndPassword(userEmail, userPassword);

        const loginMessage = document.getElementById("loginMessage");
        if (user) {
            loginMessage.textContent = "Login successful! Welcome, " + user.fullname;
            // Redirigir a otra página u otra acción
        } else {
            loginMessage.textContent = "Invalid email or password.";
        }
    });
}

function findUserByEmailAndPassword(email, password) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.startsWith('user_')) continue;
        const userData = JSON.parse(localStorage.getItem(key));
        if (userData.email === email && userData.password === password) {
            return userData;
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", function() {
    const pathname = window.location.pathname;
    if (pathname.match(/register\.html$/)) {
        initRegistrationForm();
    } else if (pathname.match(/users\.html$/)) {
        displayRegisteredUsers();
    } else if (pathname.match(/login\.html$/)) {
        initLoginForm();
    }
});
