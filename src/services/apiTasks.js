import supabase from "./supabase";

/**
 * Fetch all tasks for a given user
 * @param {string} userId
 * @returns {Array} tasks
 */
export async function getTasks(userId) {
    try {
        const { data: tasks, error } = await supabase
            .from('Tasks')
            .select('*')
            .eq('userId', userId);

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
export async function getTask(taskUniqueId) {
    try {
        const { data: task, error } = await supabase
            .from('Tasks')
            .select('*')
            .eq('uniqueId', taskUniqueId)
            .single();

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
export async function deleteTask(taskUniqueId) {
    try {
        const { data, error } = await supabase
            .from('Tasks')
            .delete()
            .eq('uniqueId', taskUniqueId)
            .select()
            .single();

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
            .from('Tasks')
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
    try {
        const { data, error } = await supabase
            .from('Tasks')
            .update(task)
            .eq('uniqueId', task.uniqueId)
            .select()
            .single(); // return the updated row

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("Error editing task:", err);
        throw new Error("Task could not be edited");
    }
}
