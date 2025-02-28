# Claude Helper for Texture Docs

## Build Commands
- `yarn install` - Install dependencies
- `yarn start` - Start local development server
- `yarn build` - Build production site
- `yarn serve` - Serve built site locally
- `yarn typecheck` - Run TypeScript type checking
- `yarn clear` - Clear cache
- `yarn docusaurus ...` - Run any Docusaurus command

## Code Style Guidelines
- **TypeScript**: Strongly-typed React components with explicit interfaces/types
- **Component Structure**: Use functional components with explicit type definitions
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: Group imports (React, dependencies, components, assets)
- **Content Structure**: Follow Docusaurus conventions (docs/, src/components/)
- **SVG Icons**: Use @phosphor-icons/react for icons or import SVGs directly
- **UI Components**: Use clsx for conditional class names
- **MDX Content**: Use .mdx for docs with embedded React components
- **Links**: Use relative paths for internal navigation