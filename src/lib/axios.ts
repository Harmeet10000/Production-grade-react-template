import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
    baseURL: '/api', // This will use the Vite proxy
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
            // Clear auth data and redirect to login
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_user')
            // You can dispatch a logout action here if needed
        }

        return Promise.reject(error)
    }
)

export default axiosInstance

// Export types for convenience
export type { AxiosRequestConfig, AxiosResponse }
