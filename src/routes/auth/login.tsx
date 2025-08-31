import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage } from '@/features/auth'

export const Route = createFileRoute('/auth/login')({
    component: LoginPage,
    beforeLoad: ({ context }) => {
        // You can add auth checks here
        // if (context.auth.isAuthenticated) {
        //   throw redirect({ to: '/' })
        // }
    }
})
