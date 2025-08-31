import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LoginCredentials {
    email: string
    password: string
}

interface LoginFormProps {
    onSubmit: (credentials: LoginCredentials) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit(credentials)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full">
                        Sign In
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export default LoginForm
