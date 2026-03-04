/*
Este módulo contiene la lógica de negocio de las tareas.
Filtra tareas por rol y permite crear nuevas tareas.
*/

import { getTasks, saveTasks, getUsers } from "./storage.js";

export function getVisibleTasks(user) {

    const tasks = getTasks();
    const users = getUsers();

    // Obtener el usaurio a quien se le asigno la tarea
    tasks.forEach(task => {

        const user = users.find(u => u.id === task.userId);

        task.username = user ? user.username : "Desconocido";

    });

    /*
    Si el usuario es administrador puede ver todas las tareas.
    */

    if (user.role === "admin") {

        return tasks;

    }

    /*
    Si el usuario es normal solo puede ver las tareas asignadas.
    */

    return tasks.filter(task => task.userId === user.id);

}


export function createTask(title, dueDate, user) {

    const tasks = getTasks();

    /*
    Se genera un id único usando timestamp
    */

    const newTask = {

        id: Date.now(),

        title: title,

        status: "pending",

        createdAt: new Date().toISOString().split("T")[0],

        dueDate: dueDate,

        userId: user.id

    };

    tasks.push(newTask);

    saveTasks(tasks);

    return newTask;

}


/*
Marca una tarea como completada o pendiente
*/

export function toggleTaskStatus(taskId) {

    const tasks = getTasks();

    const task = tasks.find(t => t.id === taskId);

    if (!task) return;

    task.status = task.status === "pending" ? "completed" : "pending";

    saveTasks(tasks);

}


/*
Elimina una tarea
*/

export function deleteTask(taskId) {

    let tasks = getTasks();

    tasks = tasks.filter(t => t.id !== taskId);

    saveTasks(tasks);

}