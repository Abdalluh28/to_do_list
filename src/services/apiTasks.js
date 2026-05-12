import supabase from "./supabase";

/**
 * Fetch all tasks for a given user
 * @param {string} userId
 * @returns {Array} tasks
 */
export async function getTasks(userId) {
    try {
        const { data: tasks, error } = await supabase
            .from("Tasks")
            .select("*")
            .eq("userId", userId);

        if (error) throw error;

        return tasks || [];
    } catch (err) {
        console.error("Error fetching tasks:", err);
        return [];
    }
}

/**
 * Fetch a single task by its uniqueId
 * @param {string} taskUniqueId
 * @returns {Object|null} task
 */
function scopeTaskQueryByUserId(query, userId) {
    if (userId == null) {
        return query.is("userId", null);
    }
    return query.eq("userId", userId);
}

export async function getTask(taskUniqueId, userId) {
    try {
        let q = supabase.from("Tasks").select("*").eq("uniqueId", taskUniqueId);
        q = scopeTaskQueryByUserId(q, userId);
        const { data: task, error } = await q.single();

        if (error) throw error;

        return task || null;
    } catch (err) {
        console.error("Error fetching task:", err);
        return null;
    }
}

/**
 * Delete a task by uniqueId
 * @param {string} taskUniqueId
 * @returns {Object|null} deleted task
 */
export async function deleteTask(taskUniqueId, userId) {
    try {
        let q = supabase.from("Tasks").delete().eq("uniqueId", taskUniqueId);
        q = scopeTaskQueryByUserId(q, userId);
        const { data, error } = await q.select().single();

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("Error deleting task:", err);
        throw new Error("Task could not be deleted");
    }
}

/**
 * Add a new task
 * @param {Object} task
 * @returns {Object|null} created task
 */
export async function addTask(task) {
    try {
        const { data, error } = await supabase
            .from("Tasks")
            .insert(task)
            .select()
            .single(); // return the inserted row

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("Error adding task:", err);
        throw new Error("Task could not be added");
    }
}

/**
 * Edit a task by uniqueId
 * @param {Object} task
 * @returns {Object|null} updated task
 */
export async function editTask(task) {
    console.log(task.uniqueId)
    try {
        let q = supabase
            .from("Tasks")
            .update(task)
            .eq("uniqueId", task.uniqueId);

        const { data, error } = await q.select().maybeSingle();

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("Error editing task:", err);
        throw new Error("Task could not be edited");
    }
}
