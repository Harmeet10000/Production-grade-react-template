import { type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { ModeToggle } from '@/components'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Button } from '@/components/ui/button'

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const { isAuthenticated, user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-between px-4">
                    <nav className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className="font-semibold hover:text-primary">
                            Home
                        </Link>
                        {isAuthenticated && (
                            <Link
                                to="/dashboard"
                                className="hover:text-primary">
                                Dashboard
                            </Link>
                        )}
                    </nav>
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-muted-foreground">Welcome, {user?.name || user?.email}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={logout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Link to="/auth/login">
                                <Button
                                    variant="outline"
                                    size="sm">
                                    Login
                                </Button>
                            </Link>
                        )}
                        <ModeToggle />
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">{children}</main>
            <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center justify-center px-4">
                    <p className="text-sm text-muted-foreground">&copy; 2024 App</p>
                </div>
            </footer>
        </div>
    )
}

export default MainLayout
