# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.25](https://github.com/uzh-bf/design-system/compare/v0.0.24...v0.0.25) (2022-08-08)

### [0.0.24](https://github.com/uzh-bf/design-system/compare/v0.0.23...v0.0.24) (2022-08-08)


### Bug Fixes

* **Navigation:** add export for component ([6ec1c9d](https://github.com/uzh-bf/design-system/commit/6ec1c9d5f198ab2231d28915b5c76fd94eda3b88))

### [0.0.23](https://github.com/uzh-bf/design-system/compare/v0.0.22...v0.0.23) (2022-08-08)


### Features

* **Navigation:** add navigation based on Radix NavigationMenu [#2](https://github.com/uzh-bf/design-system/issues/2)  ([69ce9c7](https://github.com/uzh-bf/design-system/commit/69ce9c7203ab8e75af2fc69c6e16d4fa742de131))


### Refactors

* extract animation config to constants ([a25f1ba](https://github.com/uzh-bf/design-system/commit/a25f1bad268fc334cc63e9fef7879818fe718877))

### [0.0.22](https://github.com/uzh-bf/design-system/compare/v0.0.21...v0.0.22) (2022-08-08)


### Bug Fixes

* disable prettier-plugin-tailwindcss for now (breaks with organize imports) ([4cfff3a](https://github.com/uzh-bf/design-system/commit/4cfff3a47186264ad4268282df7d78939e5aaf74))


### Other

* remove all peer deps to allow usage in the backend ([1f3b87d](https://github.com/uzh-bf/design-system/commit/1f3b87dd7bc98f4e3ed9b0639797e02439174d64))

### [0.0.21](https://github.com/uzh-bf/design-system/compare/v0.0.20...v0.0.21) (2022-08-08)

### [0.0.20](https://github.com/uzh-bf/design-system/compare/v0.0.19...v0.0.20) (2022-08-08)


### Other

* disable preflight globally (import on case by case basis), remove peer deps for code style tooling ([cf13678](https://github.com/uzh-bf/design-system/commit/cf13678c91e2e8e94d5321c8ad7ffd9bf63669f6))

### [0.0.19](https://github.com/uzh-bf/design-system/compare/v0.0.18...v0.0.19) (2022-07-23)


### Enhancements

* upgrade packages and add tailwindcss-radix ([103d44b](https://github.com/uzh-bf/design-system/commit/103d44b03711e2ed018a245802199d1be454ed4b))

### [0.0.18](https://github.com/uzh-bf/design-system/compare/v0.0.17...v0.0.18) (2022-07-23)


### Enhancements

* integrate prettier-plugin-tailwindcss for class sorting, add plugins to config explicitly ([5324699](https://github.com/uzh-bf/design-system/commit/5324699a2c4a0da69ba09ce33ae56fe2904968ca))

### [0.0.17](https://github.com/uzh-bf/design-system/compare/v0.0.16...v0.0.17) (2022-07-23)


### Bug Fixes

* add prettier-plugin-organize-imports to peer deps ([d2e2639](https://github.com/uzh-bf/design-system/commit/d2e263918d667edd289a75de5d08e11ae6fd28c9))

### [0.0.16](https://github.com/uzh-bf/design-system/compare/v0.0.15...v0.0.16) (2022-07-23)


### Enhancements

* add prettier-plugin-organize-imports ([583dcc1](https://github.com/uzh-bf/design-system/commit/583dcc1635e2edb5ceb18d315127ec0177ec4b39))


### Other

* downgrade node to 16 and remove npm i deps ([9e7d236](https://github.com/uzh-bf/design-system/commit/9e7d2367557178a8764e2bca317811eb1235b190))

### [0.0.15](https://github.com/uzh-bf/design-system/compare/v0.0.14...v0.0.15) (2022-07-18)


### Features

* **Prose:** add prose component with link hover state ([a2ac99d](https://github.com/uzh-bf/design-system/commit/a2ac99d5757287317a342a4094e8d2f4270c669a))


### Dependencies

* add tailwind plugins ([835b3dd](https://github.com/uzh-bf/design-system/commit/835b3ddf5b9c76a06ce6a402d976d8ad2889a20e))


### Enhancements

* **Modal:** add fullScreen mode for modal ([ce1367d](https://github.com/uzh-bf/design-system/commit/ce1367d1c3cf8db1427114ca0fb6377e00066591))

### [0.0.14](https://github.com/uzh-bf/design-system/compare/v0.0.13...v0.0.14) (2022-07-17)


### Bug Fixes

* **Header:** const before export to satisfy linter ([3a78d4e](https://github.com/uzh-bf/design-system/commit/3a78d4e2da949f0fba2f9c5765252673ab23bc10))
* **Header:** ensure React is imported ([52cf07a](https://github.com/uzh-bf/design-system/commit/52cf07a7a05c5b3f60d34964562b19f368187eda))


### Enhancements

* **build:** add husky hooks ([7003482](https://github.com/uzh-bf/design-system/commit/7003482ab38bf8ec4a36039478e82e7cce773ca3))

### [0.0.13](https://github.com/uzh-bf/design-system/compare/v0.0.12...v0.0.13) (2022-07-17)


### Bug Fixes

* **build:** ensure Header is exported from package ([687f588](https://github.com/uzh-bf/design-system/commit/687f588ffe5db969d091f3cc16b3e6b854b0340e))

### [0.0.12](https://github.com/uzh-bf/design-system/compare/v0.0.11...v0.0.12) (2022-07-17)


### Features

* **Header:** add basic header components ([4681649](https://github.com/uzh-bf/design-system/commit/4681649701857e932339304e494a16e689deb5d1))

### [0.0.11](https://github.com/uzh-bf/design-system/compare/v0.0.10...v0.0.11) (2022-07-17)


### Enhancements

* **Modal:** always show prev/next if one of both is defined, but disable unavailable options ([9063a33](https://github.com/uzh-bf/design-system/commit/9063a3399278c94d206949ea7f72e07801e29c63))


### Other

* **Button:** show the primary border if button is active ([b0097ac](https://github.com/uzh-bf/design-system/commit/b0097aca95c89e1794acabc2e4c600168fbfc538))

### [0.0.10](https://github.com/uzh-bf/design-system/compare/v0.0.9...v0.0.10) (2022-07-17)


### Bug Fixes

* **build:** move constants to separate entrypoint ([5882077](https://github.com/uzh-bf/design-system/commit/58820774bfdcbbf9d074b8275fd4cdc203267cc6))

### [0.0.9](https://github.com/uzh-bf/design-system/compare/v0.0.8...v0.0.9) (2022-07-17)


### Bug Fixes

* **ThemeProvider:** export named in addition to default ([14377df](https://github.com/uzh-bf/design-system/commit/14377df2195ecf16cb2880718e2efd661dc1dd17))

### [0.0.8](https://github.com/uzh-bf/design-system/compare/v0.0.7...v0.0.8) (2022-07-17)


### Features

* **Modal:** add generic modal with primary and secondary actions, onPrev and onNext ([62648d8](https://github.com/uzh-bf/design-system/commit/62648d84f5e3bd4ab4e53c251872291ef5354aa5))


### Enhancements

* add config types for standard-version ([cfc23d8](https://github.com/uzh-bf/design-system/commit/cfc23d8e39ff0656ed39b4885254fece3caf7930))
* **Button:** add button icon and label child components, add theme-based fill color for child SVGs ([344d449](https://github.com/uzh-bf/design-system/commit/344d449e6401ab6d48dd56098a2097d7fef74da2))
* **Button:** make button flex-row ([d2753a0](https://github.com/uzh-bf/design-system/commit/d2753a0284fb43b30b99e00d4a35f334d964f495))

### [0.0.7](https://github.com/uzh-bf/design-system/compare/v0.0.6...v0.0.7) (2022-07-17)

### [0.0.6](https://github.com/uzh-bf/design-system/compare/v0.0.5...v0.0.6) (2022-07-15)

### [0.0.5](https://github.com/uzh-bf/design-system/compare/v0.0.4...v0.0.5) (2022-07-15)


### Bug Fixes

* **ci:** ensure that access is public ([d5eb826](https://github.com/uzh-bf/design-system/commit/d5eb826264cbc57572cbc90a10e8621937bccbe1))
* **ci:** use check-version ([4bbe957](https://github.com/uzh-bf/design-system/commit/4bbe957a9b5b94b1684e820573431c46b8ae5f86))

### 0.0.4 (2022-07-13)


### Bug Fixes

* ensure publish works for both registries ([97a04a3](https://github.com/uzh-bf/design-system/commit/97a04a3389ecd3aca83c26c2621d598557aff9a0))
