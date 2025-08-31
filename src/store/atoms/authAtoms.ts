import { atom, selector } from 'recoil'
import { localStorageEffect } from '../effects/localStorageEffect'

// Types
export interface User {
    id: string
    email: string
    name: string
}

export interface AuthState {
    user: User | null
    isLoading: boolean
    error: string | null
}

// Atoms
export const userAtom = atom<User | null>({
    key: 'userAtom',
    default: null,
    effects: [localStorageEffect<User | null>('auth_user')]
})

export const authLoadingAtom = atom<boolean>({
    key: 'authLoadingAtom',
    default: false
})

export const authErrorAtom = atom<string | null>({
    key: 'authErrorAtom',
    default: null
})

// Selectors
export const authStateSelector = selector<AuthState>({
    key: 'authStateSelector',
    get: ({ get }) => ({
        user: get(userAtom),
        isLoading: get(authLoadingAtom),
        error: get(authErrorAtom)
    })
})

export const isAuthenticatedSelector = selector<boolean>({
    key: 'isAuthenticatedSelector',
    get: ({ get }) => {
        const user = get(userAtom)
        return !!user
    }
})
