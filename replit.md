# ZEPHYR LUX - Premium Boxer Briefs E-Commerce Store

## Overview

ZEPHYR LUX is a direct-to-consumer e-commerce application for premium men's boxer briefs. The application features a modern, minimalist design inspired by premium brands like Nike, Adidas, MeUndies, and Tommy John. It provides a full shopping experience including product browsing, cart management, and checkout with Stripe payment integration.

The application is built as a full-stack TypeScript monorepo with a React frontend and Express backend, using session-based cart management and PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management with automatic caching and refetching

**UI Component System**
- shadcn/ui component library built on Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theming (colors, spacing, shadows) defined in `index.css`
- Inter font family for consistent typography
- Design system follows "New York" style variant with neutral base colors, black/white/red accent palette

**State Management**
- TanStack Query handles all server state (products, cart, orders)
- Local component state with React hooks for UI state
- Session-based cart stored on server, accessed via API queries

**Key Pages & Components**
- Home page: Hero section with lifestyle imagery, featured product grid, benefits section
- Cart page: Shopping cart with quantity management and order summary
- Checkout page: Multi-step form (shipping → payment → confirmation) with Stripe Elements integration
- Reusable components: Header with cart indicator, ProductCard, CartItem, OrderSummary, Footer

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for API routing and middleware
- Session management using `express-session` with configurable storage
- RESTful API design for products, cart, and order operations

**Data Layer**
- PostgreSQL database via Neon serverless driver
- Drizzle ORM for type-safe database queries and schema management
- Schema includes: products, users, cart_items, orders tables
- In-memory storage fallback (`MemStorage`) for development/testing

**API Routes**
- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch single product
- `GET /api/cart` - Get cart items for current session
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove cart item
- `POST /api/create-payment-intent` - Initialize Stripe checkout
- `POST /api/webhook/stripe` - Handle Stripe webhook events
- `POST /api/orders` - Create order after payment

**Session Management**
- Express session middleware with cookie-based session IDs
- Session secret configurable via environment variable
- Cart items tied to session ID, allowing anonymous shopping

### External Dependencies

**Payment Processing**
- Stripe for payment processing and checkout flow
- Client-side: `@stripe/stripe-js` and `@stripe/react-stripe-js` for embedded payment forms
- Server-side: `stripe` SDK for creating payment intents and handling webhooks
- Environment variables required: `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLIC_KEY`

**Database**
- PostgreSQL database (configured for Neon serverless)
- Connection via `@neondatabase/serverless` driver
- Environment variable required: `DATABASE_URL`
- Drizzle Kit for migrations with `db:push` script

**UI Libraries**
- Radix UI primitives for 20+ accessible component patterns (dialogs, dropdowns, tooltips, etc.)
- Lucide React for consistent iconography
- `class-variance-authority` for variant-based component styling
- `tailwind-merge` and `clsx` for conditional className merging

**Development Tools**
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TypeScript with strict mode enabled
- Path aliases configured: `@/` for client source, `@shared/` for shared types, `@assets/` for static files

**Validation & Forms**
- Zod for runtime schema validation
- `drizzle-zod` for generating Zod schemas from Drizzle tables
- React Hook Form with Zod resolver for form validation

**Build & Deployment**
- Production build creates static frontend in `dist/public`
- Backend bundled with esbuild to `dist/index.js`
- Environment-aware configuration (development vs production)
- Session cookies set to secure in production