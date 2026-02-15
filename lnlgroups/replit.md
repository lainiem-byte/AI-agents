# LNL Group - Professional Services Platform

## Overview

LNL Group is a multi-pillar professional services platform serving three distinct business divisions:

1. **LNL Group** - The strategic umbrella brand focused on enterprise innovation and ecosystem integration
2. **LNL Creatives** - Hyper-local content marketing and brand growth strategies for specific geographic markets (Raleigh-Durham, Columbus, Moscow)
3. **LNL Automations** - AI workflow automation and process orchestration using tools like n8n, Replicate, and Make

The platform delivers "Local Authority Content" with geo-targeted marketing strategies, combined with AI-powered automation services. The core value proposition is "The Map vs. The Guide" - ranging from digital localization services to full brand growth management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite
- **Styling**: Tailwind CSS v4 with custom theme tokens (LNL brand colors: gold, violet, cyan, pearl, dark)
- **UI Components**: Shadcn/UI (New York style) with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and interactive elements
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state, React Context for location state
- **Theming**: next-themes for dark/light mode support

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Build System**: Custom build script using esbuild for server bundling, Vite for client
- **Development**: Hot module replacement via Vite dev server with Express middleware

### Data Layer
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` defines all database tables
- **Tables**: 
  - `leads` - Contact form submissions with business details
  - `sessions` - Authentication session storage
  - `users` - User accounts for Replit Auth integration
- **Migrations**: Managed via `drizzle-kit push`

### Multi-Market Localization System
- Dynamic content loading from `client/src/data/locations.json`
- Location-specific outreach scripts in separate JSON files (moscow, columbus, raleigh)
- SEO schema markup generated per location
- Context-based location switching via `LocationContext`

### Authentication
- Replit Auth integration for team member access
- Session-based authentication with PostgreSQL session store
- Protected routes for internal tools (outreach toolboxes)

### Key Design Patterns
- **Domain-based routing**: Different content rendered based on hostname (lnlcreatives, lnlautomations)
- **Component composition**: Reusable UI components with business-specific wrappers
- **Glassmorphism UI**: Consistent visual style with transparent cards, blur effects, gradient borders
- **Mobile-first responsive**: All layouts adapt from mobile to desktop

## External Dependencies

### Third-Party Services
- **Typebot**: Chat widget integration for client concierge (embedded in index.html)
- **n8n Webhooks**: Lead forwarding to automation workflows via `N8N_WEBHOOK_URL` environment variable
- **Replicate API**: AI model inference for content generation demos
- **Google Drive/Notion**: Client vault redirect destinations (configured in `server/vaultClients.ts`)

### Database
- **PostgreSQL**: Required for all data persistence
- **Connection**: Via `DATABASE_URL` environment variable
- **ORM**: Drizzle with PostgreSQL dialect

### External APIs
- Google Fonts (Plus Jakarta Sans, Inter, Montserrat, Instrument Serif, Roboto)
- Pexels video CDN for hero background video

### Environment Variables Required
- `DATABASE_URL` - PostgreSQL connection string
- `N8N_WEBHOOK_URL` - Optional webhook for lead forwarding
- `SESSION_SECRET` - For session encryption (Replit Auth)