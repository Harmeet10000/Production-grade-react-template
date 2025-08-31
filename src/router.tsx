import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Create the router instance
export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    // Add global context here if needed
    context: {
        // auth: undefined!, // This will be set in your app
    }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
