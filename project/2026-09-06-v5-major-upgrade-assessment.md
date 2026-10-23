# Later-major upgrade assessment

## Superseding scope ruling — 2026-10-23

The version holds below describe the completed compatible-remediation scope.
The user now requires full official shadcn Radix capabilities and auxiliary
integrations before v5 GA. [The current source/dependency matrix](2026-09-06-v5-shadcn-assessment.md#auxiliary-dependency-matrix)
therefore requires pre-GA compatibility decisions for relevant Calendar,
Resizable, Chart and Sonner migrations. In particular, current Chart source
requires Recharts 3; “later major” cannot silently defer that requirement.

Choose exact tested targets and preserve existing public contracts through
adapters where needed. This is not authority to install every latest major,
raise consumer peer minimums or migrate unrelated tooling. Zod/build/lint majors
retain their separate justification. The [GA roadmap](2026-08-10-v5-ga-readiness-roadmap.md#next-implementation-packages)
owns the new package sequence; no dependency was changed by this reconciliation.

The compatible layer preserves current majors. These dispositions reflect the October 17 registry refresh, not a blanket claim of latest-version parity. The following migrations have concrete public or build implications and are not installed by this plan.

| Family                                        | Local exposure, opportunity and migration requirement                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DayPicker 10                                  | DatePicker, DateRangePicker, DatetimePicker and ui/calendar expose DayPicker behavior or types. Version 10 removes deprecated navigation, focus and component aliases. Retain 9.14.0; before a major migration, audit consumer type compatibility and custom calendar styling, then verify keyboard, range selection and mobile popovers. [Release and migration details](https://github.com/gpbl/react-day-picker/releases/tag/v10.0.0).   |
| Resizable Panels 4                            | ui/resizable directly uses PanelGroup and PanelResizeHandle and derives public props from them. Version 4 renames components and props, changes imperative refs and persistence, and adds flexible size units. Retain 3.0.6. A later adapter migration must explicitly preserve existing public names, percentages, keyboard resizing and saved layouts. [Migration](https://github.com/bvaughn/react-resizable-panels/releases/tag/4.0.0). |
| Recharts 3                                    | ui/chart derives tooltip/legend types and styles internal SVG classes. Version 3 changes state/customization APIs and offers accessibility enabled by default and tooltip portals. Retain 2.15.4. A separate chart migration should validate exported tooltip types, keyboard navigation, focus visibility, reduced motion and visual layout. [Release](https://github.com/recharts/recharts/releases/tag/v3.0.0).                          |
| Sonner 2                                      | Toast and ui/sonner expose ExternalToast and ToasterProps. The release description is sparse and does not establish source compatibility. Retain 1.7.4; compare types, callback timing, live announcements and themed toast rendering before migration. [Release](https://github.com/emilkowalski/sonner/releases/tag/v2.0.0).                                                                                                              |
| Zod 4                                         | The package declares Zod but the scoped src import search found no active import. Version 4 changes error customization, issue shapes and defaults. Retain pinned 3.25.76; confirm package/docs/consumer ownership before removal or migration, without adding a new validation dependency to field wrappers. [Migration guide](https://zod.dev/v4/changelog).                                                                              |
| Vite 8, SWC/declaration plugins, TypeScript 7 | These require a coordinated build and declaration-output migration. Retain Vite 6.4.4 and current plugin/compiler lines. Even TypeScript 5.9 changed a sibling Parcel peer resolution and exceeded the bundled declaration compiler, so it was held. Requalify Node requirements, plugin compatibility, RSC directives, declarations, CSS and package budgets together. [Vite migration](https://vite.dev/guide/migration).                 |
| ESLint 10 and React Hooks 7                   | Retain compatible current-major lint tooling. Major config/rule changes should be reviewed separately from component behavior to avoid repository-wide cleanup. Registry engine and peer metadata is recorded in the dated candidate inventory.                                                                                                                                                                                             |

React Hook Form 7.90.0 is the selected same-major release after the 2026-10-17 registry refresh. The earlier 7.87 release includes controller, resetField, watch and server-resolution fixes, plus opt-in opaque leaf types. Because local numeric editing subscribes to private state subjects, runtime proof at both the declared minimum 7.59 and the selected version is required; a version number alone does not prove compatibility. [Release](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.87.0).

These are scoped migration dispositions, not completion claims for later major upgrades. No consumer peer minimum is raised, and no package release is performed.
