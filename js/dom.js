/*
Este módulo se encarga de manipular el DOM.
Renderiza las tareas en la interfaz del usuario.
*/

/*
Este módulo se encarga de manipular el DOM.
Renderiza las tareas en la interfaz del usuario.
*/

export function renderTasks(tasks) {

    const container = document.getElementById("tasksContainer");

    container.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    /*
    Se recorren todas las tareas y se generan
    los elementos visuales correspondientes.
    */

    tasks.forEach(task => {

        const div = document.createElement("div");

        div.classList.add("task");

        /*
        Si la tarea está completada se marca visualmente.
        */
       if (task.status === "completed") {
           div.classList.add("completed");
        }
        
        /*
        Si la tarea está pendiente se marca visualmente.
        */
        if (task.status === "pending") {
            div.classList.add("pending");
        }

        /*
        Si la tarea está vencida se marca visualmente.
        */

        if (task.status === "pending" && task.dueDate < today) {
            div.classList.add("overdue");
        }

        div.innerHTML = `
<h3>${task.title}</h3>

<p>Estado: ${task.status}</p>

<p>Vence: ${task.dueDate}</p>

<p>Asignado a: ${task.username || "Usuario"}</p>

<button class="toggleBtn" data-id="${task.id}">
${task.status === "pending" ? "Completar" : "Pendiente"}
</button>

<button class="deleteBtn" data-id="${task.id}">
Eliminar
</button>
`;

        container.appendChild(div);

    });

    document.querySelectorAll(".toggleBtn").forEach(btn => {

        btn.addEventListener("click", (e) => {

            const id = Number(e.target.dataset.id);

            document.dispatchEvent(
                new CustomEvent("toggleTask", { detail: id })
            );

        });

    });

    document.querySelectorAll(".deleteBtn").forEach(btn => {

        btn.addEventListener("click", (e) => {

            const id = Number(e.target.dataset.id);

            document.dispatchEvent(
                new CustomEvent("deleteTask", { detail: id })
            );

        });

    });

}