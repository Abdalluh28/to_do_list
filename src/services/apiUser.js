import supabase from "./supabase";

/**
 * Signup a new user
 * @param {Object} param0 
 * @returns {Object} user data
 */
export async function signupApi({ name, email, password }) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });

        if (error) throw error;

        // Insert into custom Users table
        if (data.user) {
            const { error: insertError } = await supabase
                .from('Users')
                .insert([{ id: data.user.id, email, name }]);

            if (insertError) throw insertError;
        }

        return data;
    } catch (err) {
        console.error("Signup error:", err);
        throw new Error(err.message || "Signup failed");
    }
}

/**
 * Login user with email/password
 * @param {Object} param0 
 * @returns {Object} session data
 */
export async function loginApi({ email, password }) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        return data;
    } catch (err) {
        console.error("Login error:", err);
        throw new Error(err.message || "Login failed");
    }
}

/**
 * Logout current user
 */
export async function logoutApi() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (err) {
        console.error("Logout error:", err);
        throw new Error(err.message || "Logout failed");
    }
}

/**
 * Get current logged-in user from custom Users table
 * @returns {Object|null} user data
 */
export async function getUserApi() {
    try {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user?.id;
        if (!userId) return null;

        const { data: user, error } = await supabase
            .from('Users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;

        return user || null;
    } catch (err) {
        console.error("Get user error:", err);
        return null;
    }
}

/**
 * Update current user (auth + custom Users table)
 * @param {Object} param0 
 * @returns {Object} updated auth data
 */
export async function updateCurrentUser({ name, email, password }) {
    try {
        const updateData = {};
        if (name) updateData.data = { name };
        if (email) updateData.email = email;
        if (password) updateData.password = password;

        const { data, error } = await supabase.auth.updateUser(updateData);
        if (error) throw error;

        // Sync custom Users table if name is provided
        if (name && data.user?.id) {
            const { error: updateError } = await supabase
                .from('Users')
                .update({ name })
                .eq('id', data.user.id);

            if (updateError) throw updateError;
        }

        return data;
    } catch (err) {
        console.error("Update user error:", err);
        throw new Error(err.message || "Update failed");
    }
}
