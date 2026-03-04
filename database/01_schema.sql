-- DATABASE SCHEMA
-- Sistema de Gestión de Tareas
-- Motor: PostgreSQL

---------------------------------------

-- TABLE: users
-- Almacena los usuarios del sistema

CREATE TABLE users (
    
    -- ID único del usuario
    id SERIAL PRIMARY KEY,

    -- Nombre de usuario (no puede repetirse)
    username VARCHAR(50) NOT NULL UNIQUE,

    -- Contraseña del usuario
    password VARCHAR(255) NOT NULL,

    -- Rol del usuario
    -- Solo se permiten dos valores
    role VARCHAR(20) NOT NULL CHECK (
        role IN ('admin', 'user')
    )
);

---------------------------------------

-- TABLE: tasks
-- Almacena las tareas asignadas a los usuarios

CREATE TABLE tasks (

    -- ID único de la tarea
    id SERIAL PRIMARY KEY,

    -- Título de la tarea
    title VARCHAR(255) NOT NULL,

    -- Estado de la tarea
    -- Puede ser pendiente o completada
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (
        status IN ('pending', 'completed')
    ),

    -- Fecha de creación de la tarea
    created_at DATE NOT NULL,

    -- Fecha límite de la tarea
    due_date DATE NOT NULL,

    -- Usuario asignado a la tarea
    user_id INT NOT NULL,

    -- RELACIÓN CON USERS
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    -- VALIDACIÓN DE FECHAS
    -- Evita que la fecha de vencimiento sea menor
    -- que la fecha de creación
	
    CONSTRAINT valid_due_date
        CHECK (due_date >= created_at)

);


---------------------------------------

-- ÍNDICES PARA MEJORAR CONSULTAS

CREATE INDEX idx_tasks_user
ON tasks(user_id);

CREATE INDEX idx_tasks_due_date
ON tasks(due_date);