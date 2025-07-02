# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the UZH BF Design System - a monorepo containing a comprehensive component library built with React, Radix UI, and Tailwind CSS. The design system provides shared UI components for web development projects at the University of Zurich's Department of Banking and Finance.

## Architecture

### Monorepo Structure

- **Root**: Turborepo-based monorepo with pnpm workspaces
- **Main Package**: `packages/design-system` - Core component library
- **Additional Packages**: Other packages exist for custom web components and are not currently in active development

### Component Structure

- Components are located in `packages/design-system/src/`
- Each component has:
  - A `.tsx` file with the component implementation
  - A `.stories.mdx` file for Ladle documentation (recently migrated from `.tsx` format)
- Components are built on top of Radix UI primitives (located in `src/ui/`)
- Form components with Formik integration are in `src/forms/`

### Technology Stack

- **React 19** with TypeScript
- **Radix UI** for accessible, unstyled primitives
- **Tailwind CSS v4** for styling
- **Ladle** for component development and documentation
- **Vite** for bundling
- **Turborepo** for monorepo management

## Essential Commands

### Development

```bash
# Run Ladle dev server for component development (port 61000)
npm run dev

# Build all packages
npm run build

# Type checking
npm run check

# Linting
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

### Package-specific Commands

```bash
# Build design-system package only
npm run -w packages/design-system build

# Run type checking for design-system
npm run -w packages/design-system check
```

### Release Process

```bash
# Create a release (updates version and CHANGELOG)
npm run release

# Dry run to see what would change
npm run release:dry

# Create alpha prerelease
npm run release:alpha

# After release, push with tags
git push --follow-tags origin main
```

### 🔄 Project Awareness & Context

- Always read PLANNING.md at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- Check TASK.md before starting a new task. If the task isn't listed, add it with a brief description and today's date.
- Use consistent naming conventions, file structure, and architecture patterns as described in PLANNING.md.
- After you finish working on a task, always review and, if necessary, update TASK.md regarding the task you have worked on and, if applicable, regarding new tasks that might have come up during your work on the current task.
- Regularly update the "Implementation Status" in PLANNING.md to reflect the current overall summarized state of the project.
- When asked to prepare a prompt for the next conversation, always focus on the next task and provide a draft of the instructions that should be given to this agent (including the goal, instructions to review PLANNING.md and TASK.md, and the task description of the subsequent specific task).
- When you complete a task, always provide a summary of your work as well as an outlook on the next task according to PLANNING.md and TASK.md. Assume that the next task will be worked on in a new conversation.
- ALWAYS continue working until you finish your task. Do not stop prematurely and wait for the user to tell you to continue.
- Ask me questions to further clarify the task if necessary.
- URGENT: When using the view_file tool to analyze a file, ALWAYS read the maximum lines per call whenever possible to minimize the number of tool calls and reduce costs. Only make additional calls when necessary to understand the complete context and if the file is longer than the maximum number of lines. NEVER do incremental look ups of the same file if not necessary.
- When you want to view a complete file, always use a `cat` command in the terminal. If you want to find specific code in a file, use `cat` combined with `grep`.

### 🧱 Code Structure & Modularity

- Never create a file longer than 500 lines of code. If a file approaches this limit, refactor by splitting it into modules or helper files.
- Organize code into clearly separated modules, grouped by feature or responsibility.
- Use clear, consistent imports (prefer relative imports within packages).

### 🧪 Testing & Reliability

- After updating any logic, check whether existing unit tests need to be updated. If so, do it.
- Whenever you create or change tests, run them with the matching command to make sure they still pass.

#### TypeScript

When using TypeScript:

- Always create Jest unit tests for new features (functions, classes, routes, etc).
- Tests should live in a /**tests** folder mirroring the main app structure.
- Include at least:
- 1 test for expected use
- 1 edge case
- 1 failure case
- If Cypress is installed, write end-to-end tests for critical user flows.
- Add data-cy attributes to complex frontend components to ensure compatibility with e2e tests.
- Structure e2e tests to cover complete user journeys.

#### Python

When using Python:

- Always create Pytest unit tests for new features (functions, classes, routes, etc).
- Tests should live in a /tests folder mirroring the main app structure.
- Include at least:
- 1 test for expected use
- 1 edge case
- 1 failure case

### ✅ Task Completion

- URGENT: Mark completed tasks in TASK.md immediately after finishing them. Do not wait until the end of the conversation or until the user tells you to, otherwise it might be forgotten.
- URGENT: Add new sub-tasks or TODOs discovered during development to TASK.md under a "Discovered During Work" section. If not absolutely necessary, do not deviate from your task to quickly do another task, just add it to the TASK.md for later implementation and let the user know.

### 📎 Style & Conventions

- Prefer functional programming - avoid classes and use pure functions when possible.
- Ignore lint errors in Markdown files when it comes to newlines and file structuring.

#### TypeScript

When using TypeScript:

- Follow ESLint rules and format with Prettier.
- Use strong typing with interfaces and type definitions.
- Use React with functional components and hooks for frontend.
- Write JSDoc comments for every function:

```typescript
/**
 * Brief summary.
 *
 * @param param1 - Description.
 * @returns Description.
 */

