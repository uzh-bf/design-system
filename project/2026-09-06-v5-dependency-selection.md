# Compatible dependency selection — 2026-09-06

Registry metadata was refreshed on 2026-10-17 for all 71 direct dependencies. Exact stable targets retain existing majors and pre-1.0 minor lines. Consumer peer ranges, root/sibling manifests and release version remain unchanged. Compatibility is provisional until package, browser and packed-consumer verification passes.

Radix release notes describe improvements to form reset, nested keyboard handling, dialog ARIA references and iOS input editing: https://www.radix-ui.com/primitives/docs/overview/releases. Individual packages are retained; adopting the aggregate radix-ui package is unnecessary.

Source metadata for each target is its public npm registry document at `https://registry.npmjs.org/<package>`. Raw version/engine/peer metadata is local at `/tmp/ds-v5-compatible-candidates-2026-10-17.json`. See [later-major dispositions](2026-09-06-v5-major-upgrade-assessment.md) and the [shadcn source comparison](2026-09-06-v5-shadcn-assessment.md).

| Package                               | Previous declaration | Selected target | Disposition                                                                              |
| ------------------------------------- | -------------------- | --------------- | ---------------------------------------------------------------------------------------- |
| `@axe-core/playwright`                | `4.11.3`             | `4.14.0`        | Update within current major; pre-1.0 retains minor.                                      |
| `@eslint/compat`                      | `1.3.1`              | `1.4.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@eslint/eslintrc`                    | `3.3.1`              | `3.3.7`         | Update within current major; pre-1.0 retains minor.                                      |
| `@eslint/js`                          | `9.30.1`             | `9.39.5`        | Update within current major; pre-1.0 retains minor.                                      |
| `@fontsource-variable/jetbrains-mono` | `5.3.0`              | `5.3.0`         | Retain: current compatible release.                                                      |
| `@fontsource-variable/source-sans-3`  | `5.3.0`              | `5.3.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@ladle/react`                        | `5.0.3`              | `5.1.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@playwright/test`                    | `1.61.0`             | `1.61.0`        | Hold: deterministic VRT image is pinned to 1.61.0.                                       |
| `@radix-ui/react-accordion`           | `1.2.11`             | `1.3.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-alert-dialog`        | `1.1.14`             | `1.2.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-aspect-ratio`        | `1.1.7`              | `1.2.0`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-avatar`              | `1.1.10`             | `1.3.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-checkbox`            | `1.3.2`              | `1.4.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-collapsible`         | `1.1.11`             | `1.2.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-context-menu`        | `2.2.15`             | `2.4.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-dialog`              | `1.1.14`             | `1.3.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-dropdown-menu`       | `2.1.15`             | `2.2.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-hover-card`          | `1.1.14`             | `1.2.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-label`               | `2.1.7`              | `2.1.17`        | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-menubar`             | `1.1.15`             | `1.2.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-navigation-menu`     | `1.2.13`             | `1.4.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-popover`             | `1.1.14`             | `1.3.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-progress`            | `1.1.7`              | `1.2.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-radio-group`         | `1.3.7`              | `1.5.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-scroll-area`         | `1.2.9`              | `1.4.0`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-select`              | `2.2.5`              | `2.4.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-separator`           | `1.1.7`              | `1.2.0`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-slider`              | `1.3.5`              | `1.6.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-slot`                | `1.2.3`              | `1.5.0`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-switch`              | `1.2.5`              | `1.4.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-tabs`                | `1.1.12`             | `1.2.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-toggle`              | `1.1.9`              | `1.2.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-toggle-group`        | `1.1.10`             | `1.2.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@radix-ui/react-tooltip`             | `1.2.7`              | `1.4.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `@tailwindcss/aspect-ratio`           | `0.4.2`              | `0.4.2`         | Retain: current compatible release.                                                      |
| `@tailwindcss/forms`                  | `0.5.10`             | `0.5.11`        | Update within current major; pre-1.0 retains minor.                                      |
| `@tailwindcss/typography`             | `0.5.16`             | `0.5.20`        | Update within current major; pre-1.0 retains minor.                                      |
| `@tailwindcss/vite`                   | `4.1.11`             | `4.3.3`         | Update within current major; pre-1.0 retains minor.                                      |
| `@types/node`                         | `^22.15.31`          | `22.20.5`       | Update within current major; pre-1.0 retains minor.                                      |
| `@types/react`                        | `^19.1.8`            | `19.3.0`        | Update within current major; pre-1.0 retains minor.                                      |
| `@types/react-dom`                    | `^19.1.6`            | `19.3.0`        | Update within current major; pre-1.0 retains minor.                                      |
| `@typescript-eslint/eslint-plugin`    | `8.35.1`             | `8.71.2`        | Update within current major; pre-1.0 retains minor.                                      |
| `@typescript-eslint/parser`           | `8.35.1`             | `8.71.2`        | Update within current major; pre-1.0 retains minor.                                      |
| `@vitejs/plugin-react-swc`            | `3.10.2`             | `3.10.2`        | Hold: update changes SWC resolutions in sibling packages.                                |
| `cmdk`                                | `1.1.1`              | `1.1.1`         | Retain: current compatible release.                                                      |
| `date-fns`                            | `4.1.0`              | `4.4.0`         | Update within current major; pre-1.0 retains minor.                                      |
| `embla-carousel-react`                | `8.6.0`              | `8.6.0`         | Retain: current compatible release.                                                      |
| `eslint`                              | `9.30.1`             | `9.39.5`        | Update within current major; pre-1.0 retains minor.                                      |
| `eslint-plugin-react-hooks`           | `5.2.0`              | `5.2.0`         | Retain: current compatible release.                                                      |
| `eslint-plugin-react-refresh`         | `0.4.20`             | `0.4.26`        | Update within current major; pre-1.0 retains minor.                                      |
| `input-otp`                           | `1.4.2`              | `1.5.0`         | Update within current major; pre-1.0 retains minor.                                      |
| `magic-string`                        | `0.30.17`            | `0.30.21`       | Update within current major; pre-1.0 retains minor.                                      |
| `next-themes`                         | `0.4.6`              | `0.4.6`         | Retain: current compatible release.                                                      |
| `npm-run-all`                         | `4.1.5`              | `4.1.5`         | Retain: current compatible release.                                                      |
| `prettier`                            | `3.6.2`              | `3.6.2`         | Hold: formatter cohort changes eight unrelated source files.                             |
| `prettier-plugin-organize-imports`    | `4.1.0`              | `4.1.0`         | Hold with formatter cohort to preserve scoped formatting.                                |
| `prettier-plugin-tailwindcss`         | `0.6.13`             | `0.6.13`        | Hold with formatter cohort to preserve scoped formatting.                                |
| `react-colorful`                      | `5.6.1`              | `5.8.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `react-countdown`                     | `2.3.6`              | `2.3.6`         | Retain: current compatible release.                                                      |
| `react-day-picker`                    | `9.7.0`              | `9.14.0`        | Update within current major; pre-1.0 retains minor.                                      |
| `react-hook-form`                     | `7.59.0`             | `7.90.0`        | Update within current major; pre-1.0 retains minor.                                      |
| `react-resizable-panels`              | `3.0.3`              | `3.0.6`         | Update within current major; pre-1.0 retains minor.                                      |
| `recharts`                            | `2.15.3`             | `2.15.4`        | Update within current major; pre-1.0 retains minor.                                      |
| `sonner`                              | `1.7.3`              | `1.7.4`         | Update within current major; pre-1.0 retains minor.                                      |
| `tsx`                                 | `4.20.3`             | `4.23.15`       | Update within current major; pre-1.0 retains minor.                                      |
| `typescript`                          | `5.8.3`              | `5.8.3`         | Hold: update changes sibling Parcel resolution and exceeds bundled declaration compiler. |
| `vaul`                                | `1.1.2`              | `1.1.2`         | Retain: current compatible release.                                                      |
| `vite`                                | `6.3.5`              | `6.4.4`         | Update within current major; pre-1.0 retains minor.                                      |
| `vite-plugin-dts`                     | `4.5.4`              | `4.5.4`         | Retain: current compatible release.                                                      |
| `yup`                                 | `^1.6.1`             | `1.7.1`         | Update within current major; pre-1.0 retains minor.                                      |
| `zod`                                 | `^3.25.72`           | `3.25.76`       | Update within current major; pre-1.0 retains minor.                                      |

## October refresh

The resumed package updates 36 additional declarations within the approved compatible lines. Root and sibling importer blocks remain byte-equivalent. The pinned Node 22.16.0 toolchain satisfies axe 4.14.0’s Node >=22.12 development requirement; consumer engine and peer declarations remain unchanged. Playwright, formatter cohort, TypeScript and SWC plugin holds still apply. September verification remains historical until the refreshed graph passes its checks.


## Review remediation, October 18

The input corrections are integrated through ordinary merge commits, retaining
published history. Application peers, optional RHF metadata and exports stay
unchanged. Root workspace overrides now pin compatible repairs for the named
review paths: Lodash and lodash-es 4.18.1, tar 7.5.22, Babel runtime 7.29.10.
The lockfile retains all other package versions except tar's required child
change and newly unused transitive nodes. This is bounded maintenance of the
supplied advisory paths, not a repository-wide security assessment or a claim
that every advisory is exploitable or closed. Formik remains available in v5.

Lodash's template-import advisory requires untrusted import keys; Formik uses
Lodash field-path/collection helpers rather than compiling templates. Retaining
Formik's public API does not freeze its transitive security maintenance.
The tar path belongs to installation/build tooling; Babel runtime is reachable
through Recharts animation support. Workspace overrides protect this checked-in
build graph; they do not become a consumer's global dependency policy. Packed
consumer graph checks and version-specific fixture locks remain release gates.

Sources: [Lodash advisory](https://github.com/lodash/lodash/security/advisories/GHSA-r5fr-rjxr-66jc),
[Babel advisory](https://github.com/advisories/GHSA-968p-4wvh-cqc8),
[tar releases](https://github.com/isaacs/node-tar/releases).
