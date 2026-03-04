/*
Este módulo gestiona la autenticación del sistema.
Valida usuario y contraseña contra los datos almacenados
en localStorage.
*/

import { getUsers } from "./storage.js";

export function login(username, password) {

    const users = getUsers();

    const user = users.find(
        u => u.username === username && u.password === password
    );

    return user || null;

}