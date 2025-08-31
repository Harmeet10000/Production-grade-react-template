import LoginForm from '../components/LoginForm/LoginForm'
import { useAuth } from '../hooks/useAuth'

interface LoginCredentials {
    email: string
    password: string
}

const LoginPage = () => {
    const { login } = useAuth()

    const handleLogin = (credentials: LoginCredentials) => {
        login(credentials)
    }

    return (
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-muted-foreground mt-2">Sign in to your account</p>
                </div>
                <LoginForm onSubmit={handleLogin} />
            </div>
        </div>
    )
}

export default LoginPage
