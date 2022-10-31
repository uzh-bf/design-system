# UZH BF Design System

This design system is created and maintained by the IT dev-ops team at the Teaching Center of the department of Banking and Finance at the University of Zurich. It simplifies the shared use of commonly used components in our web-development projects with corporate colors already included.

## Local Development

In order to see how the components look, corresponding `.stories.tsx` files are added for each component and their content can be observed through the Ladle platform, accessibly locally on `localhost:61000` when running:

```bash
npm run dev
```

## Deployment

Once you want to re-deploy the package with updates, make sure that all linting errors are fixed and all parts of the new or modified component are exported properly. If this is the case, merge (and squash) all your changes into the main branch, pull the branch to your computer and run:

```bash
npm run release
```

Once this release command was successful, you can push it to GitHub:

```bash
git push --follow-tags origin main
```

This repository is set up to automatically deploy the package to npm under the following domain: `https://github.com/uzh-bf/design-system/pkgs/npm/design-system`

## Installing the package

As with all npm packages, components from the design-system can be easily installed through the following command:

```bash
npm install @uzh-bf/design-system
```
