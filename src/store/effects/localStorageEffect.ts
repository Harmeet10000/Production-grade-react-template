import { type AtomEffect } from 'recoil'

export const localStorageEffect =
    <T>(key: string): AtomEffect<T> =>
    ({ setSelf, onSet }) => {
        // Initialize from localStorage
        const savedValue = localStorage.getItem(key)
        if (savedValue != null) {
            try {
                setSelf(JSON.parse(savedValue))
            } catch (error) {
                console.warn(`Failed to parse localStorage value for key "${key}":`, error)
            }
        }

        // Subscribe to state changes and update localStorage
        onSet((newValue, _, isReset) => {
            if (isReset) {
                localStorage.removeItem(key)
            } else {
                localStorage.setItem(key, JSON.stringify(newValue))
            }
        })
    }
