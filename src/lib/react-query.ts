import { QueryClient, type DefaultOptions } from '@tanstack/react-query'

const queryConfig: DefaultOptions = {
    queries: {
        // Global query options
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
        retry: (failureCount, error: any) => {
            // Don't retry on 4xx errors except 408, 429
            if (error?.response?.status >= 400 && error?.response?.status < 500) {
                if (error?.response?.status === 408 || error?.response?.status === 429) {
                    return failureCount < 2
                }
                return false
            }
            // Retry up to 3 times for other errors
            return failureCount < 3
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true
    },
    mutations: {
        // Global mutation options
        retry: false
    }
}

export const queryClient = new QueryClient({
    defaultOptions: queryConfig
})

// Query keys factory for better organization
export const queryKeys = {
    all: ['queries'] as const,
    auth: () => [...queryKeys.all, 'auth'] as const,
    user: () => [...queryKeys.auth(), 'user'] as const,
    posts: () => [...queryKeys.all, 'posts'] as const,
    post: (id: string) => [...queryKeys.posts(), id] as const
    // Add more query keys as needed
} as const
