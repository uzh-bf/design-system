import{r as l}from"./index-BCoiEVQ_.js";var I=function(e){if(typeof document>"u")return null;var n=Array.isArray(e)?e[0]:e;return n.ownerDocument.body},d=new WeakMap,g=new WeakMap,y={},w=0,_=function(e){return e&&(e.host||_(e.parentNode))},N=function(e,n){return n.map(function(t){if(e.contains(t))return t;var r=_(t);return r&&e.contains(r)?r:(console.error("aria-hidden",t,"in not contained inside",e,". Doing nothing"),null)}).filter(function(t){return!!t})},P=function(e,n,t,r){var a=N(n,Array.isArray(e)?e:[e]);y[t]||(y[t]=new WeakMap);var o=y[t],u=[],i=new Set,b=new Set(a),p=function(c){!c||i.has(c)||(i.add(c),p(c.parentNode))};a.forEach(p);var s=function(c){!c||b.has(c)||Array.prototype.forEach.call(c.children,function(f){if(i.has(f))s(f);else try{var h=f.getAttribute(r),x=h!==null&&h!=="false",k=(d.get(f)||0)+1,O=(o.get(f)||0)+1;d.set(f,k),o.set(f,O),u.push(f),k===1&&x&&g.set(f,!0),O===1&&f.setAttribute(t,"true"),x||f.setAttribute(r,"true")}catch(j){console.error("aria-hidden: cannot operate on ",f,j)}})};return s(n),i.clear(),w++,function(){u.forEach(function(c){var f=d.get(c)-1,h=o.get(c)-1;d.set(c,f),o.set(c,h),f||(g.has(c)||c.removeAttribute(r),g.delete(c)),h||c.removeAttribute(t)}),w--,w||(d=new WeakMap,d=new WeakMap,g=new WeakMap,y={})}},re=function(e,n,t){t===void 0&&(t="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),a=I(e);return a?(r.push.apply(r,Array.from(a.querySelectorAll("[aria-live]"))),P(r,a,t,"aria-hidden")):function(){return null}},m=function(){return m=Object.assign||function(n){for(var t,r=1,a=arguments.length;r<a;r++){t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o])}return n},m.apply(this,arguments)};function T(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)n.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(t[r[a]]=e[r[a]]);return t}function ae(e,n,t){if(t||arguments.length===2)for(var r=0,a=n.length,o;r<a;r++)(o||!(r in n))&&(o||(o=Array.prototype.slice.call(n,0,r)),o[r]=n[r]);return e.concat(o||Array.prototype.slice.call(n))}var S="right-scroll-bar-position",E="width-before-scroll-bar",z="with-scroll-bars-hidden",B="--removed-body-scroll-bar-size";function A(e,n){return typeof e=="function"?e(n):e&&(e.current=n),e}function L(e,n){var t=l.useState(function(){return{value:e,callback:n,facade:{get current(){return t.value},set current(r){var a=t.value;a!==r&&(t.value=r,t.callback(r,a))}}}})[0];return t.callback=n,t.facade}var V=typeof window<"u"?l.useLayoutEffect:l.useEffect,M=new WeakMap;function oe(e,n){var t=L(null,function(r){return e.forEach(function(a){return A(a,r)})});return V(function(){var r=M.get(t);if(r){var a=new Set(r),o=new Set(e),u=t.current;a.forEach(function(i){o.has(i)||A(i,null)}),o.forEach(function(i){a.has(i)||A(i,u)})}M.set(t,e)},[e]),t}function D(e){return e}function G(e,n){n===void 0&&(n=D);var t=[],r=!1,a={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return t.length?t[t.length-1]:e},useMedium:function(o){var u=n(o,r);return t.push(u),function(){t=t.filter(function(i){return i!==u})}},assignSyncMedium:function(o){for(r=!0;t.length;){var u=t;t=[],u.forEach(o)}t={push:function(i){return o(i)},filter:function(){return t}}},assignMedium:function(o){r=!0;var u=[];if(t.length){var i=t;t=[],i.forEach(o),u=t}var b=function(){var s=u;u=[],s.forEach(o)},p=function(){return Promise.resolve().then(b)};p(),t={push:function(s){u.push(s),p()},filter:function(s){return u=u.filter(s),t}}}};return a}function ie(e){e===void 0&&(e={});var n=G(null);return n.options=m({async:!0,ssr:!1},e),n}var R=function(e){var n=e.sideCar,t=T(e,["sideCar"]);if(!n)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=n.read();if(!r)throw new Error("Sidecar medium not found");return l.createElement(r,m({},t))};R.isSideCarExport=!0;function ue(e,n){return e.useMedium(n),R}var Q=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function q(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var n=Q();return n&&e.setAttribute("nonce",n),e}function F(e,n){e.styleSheet?e.styleSheet.cssText=n:e.appendChild(document.createTextNode(n))}function H(e){var n=document.head||document.getElementsByTagName("head")[0];n.appendChild(e)}var K=function(){var e=0,n=null;return{add:function(t){e==0&&(n=q())&&(F(n,t),H(n)),e++},remove:function(){e--,!e&&n&&(n.parentNode&&n.parentNode.removeChild(n),n=null)}}},U=function(){var e=K();return function(n,t){l.useEffect(function(){return e.add(n),function(){e.remove()}},[n&&t])}},J=function(){var e=U(),n=function(t){var r=t.styles,a=t.dynamic;return e(r,a),null};return n},X={left:0,top:0,right:0,gap:0},C=function(e){return parseInt(e||"",10)||0},Y=function(e){var n=window.getComputedStyle(document.body),t=n[e==="padding"?"paddingLeft":"marginLeft"],r=n[e==="padding"?"paddingTop":"marginTop"],a=n[e==="padding"?"paddingRight":"marginRight"];return[C(t),C(r),C(a)]},Z=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return X;var n=Y(e),t=document.documentElement.clientWidth,r=window.innerWidth;return{left:n[0],top:n[1],right:n[2],gap:Math.max(0,r-t+n[2]-n[0])}},$=J(),v="data-scroll-locked",ee=function(e,n,t,r){var a=e.left,o=e.top,u=e.right,i=e.gap;return t===void 0&&(t="margin"),`
  .`.concat(z,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(i,"px ").concat(r,`;
  }
  body[`).concat(v,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([n&&"position: relative ".concat(r,";"),t==="margin"&&`
    padding-left: `.concat(a,`px;
    padding-top: `).concat(o,`px;
    padding-right: `).concat(u,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(r,`;
    `),t==="padding"&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(S,` {
    right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(E,` {
    margin-right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(S," .").concat(S,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(E," .").concat(E,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(v,`] {
    `).concat(B,": ").concat(i,`px;
  }
`)},W=function(){var e=parseInt(document.body.getAttribute(v)||"0",10);return isFinite(e)?e:0},te=function(){l.useEffect(function(){return document.body.setAttribute(v,(W()+1).toString()),function(){var e=W()-1;e<=0?document.body.removeAttribute(v):document.body.setAttribute(v,e.toString())}},[])},ce=function(e){var n=e.noRelative,t=e.noImportant,r=e.gapMode,a=r===void 0?"margin":r;te();var o=l.useMemo(function(){return Z(a)},[a]);return l.createElement($,{styles:ee(o,!n,a,t?"":"!important")})};export{ce as R,T as _,m as a,ae as b,ie as c,ue as e,E as f,re as h,J as s,oe as u,S as z};
