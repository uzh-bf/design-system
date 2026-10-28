const path = require("node:path");

const dist = path.resolve(__dirname, "packages/design-system/dist");
const entry = (file) => path.join(dist, file);
module.exports = [
  {
    name: "root Button",
    path: entry("index.js"),
    import: { [entry("index.js")]: "{ Button }" },
    limit: "32 kB",
  },
  {
    name: "primitives Button",
    path: entry("primitives.js"),
    import: { [entry("primitives.js")]: "{ Button }" },
    limit: "12 kB",
  },
  {
    name: "design-system CSS",
    path: entry("design-system.css"),
    webpack: false,
    limit: "34 kB",
  },
  {
    name: "preflight CSS",
    path: entry("preflight.css"),
    webpack: false,
    limit: "3 kB",
  },
  {
    name: "Calendar positive control",
    path: entry("index.js"),
    import: { [entry("index.js")]: "{ Calendar }" },
    limit: "33 kB",
  },
  {
    name: "Chart positive control",
    path: entry("index.js"),
    import: { [entry("index.js")]: "{ ChartContainer }" },
    limit: "34 kB",
  },
  {
    name: "Carousel positive control",
    path: entry("index.js"),
    import: { [entry("index.js")]: "{ Carousel }" },
    limit: "18 kB",
  },
];
