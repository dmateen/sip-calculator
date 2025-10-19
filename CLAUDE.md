# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **SIP (Systematic Investment Plan) calculator web application** built with React, TypeScript, and Vite. It calculates projected investment returns with year-by-year breakdowns, supports step-up investments, and provides data visualization and export capabilities.

The application is designed for the Lovable platform (https://lovable.dev/projects/33d57d26-5750-45b5-933d-f0f34b953fa6).

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 8080)
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Core Structure
- **React Router** with single-page application routing (`/` and `/*` catch-all)
- **Component library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom theming
- **Charts**: Recharts for data visualization
- **State management**: React hooks with URL params for persistence
- **Form handling**: React Hook Form with Zod validation

### Key Directories
- `src/components/` - React components including shadcn/ui components
- `src/lib/` - Core business logic and utilities
- `src/utils/` - Helper functions for formatting and data export
- `src/hooks/` - Custom React hooks
- `src/pages/` - Route components

### Core Business Logic
The main SIP calculation logic is in `src/lib/sip.ts`:
- `computeYearlyBreakdown()` - Calculates SIP projections with monthly compounding
- `validateInputs()` - Input validation for SIP parameters
- Supports initial investment, monthly investments, step-up percentages, and varying tenures

### Component Architecture
- **InputForm** (`src/components/InputForm.tsx`) - Form for SIP inputs
- **SummaryCards** - High-level metrics display
- **ResultsChart** - Recharts-based visualization
- **ResultsTable** - Year-by-year breakdown table
- **Header/Footer** - Layout components

### Data Flow
1. User inputs are managed in `src/pages/Index.tsx`
2. Inputs sync with URL search parameters for shareability
3. `computeYearlyBreakdown()` generates results array
4. Results flow to visualization and table components
5. Export functionality generates CSV files

### URL State Management
Investment parameters are stored in URL search params:
- `initial` - Initial investment amount
- `monthly` - Monthly investment amount
- `return` - Expected annual return percentage
- `tenure` - Investment tenure in years
- `stepUp` - Annual step-up percentage

## Development Notes

- Uses Vite with React SWC plugin for fast development
- Path alias `@/` maps to `src/` directory
- Runs on port 8080 with host "::" for network access
- Lovable tagger plugin enabled in development mode
- No test framework currently configured