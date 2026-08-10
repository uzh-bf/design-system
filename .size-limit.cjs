const path = require("node:path");

const dist = path.resolve(__dirname, "packages/design-system/dist");
const entry = (file) => path.join(dist, file);
const common = { running: false };

module.exports = [
  {
    name: "root Button",
    path: entry("index.js"),
    import: { [entry("index.js")]: "{ Button }" },
    limit: "32 kB",
    ...common,
  },
  {
    name: "primitives Button",
    path: entry("primitives.js"),
    import: { [entry("primitives.js")]: "{ Button }" },
    limit: "12 kB",
    ...common,
  },
  {
    name: "design-system CSS",
    path: entry("design-system.css"),
    webpack: false,
    limit: "30 kB",
    ...common,
  },
  {
    name: "preflight CSS",
    path: entry("preflight.css"),
    webpack: false,
    limit: "3 kB",
    ...common,
  },
  {
    name: "Calendar positive control",
    path: entry("index.js"),
    import: { [entry("index.js")]: "{ Calendar }" },
    limit: "33 kB",
    ...common,
  },
  {
    name: "Chart positive control",
    path: entry("index.js"),
    import: { [entry("index.js")]: "{ ChartContainer }" },
    limit: "34 kB",
    ...common,
  },
  {
    name: "Carousel positive control",
    path: entry("index.js"),
    import: { [entry("index.js")]: "{ Carousel }" },
    limit: "18 kB",
    ...common,
  },
];