function example(param1: string): number {
  // implementation
}
```

#### React

When using React:

- Always use function and not const for functional components.
- Extract complex logic and computations into one or multiple custom hooks and, if sensible, create unit tests for the hooks.
- Create one file per component unless the components are very simple and only used inside the main component.
- Use PascalCase for React component file names (e.g., UserCard.tsx, not user-card.tsx).
- Use Tailwind CSS for styling. Use tailwind-merge for dynamic and conditional className (e.g., twMerge('flex', isOpen ? 'flex' : 'hidden')).
- Do NOT add inline comments in JSX in React components.

#### Python

When using Python:

- Follow PEP8, use type hints, and format with ruff.
- Use pydantic for data validation.
- Use FastAPI for APIs.
- Never use argument parsing or similar when building command line scripts unless explicitly asked to do so
- Write docstrings for every function using the Google style:

```python
def example():
"""
Brief summary.

Args:
param1 (type): Description.

Returns:
type: Description.
"""
```

### 📚 Documentation & Explainability

- Update README.md and relevant CLAUDE.md files (the root CLAUDE.md and the CLAUDE.md of the packages you are working on) when new features are added, dependencies or architecture change, or setup steps are modified.
- Comment non-obvious code and ensure everything is understandable to a mid-level developer.
- When writing complex logic, add an inline # Reason: comment explaining the why, not just the what.

### 🧠 AI Behavior Rules

- Never assume missing context. Ask questions if uncertain.
- Never hallucinate libraries or functions – only use known, verified packages (e.g., from NPM or PyPI).
- Always confirm file paths and module names exist before referencing them in code or tests or trying to update them.
- Never delete or overwrite existing code unless explicitly instructed to or if part of a task from TODO.md.

## Development Guidelines

### Component Development

1. Components should follow existing patterns - check similar components first
2. Use ShadCN with Radix UI primitives from `src/ui/` when available
3. Stories should be in MDX format (`.stories.mdx`)
4. Export all component parts from the main component file
5. Add exports to `src/index.ts`

### Styling

- Use Tailwind CSS classes
- Follow existing className patterns with `cn()` utility from `lib/utils`
- Component variants should use `class-variance-authority` (cva)

### Testing & Quality

- Always run `npm run lint` before committing
- Run `npm run check` to ensure TypeScript types are correct
- Format code with `npm run format`

### Node Version

- Required: Node.js v22 (enforced by Volta and engines field)
- Package manager: pnpm v10.12.1

## 📚 Component Documentation Standards

### Documentation Structure

All 74 components in this design system follow standardized documentation patterns. Every component includes both human-readable README sections and AI-focused technical documentation.

Each `.stories.mdx` file follows this standardized structure:

#### Human README Section
```mdx
{/* START README */}
[Human-focused description emphasizing purpose, use cases, and practical guidance]

Use this component when you need:
- [Primary use case]
- [Secondary use case]
- [Additional use cases]

