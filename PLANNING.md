# UZH BF Design System Documentation Enhancement Plan

## Project Overview

This document outlines the comprehensive plan to enhance documentation for all 74 components in the UZH BF Design System. The goal is to create rich, human-readable README sections alongside AI-focused technical documentation for eventual packaging as an MCP server.

## Current Documentation Analysis

### Documentation Status Summary
- **Total Components**: 74 story files
- **Components with README**: 73 files
- **Missing README**: 1 file (Workflow.stories.mdx)
- **Documentation Quality**: Highly varied across component types

### Component Categories (Based on Actual Analysis)

#### 1. Shadcn UI Re-exports (32 components)
**Current Documentation**: Minimal one-line references to Shadcn UI docs
**Quality**: Poor - needs significant enhancement

Components:
- Accordion, Alert, AlertDialog, AspectRatio, Avatar
- Badge, Breadcrumb, Calendar, Card, Carousel
- Command, ContextMenu, Drawer, HoverCard, NavigationMenu
- Pagination, Popover, RadioGroup, Resizable, ScrollArea
- Separator, Sheet, Sidebar, Skeleton, Toggle, ToggleGroup
- ShadcnCollapsible, ShadcnDropdown, ShadcnLabel, ShadcnMenubar, ShadcnProgress, ShadcnTable

**Current Pattern**:
```
The `ComponentName` component currently represents a simple re-export of the Shadcn UI ComponentName component. More information on the structure can be found on the [Shadcn UI ComponentName documentation](https://ui.shadcn.com/docs/components/componentname).
```

#### 2. Custom Implementation Components (27 components)
**Current Documentation**: Mixed quality - some excellent, some basic
**Quality**: Variable - needs standardization

Components:
- Button, Checkbox, Collapsible, ColorPicker, Countdown
- CycleCountdown, CycleProgress, DatePicker, DatetimePicker
- Dropdown, Header, Modal, Navigation, NotificationBadgeWrapper
- Progress, Prose, Select, Slider, StepProgress
- Switch, Table, Tabs, Tag, Toast, Tooltip
- UserNotification, Workflow (missing README)

**Documentation Patterns**:
- **Excellent** (Button, ColorPicker, Table): Detailed prop documentation with usage examples
- **Good** (Progress, Tag, Prose): Basic description with some prop details
- **Basic** (Tooltip, Switch): Minimal documentation
- **Missing** (Workflow): No README section

#### 3. Formik Form Components (9 components)
**Current Documentation**: Excellent - comprehensive prop documentation
**Quality**: Excellent - maintain high standard

Components:
- FormikColorPicker, FormikDatePicker, FormikDatetimePicker
- FormikNumberField, FormikPinField, FormikSelectField
- FormikSwitchField, FormikTextField, FormikTextareaField

**Pattern**: Detailed Formik integration explanation with complete prop lists

#### 4. Standalone Form Components (5 components)
**Current Documentation**: Good - solid prop documentation
**Quality**: Good - needs minor enhancement

Components:
- Label, NumberField, SelectField, TextField, TextareaField

#### 5. Hooks (1 component)
**Current Documentation**: Good - clear usage examples
**Quality**: Good - needs AI documentation section

Components:
- useArrowNavigation

## Documentation Enhancement Strategy

### Target Documentation Structure

#### Human-Readable README Section
Focus on:
- **Purpose**: What the component does and why it exists
- **Use Cases**: When and how to use the component
- **Key Features**: Important behaviors users should understand
- **Related Components**: Child components or alternatives (when relevant)
- **Avoid**: Detailed prop lists (covered by TypeScript/autocomplete)

#### AI Documentation Section
Focus on:
- **Technical Overview**: Implementation details and architecture
- **Dependencies**: Peer dependencies (Radix UI, Formik, etc.)
- **Available Stories**: List of story names and demonstrations
- **Props**: Complete technical prop documentation
- **Code Structure**: How the component is organized internally
- **Usage Examples**: Code snippets from stories
- **Related Components**: Technical alternatives and comparisons

### Implementation Phases

#### Phase 1: Foundation (Immediate)
1. ✅ Create PLANNING.md (this document)
2. ⏳ Create TODO.md with detailed task breakdown
3. 🔄 Fix Workflow.stories.mdx missing README
4. 📝 Design documentation templates for each category

#### Phase 2: Core Enhancement (Primary Work)
1. **Shadcn UI Re-exports** (32 components)
   - Expand minimal documentation to comprehensive guides
   - Add technical AI documentation sections
   - Document UZH-specific customizations

2. **Custom Components** (27 components)
   - Restructure existing documentation
   - Separate human usage from technical details
   - Standardize documentation format

3. **Form Components** (14 components)
   - Refine human-focused descriptions
   - Enhance AI technical documentation
   - Document Formik integration patterns

4. **Hooks** (1 component)
   - Add AI documentation section
   - Maintain existing quality

#### Phase 3: Quality Assurance (Final)
1. Consistency validation across all 74 files
2. Cross-reference verification
3. Documentation completeness check
4. Update CLAUDE.md with new patterns

## Success Metrics

- [ ] All 74 files have human README sections
- [ ] All 74 files have AI documentation sections
- [ ] Consistent formatting and structure
- [ ] Clear separation of user vs developer information
- [ ] Complete component relationship mapping
- [ ] MCP server integration ready

## Implementation Status

### Current Progress
- **Analysis Complete**: ✅ All 74 files analyzed and categorized
- **Planning Complete**: ✅ PLANNING.md created
- **TODO Creation**: ⏳ In progress
- **Implementation**: ⏳ Ready to begin

