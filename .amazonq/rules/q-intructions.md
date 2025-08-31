# Q-Instructions for Scalable React Application

## Project Overview

This is a production-ready React application built with modern tools and best practices for scalability, maintainability, and developer experience.

## Tech Stack

### Core Technologies
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **TanStack Router** - Type-safe routing solution
- **TanStack Query** - Server state management
- **Recoil** - Client state management
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Pre-built component library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Stylelint** - CSS linting
- **Husky** - Git hooks
- **Commitlint** - Conventional commits
- **Vitest** - Testing framework
- **Sentry** - Error monitoring

## Architecture Principles

### 1. Feature-Based Architecture
```xml
<architecture-pattern>
src/
├── features/           # Feature modules (domain-driven)
│   ├── auth/          # Authentication feature
│   │   ├── api/       # API calls and React Query hooks
│   │   ├── components/ # Feature-specific components
│   │   ├── hooks/     # Feature-specific hooks
│   │   ├── pages/     # Feature pages
│   │   ├── services/  # Business logic
│   │   └── index.ts   # Feature exports
│   └── posts/         # Posts feature
├── shared/            # Shared components and utilities
├── components/        # Global UI components
├── lib/              # Third-party library configurations
├── hooks/            # Global custom hooks
├── store/            # Global state management
├── utils/            # Utility functions
└── routes/           # Route definitions
</architecture-pattern>
```

### 2. Separation of Concerns
- **API Layer**: Centralized API calls with React Query
- **State Management**: Recoil for client state, React Query for server state
- **Component Layer**: Presentational and container components
- **Business Logic**: Services and custom hooks
- **Routing**: File-based routing with TanStack Router

## Development Guidelines

### Code Organization

#### Feature Structure
```xml
<feature-structure>
features/[feature-name]/
├── api/              # API calls and React Query hooks
│   ├── [feature]Api.ts
│   └── types.ts
├── components/       # Feature-specific components
│   ├── [Component]/
│   │   ├── [Component].tsx
│   │   ├── [Component].test.tsx
│   │   └── index.ts
├── hooks/           # Feature-specific hooks
├── pages/           # Feature pages
├── services/        # Business logic
├── types.ts         # Feature types
└── index.ts         # Feature exports
</feature-structure>
```

#### Component Structure
```xml
<component-structure>
components/[ComponentName]/
├── [ComponentName].tsx      # Main component
├── [ComponentName].test.tsx # Unit tests
├── [ComponentName].stories.tsx # Storybook stories (optional)
├── types.ts                 # Component-specific types
└── index.ts                # Component exports
</component-structure>
```

### Naming Conventions

#### Files and Directories
```xml
<naming-conventions>
- Components: PascalCase (UserProfile.tsx)
- Hooks: camelCase starting with 'use' (useAuth.ts)
- Utilities: camelCase (formatDate.ts)
- Constants: UPPER_SNAKE_CASE (API_ENDPOINTS.ts)
- Types/Interfaces: PascalCase (User.ts, ApiResponse.ts)
- Directories: kebab-case (user-profile/, api-client/)
- Feature directories: kebab-case (user-management/, order-processing/)
</naming-conventions>
```

#### Code Conventions
```xml
<code-conventions>
- Variables: camelCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase
- Enums: PascalCase
- React Components: PascalCase
- Custom Hooks: camelCase starting with 'use'
</code-conventions>
```

### TypeScript Best Practices

#### Type Definitions
```xml
<typescript-practices>
1. Define interfaces for all API responses
2. Use strict TypeScript configuration
3. Avoid 'any' type - use 'unknown' or proper types
4. Use generic types for reusable components
5. Define prop types for all components
6. Use type guards for runtime type checking
7. Leverage utility types (Pick, Omit, Partial, etc.)
</typescript-practices>
```

#### Example Type Structure
```typescript
// types/api.ts
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// types/user.ts
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}
```

### Component Development

#### Component Guidelines
```xml
<component-guidelines>
1. Use functional components with hooks
2. Implement proper prop validation with TypeScript
3. Use React.memo for performance optimization when needed
4. Keep components small and focused (single responsibility)
5. Use composition over inheritance
6. Implement proper error boundaries
7. Use Suspense for lazy loading
8. Follow accessibility guidelines (ARIA attributes)
</component-guidelines>
```

#### Component Template
```typescript
import React from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  className?: string
  children?: React.ReactNode
  // Add other props
}

export const Component: React.FC<ComponentProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn('default-classes', className)} {...props}>
      {children}
    </div>
  )
}

Component.displayName = 'Component'
```

### State Management

#### Recoil for Client State
```xml
<recoil-guidelines>
1. Use atoms for simple state
2. Use selectors for derived state
3. Implement atom effects for persistence
4. Use atom families for dynamic state
5. Keep atoms focused and granular
6. Use proper naming conventions (userAtom, authStateAtom)
</recoil-guidelines>
```

#### React Query for Server State
```xml
<react-query-guidelines>
1. Use consistent query key patterns
2. Implement proper error handling
3. Use mutations for data modifications
4. Implement optimistic updates where appropriate
5. Use proper cache invalidation strategies
6. Implement retry logic for failed requests
</react-query-guidelines>
```

### API Integration

#### API Layer Structure
```xml
<api-structure>
1. Centralize API calls in feature/api directories
2. Use React Query hooks for data fetching
3. Implement proper error handling
4. Use TypeScript for request/response types
5. Implement request/response interceptors
6. Use proper loading and error states
</api-structure>
```

