-- SEED DATA
-- Datos iniciales para pruebas

---------------------------------------

-- INSERT USERS

INSERT INTO users (username, password, role)
VALUES
('admin', 'admin123', 'admin'),
('juan', '1234', 'user'),
('ana', '1234', 'user');

---------------------------------------

-- INSERT TASKS

INSERT INTO tasks (title, status, created_at, due_date, user_id)
VALUES
('Diseñar interfaz', 'pending', '2026-03-01', '2026-03-05', 1),

('Crear estructura base de datos', 'completed', '2026-03-02', '2026-03-06', 1),

('Desarrollar módulo de login', 'pending', '2026-03-01', '2026-03-04', 2),

('Implementar renderizado de tareas', 'pending', '2026-03-02', '2026-03-07', 3),

('Agregar validaciones en formularios', 'pending', '2026-03-03', '2026-03-08', 2),

('Tarea atrasada de prueba', 'pending', '2026-02-20', '2026-02-25', 1);