[Key features, behaviors, or notable characteristics]
{/* END README */}
```

#### AI Documentation Section
```mdx
{/*
AI_DOCUMENTATION_START

Technical Overview: [Implementation approach, architecture, key patterns]

Dependencies:
- [dependency]: Purpose/usage
[List all significant dependencies]

Available Stories:
- StoryName: What it demonstrates
[List all stories with descriptions]

Props:
- propName: type - Description
[Complete prop documentation]

Component Structure:
- [Key implementation details]
- [State management approach]
- [Styling patterns]

Usage Examples:
```tsx
// Comprehensive code examples
```

[Additional sections like validation patterns, best practices, etc.]

Related Components:
- [Component]: [Relationship/alternative use case]

AI_DOCUMENTATION_END
*/}
```

### Component Categories & Templates

#### 1. Shadcn UI Re-exports (32 components)
- **Purpose**: Radix UI-based components with UZH design system styling
- **Template Focus**: Clear purpose, use cases, Radix UI integration
- **Examples**: Accordion, Button, Calendar, Card, etc.

#### 2. Custom Implementation Components (27 components)
- **Purpose**: Bespoke components with custom functionality
- **Template Focus**: Implementation approach, subcomponents, advanced features
- **Examples**: ColorPicker, Table, Navigation, Toast, etc.

#### 3. Form Components (14 components)
- **Purpose**: Form integration with validation and state management
- **Template Focus**: Formik integration, validation patterns, form context
- **Split**: Formik-integrated (9) and standalone (5) versions
- **Examples**: FormikTextField, SelectField, DatetimePicker, etc.

#### 4. Hooks (1 component)
- **Purpose**: Reusable React hook functionality
- **Template Focus**: Hook parameters, implementation details, performance
- **Example**: useArrowNavigation

### Documentation Best Practices

#### Human README Sections
- **Focus**: Practical usage, when to use, key behaviors
- **Avoid**: Technical implementation details, exhaustive prop lists
- **Include**: Clear use cases, component relationships, notable features
- **Style**: Conversational, user-focused, actionable guidance

#### AI Documentation Sections
- **Focus**: Technical completeness, implementation details, code examples
- **Include**: All props with types, dependencies, usage patterns
- **Structure**: Consistent sections across all components
- **Examples**: Real-world code snippets, validation patterns, testing approaches

#### Template Selection Guide
When documenting new components:

1. **Shadcn Re-export**: Component wraps Radix UI primitive
   - Focus on UZH customizations and design system integration
   - Reference Radix UI documentation appropriately
   - Document any additional props or behaviors

2. **Custom Component**: Bespoke implementation
   - Emphasize unique functionality and design decisions
   - Document subcomponents and composition patterns
   - Include comprehensive usage examples

3. **Form Component**: Form integration focus
   - Highlight Formik integration or standalone usage
   - Document validation patterns and error handling
   - Include form context and state management details

4. **Hook**: React hook functionality
   - Document parameters, return values, and implementation
   - Include performance considerations and best practices
   - Show integration examples with components

### Documentation Quality Standards

#### Consistency Requirements
- All files must follow the established template structure
- Comment delimiters must be exactly: `{/* START README */}`, `{/* END README */}`, `AI_DOCUMENTATION_START`, `AI_DOCUMENTATION_END`
- Props documentation must match actual component interfaces
- Story documentation must align with actual story exports

#### Content Standards
- Human sections focus on "why" and "when" to use
- AI sections focus on "how" and "what" technical details
- All examples must be functional and realistic
- Cross-references between components must be accurate

#### Technical Standards
- Props must include correct TypeScript types
- Dependencies must be accurately listed
- Code examples must be syntactically correct
- Build process must remain stable with documentation

### Future Documentation Maintenance

#### Adding New Components
1. Identify the appropriate category (Shadcn, Custom, Form, Hook)
2. Use the corresponding template from PLANNING.md
3. Follow the established documentation structure
4. Ensure both human and AI sections are complete
5. Validate against quality standards before committing

#### Updating Existing Components
- Maintain the established documentation structure
- Update both human and AI sections when props/behavior changes
- Preserve the balance between human usability and AI completeness
- Follow the same quality standards as new components

#### MCP Server Integration Readiness
The documentation structure is designed for eventual MCP (Model Context Protocol) server integration:
- AI documentation sections use consistent comment delimiters for parsing
- Technical information is structured for automated extraction
- Component relationships are clearly documented for graph building
- Code examples are formatted for direct usage

### Documentation Resources

#### Template References
Complete documentation templates are available in PLANNING.md for:
- Shadcn UI re-export components
- Custom implementation components  
- Form components (Formik and standalone)
- React hooks
- AI documentation section structure

#### Current Documentation Status
- **74/74 components** have dual-purpose documentation
- **Consistent templates** across all component types  
- **Quality standards** implemented throughout
- **MCP readiness** structure for future integration
- **Developer experience** optimized with comprehensive component guidance
