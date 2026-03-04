/*
Este módulo simula una base de datos usando localStorage.
Permite guardar y recuperar usuarios y tareas.
*/

export function getUsers() {

    return JSON.parse(localStorage.getItem("users")) || [];

}

export function saveUsers(users) {

    localStorage.setItem("users", JSON.stringify(users));

}

export function getTasks() {

    return JSON.parse(localStorage.getItem("tasks")) || [];

}

export function saveTasks(tasks) {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}