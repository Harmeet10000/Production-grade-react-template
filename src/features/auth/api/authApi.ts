import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRecoilState, useSetRecoilState } from 'recoil'
import axiosInstance from '@/lib/axios'
import { queryKeys } from '@/lib/react-query'
import { userAtom, authLoadingAtom, authErrorAtom, type User } from '@/store/atoms/authAtoms'

// Types
interface LoginCredentials {
    email: string
    password: string
}

interface LoginResponse {
    user: User
    token: string
}

// API functions
const authApi = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await axiosInstance.post('/auth/login', credentials)
        return response.data
    },

    logout: async (): Promise<void> => {
        await axiosInstance.post('/auth/logout')
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await axiosInstance.get('/auth/me')
        return response.data
    },

    refreshToken: async (): Promise<{ token: string }> => {
        const response = await axiosInstance.post('/auth/refresh')
        return response.data
    }
}

// React Query hooks
export const useLoginMutation = () => {
    const setUser = useSetRecoilState(userAtom)
    const setError = useSetRecoilState(authErrorAtom)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            // Store token
            localStorage.setItem('auth_token', data.token)
            // Update user state
            setUser(data.user)
            setError(null)
            // Invalidate and refetch user queries
            queryClient.invalidateQueries({ queryKey: queryKeys.user() })
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error.message || 'Login failed'
            setError(errorMessage)
        }
    })
}

export const useLogoutMutation = () => {
    const setUser = useSetRecoilState(userAtom)
    const setError = useSetRecoilState(authErrorAtom)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            // Clear token
            localStorage.removeItem('auth_token')
            // Clear user state
            setUser(null)
            setError(null)
            // Clear all queries
            queryClient.clear()
        },
        onError: (error: any) => {
            // Even if logout fails on server, clear local state
            localStorage.removeItem('auth_token')
            setUser(null)
            queryClient.clear()
        }
    })
}

export const useCurrentUserQuery = () => {
    const [user, setUser] = useRecoilState(userAtom)
    const setError = useSetRecoilState(authErrorAtom)

    return useQuery({
        queryKey: queryKeys.user(),
        queryFn: authApi.getCurrentUser,
        enabled: !!localStorage.getItem('auth_token') && !user,
        onSuccess: (data) => {
            setUser(data)
            setError(null)
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error.message || 'Failed to fetch user'
            setError(errorMessage)
            // If unauthorized, clear auth state
            if (error?.response?.status === 401) {
                localStorage.removeItem('auth_token')
                setUser(null)
            }
        }
    })
}