### Next Immediate Actions
1. Complete TODO.md creation
2. Fix Workflow.stories.mdx missing README
3. Create documentation templates
4. Begin systematic component enhancement

## Documentation Templates (Validated)

### Template for Shadcn UI Re-exports
```markdown
{/* START README */}
The `ComponentName` component provides [specific functionality with clear purpose]. It [describe what it enables users to do].

Use this component when you need to:
- [Primary use case]
- [Secondary use case]
- [Additional use cases]

[Notable features, behaviors, or modes - e.g., single vs multiple selection, keyboard support, etc.]

[If applicable: Component parts like ComponentName.Trigger, ComponentName.Content and their roles]
{/* END README */}

{/*
AI_DOCUMENTATION_START

Technical Overview: Shadcn UI re-export built on Radix UI's [primitive name] primitive with UZH design system styling
Dependencies: @radix-ui/react-[component], [other deps like lucide-react for icons]

Available Stories:
- StoryName: Description of what this story demonstrates

Props (from Radix UI):
- propName: type - Description
[List all relevant props with types and descriptions]

Component Structure:
- ComponentName: Root container (re-export from ui/component)
- ComponentPart: Description of this part
[List all component parts]

Usage Examples:
```tsx
// Example usage code
```

Related Components:
- ComponentName: How it relates/differs
[List related components with relationships]

AI_DOCUMENTATION_END
*/}
```

### Template for Custom Components
```markdown
{/* START README */}
The `ComponentName` component [concise description of what it is and does]. It provides [main value proposition].

Use this component when you need:
- [Primary use case/scenario]
- [Secondary use case/scenario]
- [Additional scenarios]

[If subcomponents exist: The component includes N subcomponents:]
- `Component.SubA`: [Purpose]
- `Component.SubB`: [Purpose]

[Key features or special behaviors users should know about]
{/* END README */}

{/*
AI_DOCUMENTATION_START

Technical Overview: [Implementation approach, architecture decisions, key patterns used]

Dependencies:
- [dependency]: Purpose/usage
[List all significant dependencies]

Available Stories:
- StoryName: What it demonstrates
[List all stories with descriptions]

Props:
ComponentName:
- propName: type - Description
[Complete prop documentation]

[If subcomponents exist:]
Component.SubA props:
- propName: type - Description

Code Structure:
- [Key implementation details]
- [State management approach]
- [Styling patterns]
- [Event handling]

Usage Examples:
```tsx
// Common usage
// Advanced usage
```

Related Components:
- [Component]: [Relationship/alternative use case]

AI_DOCUMENTATION_END
*/}
```

### Template for Form Components
```markdown
{/* START README */}
The `ComponentName` component [description emphasizing form integration]. It [key value in forms context].

Use this component when you need:
- [Form-specific use case]
- [Validation scenario]
- [State management need]

[Key form features: How it handles validation, errors, form state, etc.]

[Usage patterns: Controlled vs uncontrolled, Formik vs standalone]
{/* END README */}

{/*
AI_DOCUMENTATION_START

Technical Overview: [Formik wrapper/standalone, integration approach]

Dependencies:
- formik (peer dependency): Form state management
- [other deps]: Purpose
[List all dependencies]

Available Stories:
- Default: Basic form integration
- Validation: Schema validation example
[List all stories with form context]

Props:
- name?: string - Formik field name (required for Formik integration)
- value?: type - Controlled value (required if no name)
- onChange?: (value) => void - Change handler (required if no name)
[Complete prop list with form-specific details]

Code Structure:
- [Formik integration details]
- [Validation handling]
- [Error display logic]
- [State management patterns]

Usage Examples:
```tsx
// Formik integration
// Standalone usage
// With validation
```

Related Components:
- [Component]: [Relationship in form context]

AI_DOCUMENTATION_END
*/}
```

### Template for Hooks
```markdown
{/* START README */}
The `hookName` hook [concise description of functionality]. It [what it enables/simplifies].

Use this hook when you need:
- [Primary use case]
- [Common scenario]
- [Additional use cases]

[Key behaviors or optimizations]
{/* END README */}

{/*
AI_DOCUMENTATION_START

Technical Overview: [Implementation approach, React patterns used]

Dependencies:
- React hooks used
- External dependencies if any

Available Stories:
- StoryName: Demonstration description

Hook Parameters:
- paramName?: type - Description
[All parameters with types]

Code Structure:
- [Implementation approach]
- [Effect management]
- [Cleanup handling]
- [Performance optimizations]

Implementation Details:
```typescript
// Simplified implementation showing key logic
```

Usage Examples:
```tsx
// Basic usage
// Advanced usage
// Edge cases
```

Performance Considerations:
- [Optimization details]
- [Best practices]

Common Use Cases:
- [Specific scenario]
[List common applications]

Related Components/Hooks:
- [Name]: [How it could work together]

AI_DOCUMENTATION_END
*/}
```

## Risk Assessment

### Low Risk
- Shadcn UI re-exports (well-defined external docs to reference)
- Formik components (already well-documented)

### Medium Risk
- Custom components with existing poor documentation
- Ensuring consistency across 74 files

### High Risk
- Workflow component (missing README entirely)
- Maintaining development velocity during documentation work

## Timeline Estimation

- **Phase 1 (Foundation)**: 1-2 days
- **Phase 2 (Core Enhancement)**: 5-7 days
- **Phase 3 (Quality Assurance)**: 1-2 days
- **Total Estimated Time**: 7-11 days

This timeline assumes focused work on documentation enhancement and may vary based on complexity discoveries during implementation.