import{j as a,u as l}from"./index-h_1IaV-A.js";import"./dialog-C9fALSzh.js";import{t as r}from"./bundle-mjs-yGZq-iow.js";function i({id:s,data:e,className:t,label:o=""}){return a.jsx("div",{id:s,"data-cy":e==null?void 0:e.cy,"data-test":e==null?void 0:e.test,className:r("w-max rounded bg-slate-100 px-2 py-1 text-sm text-slate-700",t==null?void 0:t.root),children:o})}const p=()=>a.jsx(i,{label:"Default Tag"});function n(s){const e={code:"code",li:"li",p:"p",ul:"ul",...l(),...s.components};return a.jsxs(a.Fragment,{children:[`
`,a.jsxs("div",{className:"prose prose-sm max-w-none",children:[a.jsxs(e.p,{className:"ladle-markdown",children:["The ",a.jsx(e.code,{className:"ladle-markdown",children:"Tag"})," component provides a simple, consistent way to display labels, categories, or status indicators. It offers clean styling with customization options and maintains accessibility standards throughout your interface."]}),a.jsx(e.p,{className:"ladle-markdown",children:"Use this component when you need to:"}),a.jsxs(e.ul,{className:"ladle-markdown",children:[`
`,a.jsx(e.li,{className:"ladle-markdown",children:"Display categories, topics, or classification labels"}),`
`,a.jsx(e.li,{className:"ladle-markdown",children:"Show status indicators or metadata"}),`
`,a.jsx(e.li,{className:"ladle-markdown",children:"Create content tags for articles or posts"}),`
`,a.jsx(e.li,{className:"ladle-markdown",children:"Label items in lists or cards"}),`
`,a.jsx(e.li,{className:"ladle-markdown",children:"Build filter or selection interfaces"}),`
`]}),a.jsx(e.p,{className:"ladle-markdown",children:"The component provides consistent typography, proper spacing, customizable styling through className overrides, and standard testing attributes for reliable automation."}),a.jsx(e.p,{className:"ladle-markdown",children:"The Tag component accepts the following props:"}),a.jsxs(e.ul,{className:"ladle-markdown",children:[`
`,a.jsx(e.li,{className:"ladle-markdown",children:"@param id - The id of the tag."}),`
`,a.jsx(e.li,{className:"ladle-markdown",children:"@param data - The object of data attributes that can be used for testing (e.g. data-test or data-cy)"}),`
`,a.jsx(e.li,{className:"ladle-markdown",children:"@param label - The label of the tag."}),`
`,a.jsx(e.li,{className:"ladle-markdown",children:"@param className - The optional className object allows you to override the default styling."}),`
`]})]}),`
`,`
`]})}function d(s={}){const{wrapper:e}={...l(),...s.components};return e?a.jsx(e,{...s,children:a.jsx(n,{...s})}):n(s)}d.storyName="Readme";typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{p as Default,d as MDXContent};
