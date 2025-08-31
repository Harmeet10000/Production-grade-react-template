import { createFileRoute } from '@tanstack/react-router'
import { DarkModeDemo } from '@/components/dark-mode-demo'

export const Route = createFileRoute('/')({
    component: HomeComponent
})

function HomeComponent() {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight">Welcome to Your App</h1>
                <p className="text-muted-foreground mt-2">A production-ready React template with TanStack Router, React Query, and Recoil</p>
            </div>
            <DarkModeDemo />
        </div>
    )
}
