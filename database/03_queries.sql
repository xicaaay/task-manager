-- 1. LISTADO DE TAREAS ORDENADAS POR FECHA DE VENCIMIENTO

SELECT
    t.id,
    t.title,
    t.status,
    t.created_at,
    t.due_date,
    u.username
FROM tasks t
JOIN users u
    ON t.user_id = u.id
ORDER BY t.due_date ASC;

---------------------------------------

-- 2. CONTEO DE TAREAS PENDIENTES Y COMPLETADAS POR USUARIO

SELECT
    u.username,

    COUNT(CASE WHEN t.status = 'pending' THEN 1 END) AS pending_tasks,

    COUNT(CASE WHEN t.status = 'completed' THEN 1 END) AS completed_tasks

FROM users u

LEFT JOIN tasks t
ON u.id = t.user_id

GROUP BY u.username

ORDER BY u.username;


---------------------------------------

-- 3. CONSULTA DE TAREAS ATRASADAS
-- Estado pendiente y fecha vencida

SELECT
    t.id,
    t.title,
    t.due_date,
    u.username
FROM tasks t
JOIN users u
    ON t.user_id = u.id

WHERE
    t.status = 'pending'
    AND t.due_date < CURRENT_DATE

ORDER BY t.due_date;