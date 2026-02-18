# UZH DF Design System

This design system is created and maintained by the IT dev-ops team at the Teaching Center of the Department of Finance at the University of Zurich. It simplifies the shared use of commonly used components in our web-development projects with corporate colors already included.

## Prerequisites

- Node.js version 22 (as specified in the project configuration)
- pnpm 10.30.0+ (recommended) or npm

## Local Development

This project uses a monorepo structure with Turbo for build orchestration and Ladle for component development.

To see how the components look, corresponding `.stories.mdx` files are added for each component and their content can be observed through the Ladle platform, accessible locally on `localhost:61000/design-system` when running:

```bash
# Using pnpm (recommended)
pnpm run dev

# Using npm
npm run dev
```

In addition to the visible component stories (implemented with Ladle), all MDX-story files also contain an extensive summary of the component's properties, including types, default values, and descriptions (as a comment). This part is meant to be scraped by Context7 (https://context7.com/uzh-bf/design-system), generating an importable MCP for the UZH DF design system. After adding new components / making significant changes to the corresponding interfaces, consider updating / re-generating these sections and triggering a new indexing run in Context7.

### Additional Development Commands

```bash
# Build all packages
pnpm run build      # or npm run build

# Run linting
pnpm run lint       # or npm run lint

# Run type checking
pnpm run check      # or npm run check

# Format code
pnpm run format     # or npm run format

# Check formatting
pnpm run format:check   # or npm run format:check
```

## Deployment

Once you want to re-deploy the package with updates, make sure that all linting errors are fixed and all parts of the new or modified component are exported properly.

**Important:** Before pushing or merging content to the main branch, run the build command to ensure that the generated type files are consistent with the component implementations:

```bash
# Using pnpm (recommended)
pnpm run build

# Using npm
npm run build
```

If this is the case, merge (and squash) all your changes into the main branch, pull the branch to your computer and run:

```bash
# Using pnpm (recommended)
pnpm run release:dry
pnpm run release

# Using npm
npm run release:dry
npm run release
```

Once this release command was successful, you can push it to GitHub with the displayed command:

```bash
git push --follow-tags origin main
```

### Automatic Deployments

This repository is configured with automatic deployments:

- **GitHub Pages**: All pushes to the main branch are automatically deployed to GitHub Pages through CI actions, making the component documentation and examples accessible online.
- **NPM Package**: The repository is set up to automatically deploy the package to npm under the following domain: `https://github.com/uzh-bf/design-system/pkgs/npm/design-system`

## Installing the package

As with all npm packages, components from the design-system can be easily installed using either npm or pnpm:

```bash
# Using npm
npm install @uzh-bf/design-system

# Using pnpm (recommended)
pnpm install @uzh-bf/design-system
```