#### API Hook Template
```typescript
// features/users/api/usersApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/axios'
import { queryKeys } from '@/lib/react-query'

export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users.list(),
    queryFn: () => apiClient.get('/users').then(res => res.data)
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userData: CreateUserRequest) => 
      apiClient.post('/users', userData).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() })
    }
  })
}
```

### Routing

#### TanStack Router Guidelines
```xml
<routing-guidelines>
1. Use file-based routing structure
2. Implement proper route guards
3. Use type-safe navigation
4. Implement proper loading states
5. Use route-level code splitting
6. Implement proper error boundaries
7. Use search params for filters and pagination
</routing-guidelines>
```

### Testing Strategy

#### Testing Approach
```xml
<testing-strategy>
1. Unit Tests: Individual components and functions
2. Integration Tests: Feature workflows
3. E2E Tests: Critical user journeys
4. Visual Regression Tests: UI consistency
5. Performance Tests: Core Web Vitals
6. Accessibility Tests: WCAG compliance
</testing-strategy>
```

#### Testing Guidelines
```xml
<testing-guidelines>
1. Test behavior, not implementation
2. Use React Testing Library for component tests
3. Mock external dependencies
4. Test error states and edge cases
5. Maintain high test coverage (>80%)
6. Use descriptive test names
7. Group related tests with describe blocks
</testing-guidelines>
```

### Performance Optimization

#### Performance Best Practices
```xml
<performance-practices>
1. Code Splitting: Route-level and component-level
2. Lazy Loading: Images, components, and routes
3. Memoization: React.memo, useMemo, useCallback
4. Bundle Analysis: Regular bundle size monitoring
5. Image Optimization: WebP format, responsive images
6. Caching: Proper HTTP caching headers
7. Tree Shaking: Remove unused code
8. Preloading: Critical resources and routes
</performance-practices>
```

### Security Guidelines

#### Security Best Practices
```xml
<security-practices>
1. Input Validation: Client and server-side validation
2. XSS Prevention: Proper data sanitization
3. CSRF Protection: Token-based protection
4. Authentication: Secure token storage and handling
5. Authorization: Role-based access control
6. HTTPS: Enforce secure connections
7. Content Security Policy: Implement CSP headers
8. Dependency Security: Regular security audits
</security-practices>
```

### Accessibility Guidelines

#### A11y Best Practices
```xml
<accessibility-practices>
1. Semantic HTML: Use proper HTML elements
2. ARIA Labels: Implement proper ARIA attributes
3. Keyboard Navigation: Full keyboard accessibility
4. Screen Reader Support: Proper screen reader experience
5. Color Contrast: Meet WCAG contrast requirements
6. Focus Management: Proper focus indicators and management
7. Alternative Text: Images and media descriptions
8. Form Accessibility: Proper form labels and validation
</accessibility-practices>
```

### Environment Configuration

#### Environment Setup
```xml
<environment-config>
Development:
- Hot reloading enabled
- Source maps enabled
- Debug tools available
- Relaxed CSP policies

Production:
- Minification enabled
- Source maps for monitoring only
- Error tracking enabled
- Strict CSP policies
- Performance monitoring
</environment-config>
```

### Build and Deployment

#### Build Process
```xml
<build-process>
1. Type checking with TypeScript
2. Linting with ESLint
3. Code formatting with Prettier
4. CSS linting with Stylelint
5. Unit tests execution
6. Bundle optimization
7. Asset optimization
8. Source map generation
</build-process>
```

### Code Quality

#### Quality Gates
```xml
<quality-gates>
1. TypeScript compilation without errors
2. ESLint rules passing
3. Prettier formatting applied
4. Unit tests passing (>80% coverage)
5. Bundle size within limits
6. Performance budgets met
7. Accessibility tests passing
8. Security vulnerabilities resolved
</quality-gates>
```

### Documentation Standards

#### Documentation Requirements
```xml
<documentation-standards>
1. README files for each feature
2. Component documentation with examples
3. API documentation with types
4. Architecture decision records (ADRs)
5. Deployment and setup guides
6. Troubleshooting guides
7. Code comments for complex logic
8. Changelog maintenance
</documentation-standards>
```

### Git Workflow

#### Commit Standards
```xml
<git-workflow>
1. Conventional Commits format
2. Feature branch workflow
3. Pull request reviews required
4. Automated testing on PRs
5. Squash and merge strategy
6. Protected main branch
7. Semantic versioning
8. Release notes generation
</git-workflow>
```

### Monitoring and Observability

#### Monitoring Setup
```xml
<monitoring-setup>
1. Error Tracking: Sentry integration
2. Performance Monitoring: Core Web Vitals
3. User Analytics: User behavior tracking
4. Bundle Analysis: Bundle size monitoring
5. Dependency Monitoring: Security vulnerabilities
6. Uptime Monitoring: Application availability
7. Log Aggregation: Centralized logging
8. Alerting: Critical issue notifications
</monitoring-setup>
```

## Quick Reference

### Common Commands
```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run test            # Run tests
npm run test:coverage   # Run tests with coverage

# Code Quality
npm run lint:eslint     # Run ESLint
npm run format:check    # Check Prettier formatting
npm run format:fix      # Fix Prettier formatting
npm run lint:stylelint  # Run Stylelint
```

### File Structure Quick Reference
```
src/
├── features/           # Feature modules
├── components/         # Global components
├── lib/               # Library configurations
├── hooks/             # Global hooks
├── store/             # State management
├── utils/             # Utilities
├── routes/            # Route definitions
└── types/             # Global types
```

This document serves as the foundation for maintaining code quality, consistency, and scalability across the React application. All team members should follow these guidelines to ensure a maintainable and robust codebase.