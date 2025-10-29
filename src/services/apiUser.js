import supabase from "./supabase";

export async function signupApi({ name, email, password }) {

    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            }
        }
    })

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    if (data.user) {
        const { error: insertError } = await supabase
            .from('Users')
            .insert([{ id: data.user.id, email, name }]);
        if (insertError) throw new Error(insertError.message);
    }

    return data;
}


export async function loginApi({ email, password }) {
    console.log(email, password)
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })


    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

    return data;
}


export async function logoutApi() {

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
        throw new Error(error.message);
    }

}


export async function getUserApi() {

    const { data: session } = await supabase.auth.getSession();

    if (!session?.session) return null;

    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) return null;

    const { data } = await supabase
        .from('Users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

    return data;
}

export async function updateCurrentUser({ name, email, password }) {
    const updateData = {};

    if (name) updateData.data = { name };
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) throw new Error(error.message);

    // Update custom users table if name is provided
    if (name) {
        const { error: updateError } = await supabase
            .from('Users')
            .update({ name })
            .eq('id', data.user.id);

        if (updateError) throw new Error(updateError.message);
    }

    return data;
}
