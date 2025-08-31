export const API_ENDPOINTS = {
  AUTH: '/auth',
  USERS: '/users',
  POSTS: '/posts',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
} as const;

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
} as const;