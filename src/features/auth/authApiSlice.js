import { loginApi, logoutApi, signupApi } from "../../services/apiUser";
import { apiSlice } from "../../store/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            async queryFn({ name, email, password }) {
                try {
                    const data = await signupApi({ name, email, password })
                    return { data }
                } catch (error) {
                    return {
                        error: {
                            status: '400',
                            data: error.message || 'Failed to register',
                        }
                    }
                }
            },
            invalidatesTags: ['User']
        }),
        login: builder.mutation({
            async queryFn({ email, password }) {
                try {
                    const data = await loginApi({ email, password })
                    return { data }
                } catch (error) {
                    // console.log(error)
                    return {
                        error: {
                            status: '400',
                            data: error.message || 'Failed to login',
                        }
                    }
                }
            }
        }),
        logout: builder.mutation({
            async queryFn() {
                try {
                    const data = await logoutApi()
                    return { data }
                } catch (error) {
                    return {
                        error: {
                            status: '400',
                            data: error.message || 'Failed to logout',
                        }
                    }
                }
            }
        }),
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation } =
    authApiSlice