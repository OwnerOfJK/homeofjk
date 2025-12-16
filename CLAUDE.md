# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4. The site features a **Tinder-style card interface** with swipeable project cards, embedded demos, and an immersive single-viewport design.

## Development Commands

```bash
# Start development server with Turbopack (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

### Application Structure

- **Next.js App Router**: Modern App Router pattern (`src/app/`)
- **Single-Viewport Design**: Full-screen experience, no scrolling
- **Component-based**: Modular components in `src/app/components/`
- **Type-safe**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS 4 with custom design system

### Key Files

- `src/app/page.tsx`: Main page - manages carousel state and layout (Client Component)
- `src/app/layout.tsx`: Root layout with metadata configuration
- `src/app/components/profile.tsx`: Profile section with avatar, name, and tagline
- `src/app/components/socials.tsx`: Social media links (GitHub, LinkedIn, Twitter, Email)
- `src/app/components/project-carousel.tsx`: Tinder-style swipeable card carousel
- `src/app/projects/projects.ts`: Project data and type definitions
- `src/app/globals.css`: Global styles and design system variables

### Design System

The project uses a custom design system defined in `globals.css`:

- **Colors**:
  - Primary: #1A73E8 (blue)
  - Supporting: #F1F3F4 (grey)
  - Accent: #174EA6 (dark blue)
  - Foreground: #202124 (text)
- **Spacing**: 16px base unit
- **Typography**: System font stack, 16px body, 24px headings
- **Visual Style**: Soft shadows, 1px borders, 4px border radius
- **Motion**: Respects `prefers-reduced-motion` for accessibility

### Path Aliases

TypeScript is configured with path alias `@/*` → `./src/*` for cleaner imports.

### Component Patterns

#### Page Layout (page.tsx)

Client component managing the app state and layout:

- **State Management**: Controls `currentIndex` for active project
- **Layout Structure**: Profile → Socials → Carousel → Progress Indicators
- **Props Passing**: Provides state to carousel via props

#### ProjectCarousel Component

Tinder-style swipeable card interface:

- **Card Stack**: Shows current card + next card behind (scaled/offset for depth)
- **Drag Interaction**:
  - Mouse/touch drag with real-time position tracking
  - Card rotation and opacity change during drag
  - Velocity-based swipe detection (15% threshold or fast swipe)
- **Navigation**:
  - Corner arrow buttons for accessibility
  - Keyboard support (arrow keys)
  - Drag/swipe gestures (desktop & mobile)
- **Card Design**:
  - Rounded corners (`rounded-3xl`)
  - Drop shadows for depth
  - Info overlay at bottom with gradient background
  - Embedded iframes for live demos
  - One Piece background for in-progress projects
- **Props**: Receives `currentIndex` and `setCurrentIndex` from parent

#### Project Data (projects/projects.ts)

Define projects in `src/app/projects/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    name: "Project Name",
    description: "1-2 line description",
    techStack: ["Tech1", "Tech2"],
    status: "active" | "in-progress" | "coming-soon",
    projectUrl: "https://...",  // For embedding
    githubUrl: "https://...",
    embedComponent?: <YourComponent />,  // Optional custom component
  },
];
```

#### Profile Component

Server component with profile image, name, and tagline.

#### Socials Component

Server component with social links array - easy to add/remove links by editing the data array.

### Image Handling

- Images stored in `/public` directory
- Next.js Image component used for optimized image loading
- Profile image: `/strawhat.jpeg`

### UX Principles

- **Tinder-Style Interaction**: Swipeable cards with natural drag physics
- **Single Focus**: One project visible at a time, stacked cards for context
- **Immersive Demos**: Full-card embedded iframes showing live projects
- **Floating UI**: Info overlays on cards, progress dots separate from stack
- **Sequential Navigation**: Intentional exploration through swipe/keyboard
- **Performance**: Demos load only when active, velocity-based swipe detection
- **Accessibility**: Full keyboard support, ARIA labels, reduced-motion respect
