import { useRecoilValue } from 'recoil'
import { useCallback } from 'react'
import { authStateSelector, isAuthenticatedSelector } from '../../../store/atoms/authAtoms'
import { useLoginMutation, useLogoutMutation, useCurrentUserQuery } from '../api/authApi'

interface LoginCredentials {
    email: string
    password: string
}

export const useAuth = () => {
    const authState = useRecoilValue(authStateSelector)
    const isAuthenticated = useRecoilValue(isAuthenticatedSelector)

    const loginMutation = useLoginMutation()
    const logoutMutation = useLogoutMutation()
    const { refetch: refetchUser } = useCurrentUserQuery()

    const login = useCallback(
        async (credentials: LoginCredentials) => {
            return loginMutation.mutateAsync(credentials)
        },
        [loginMutation]
    )

    const logout = useCallback(async () => {
        return logoutMutation.mutateAsync()
    }, [logoutMutation])

    const clearError = useCallback(() => {
        // Error clearing is handled by the mutations
    }, [])

    return {
        user: authState.user,
        isLoading: authState.isLoading || loginMutation.isPending || logoutMutation.isPending,
        error: authState.error || loginMutation.error?.message || logoutMutation.error?.message || null,
        isAuthenticated,
        login,
        logout,
        clearError,
        refetchUser
    }
}

// Alternative hook using selector for read-only access
export const useAuthState = () => {
    return useRecoilValue(authStateSelector)
}

// Hook for actions only (useful for components that only need to trigger actions)
export const useAuthActions = () => {
    const loginMutation = useLoginMutation()
    const logoutMutation = useLogoutMutation()

    const login = useCallback(
        async (credentials: LoginCredentials) => {
            return loginMutation.mutateAsync(credentials)
        },
        [loginMutation]
    )

    const logout = useCallback(async () => {
        return logoutMutation.mutateAsync()
    }, [logoutMutation])

    return {
        login,
        logout,
        isLoading: loginMutation.isPending || logoutMutation.isPending
    }
}
