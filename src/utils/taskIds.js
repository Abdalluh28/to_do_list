/** Client-owned stable id for Supabase sync (never regenerate on login). */
export function newClientUniqueId() {
    return crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

/**
 * Returns a stable uniqueId for an existing task row.
 * Prefer stored uniqueId; else derive from numeric/string id (local guest tasks); else mint once.
 */
export function ensureTaskUniqueId(task) {
    if (task?.uniqueId != null && String(task.uniqueId).trim() !== "") {
        return String(task.uniqueId);
    }
    if (task?.id != null && task.id !== "") {
        return `legacy-${task.id}`;
    }
    return newClientUniqueId();
}

/**
 * localStorage tasks are shared across browser sessions. Only merge guest tasks (no userId)
 * and tasks that already belong to the logged-in user — never another account's rows.
 */
export function filterLocalTasksForUser(localTasks, userId) {
    if (!Array.isArray(localTasks)) return [];
    return localTasks.filter(
        (t) => t && (t.userId == null || t.userId === userId)
    );
}
