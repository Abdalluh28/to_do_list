import supabase from "./supabase";

export async function getTasks(userId) {
    let { data: Tasks, error } = await supabase
        .from('Tasks')
        .select('*')
        .eq('userId', userId)

    if (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }

    return Tasks;
}


export async function getTask(taskUniqueId) {
    let { data: Task, error } = await supabase
        .from('Tasks')
        .select('*')
        .eq('uniqueId', taskUniqueId)

    if (error) {
        console.error("Error fetching task:", error);
        return [];
    }

    return Task;
}

export async function deleteTask(taskUniqueId) {
    const { data, error } = await supabase
        .from('Tasks')
        .delete()
        .eq('uniqueId', taskUniqueId);

    if (error) {
        console.error(error);
        throw new Error("Task could not be deleted");
    }

    return data;
}

export async function addTask(task) {
    console.log(task)
    const { data, error } = await supabase
        .from('Tasks')
        .insert(task);

    if (error) {
        console.error(error);
        throw new Error("Task could not be added");
    }

    return data;
}

export async function editTask(task) {
    const { data, error } = await supabase
        .from('Tasks')
        .update({
            status: task.status,
        })
        .eq('uniqueId', task.uniqueId);

    if (error) {
        console.error(error);
        throw new Error("Task could not be edited");
    }

    return data;
}
