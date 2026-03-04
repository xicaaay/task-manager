/*
Archivo principal de la aplicación.
Coordina autenticación, creación de tareas
y renderizado de la interfaz.
*/

import { login } from "./auth.js";
import { getVisibleTasks, createTask, toggleTaskStatus, deleteTask } from "./tasks.js";
import { renderTasks } from "./dom.js";
import { getUsers, getTasks } from "./storage.js";

/*
Si localStorage está vacío se cargan
datos iniciales para pruebas.
*/

const searchInput = document.getElementById("searchInput"); // busqueda de tareas
let currentTasks = []; // guarda tareas en memoría

function initializeData() {

    if (!getUsers().length) {

        localStorage.setItem("users", JSON.stringify([
            { id: 1, username: "admin", password: "1234", role: "admin" },
            { id: 2, username: "juan", password: "1234", role: "user" },
            { id: 3, username: "ana", password: "1234", role: "user" }
        ]));

    }

    if (!getTasks().length) {

        localStorage.setItem("tasks", JSON.stringify([
            {
                id: 1,
                title: "Diseñar interfaz",
                status: "pending",
                createdAt: "2026-03-01",
                dueDate: "2026-03-05",
                userId: 1
            },
            {
                id: 2,
                title: "Crear base de datos",
                status: "completed",
                createdAt: "2026-03-01",
                dueDate: "2026-03-02",
                userId: 2
            },
            {
                id: 3,
                title: "Testear tak-manager",
                status: "completed",
                createdAt: "2026-03-01",
                dueDate: "2026-03-04",
                userId: 2
            },
            {
                id: 4,
                title: "Pulir casos de uso",
                status: "pending",
                createdAt: "2026-03-01",
                dueDate: "2026-03-02",
                userId: 3
            },
            {
                id: 5,
                title: "Agregar visuales atractivos",
                status: "completed",
                createdAt: "2026-03-01",
                dueDate: "2026-03-01",
                userId: 3
            }
        ]));

    }

}


initializeData();


let currentUser = null;


/*
Evento de login
*/

document.getElementById("loginBtn")
    .addEventListener("click", () => {

        const username = document.getElementById("username").value;

        const password = document.getElementById("password").value;

        const user = login(username, password);

        if (!user) {

            alert("Credenciales incorrectas");

            return;

        }

        currentUser = user;

        document.getElementById("login-section").style.display = "none";

        document.getElementById("app-section").style.display = "block";

        document.getElementById("userInfo").innerText =
            `Usuario: ${user.username} | Rol: ${user.role}`;

        loadTasks();

    });


/*
Carga y renderiza tareas
*/

function loadTasks() {

    currentTasks = getVisibleTasks(currentUser);

    renderTasks(currentTasks);

}


/*
Evento para crear nueva tarea
*/

document.getElementById("createTaskBtn")
    .addEventListener("click", () => {

        const title = document.getElementById("taskTitle").value;

        const dueDate = document.getElementById("dueDate").value;


        /*
        Validación de formulario
        */

        if (!title || !dueDate) {

            alert("Debe completar todos los campos");

            return;

        }

        createTask(title, dueDate, currentUser);

        loadTasks();

    });


searchInput.addEventListener("input", () => {

    const text = searchInput.value.toLowerCase();

    const filtered = currentTasks.filter(task =>
        task.title.toLowerCase().includes(text)
    );

    renderTasks(filtered);

});

/*
Evento para editar estado de tarea (pendiente / completada)}
*/
document.addEventListener("toggleTask",(e)=>{

toggleTaskStatus(e.detail);

loadTasks();

});

/*
Evento para eliminar tarea
*/

document.addEventListener("deleteTask",(e)=>{

deleteTask(e.detail);

loadTasks();

});