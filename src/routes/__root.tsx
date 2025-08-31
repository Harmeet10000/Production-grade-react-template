import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from '@/components'
import MainLayout from '@/layouts/MainLayout/MainLayout'
import { queryClient } from '@/lib/react-query'

export const Route = createRootRoute({
    component: RootComponent
})

function RootComponent() {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    defaultTheme="system"
                    storageKey="vite-ui-theme">
                    <MainLayout>
                        <Outlet />
                    </MainLayout>
                    <ReactQueryDevtools initialIsOpen={false} />
                </ThemeProvider>
                <TanStackRouterDevtools position="bottom-right" />
            </QueryClientProvider>
        </RecoilRoot>
    )
}
