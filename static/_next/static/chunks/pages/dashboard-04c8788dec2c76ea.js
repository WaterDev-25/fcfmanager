(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[26],{1075:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard",function(){return r(189)}])},3991:function(e,t){"use strict";var r,n;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{PrefetchKind:function(){return r},ACTION_REFRESH:function(){return o},ACTION_NAVIGATE:function(){return a},ACTION_RESTORE:function(){return i},ACTION_SERVER_PATCH:function(){return l},ACTION_PREFETCH:function(){return s},ACTION_FAST_REFRESH:function(){return c},ACTION_SERVER_ACTION:function(){return u}});let o="refresh",a="navigate",i="restore",l="server-patch",s="prefetch",c="fast-refresh",u="server-action";(n=r||(r={})).AUTO="auto",n.FULL="full",n.TEMPORARY="temporary",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1516:function(e,t,r){"use strict";function n(e,t,r,n){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),r(2387),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5569:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return g}});let n=r(8754),o=n._(r(7294)),a=r(4532),i=r(3353),l=r(1410),s=r(9064),c=r(370),u=r(9955),f=r(4224),p=r(508),d=r(1516),b=r(4266),y=r(3991),h=new Set;function m(e,t,r,n,o,a){if(!a&&!(0,i.isLocalURL)(t))return;if(!n.bypassPrefetchedCheck){let o=void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0,a=t+"%"+r+"%"+o;if(h.has(a))return;h.add(a)}let l=a?e.prefetch(t,o):e.prefetch(t,r,n);Promise.resolve(l).catch(e=>{})}function v(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}let O=o.default.forwardRef(function(e,t){let r,n;let{href:l,as:h,children:O,prefetch:g=null,passHref:_,replace:j,shallow:x,scroll:k,locale:P,onClick:E,onMouseEnter:C,onTouchStart:T,legacyBehavior:A=!1,...I}=e;r=O,A&&("string"==typeof r||"number"==typeof r)&&(r=o.default.createElement("a",null,r));let N=o.default.useContext(u.RouterContext),w=o.default.useContext(f.AppRouterContext),S=null!=N?N:w,R=!N,M=!1!==g,L=null===g?y.PrefetchKind.AUTO:y.PrefetchKind.FULL,{href:F,as:D}=o.default.useMemo(()=>{if(!N){let e=v(l);return{href:e,as:h?v(h):e}}let[e,t]=(0,a.resolveHref)(N,l,!0);return{href:e,as:h?(0,a.resolveHref)(N,h):t||e}},[N,l,h]),U=o.default.useRef(F),z=o.default.useRef(D);A&&(n=o.default.Children.only(r));let H=A?n&&"object"==typeof n&&n.ref:t,[K,W,Z]=(0,p.useIntersection)({rootMargin:"200px"}),B=o.default.useCallback(e=>{(z.current!==D||U.current!==F)&&(Z(),z.current=D,U.current=F),K(e),H&&("function"==typeof H?H(e):"object"==typeof H&&(H.current=e))},[D,H,F,Z,K]);o.default.useEffect(()=>{S&&W&&M&&m(S,F,D,{locale:P},{kind:L},R)},[D,F,W,P,M,null==N?void 0:N.locale,S,R,L]);let V={ref:B,onClick(e){A||"function"!=typeof E||E(e),A&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),S&&!e.defaultPrevented&&function(e,t,r,n,a,l,s,c,u,f){let{nodeName:p}=e.currentTarget,d="A"===p.toUpperCase();if(d&&(function(e){let t=e.currentTarget,r=t.getAttribute("target");return r&&"_self"!==r||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!u&&!(0,i.isLocalURL)(r)))return;e.preventDefault();let b=()=>{let e=null==s||s;"beforePopState"in t?t[a?"replace":"push"](r,n,{shallow:l,locale:c,scroll:e}):t[a?"replace":"push"](n||r,{forceOptimisticNavigation:!f,scroll:e})};u?o.default.startTransition(b):b()}(e,S,F,D,j,x,k,P,R,M)},onMouseEnter(e){A||"function"!=typeof C||C(e),A&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),S&&(M||!R)&&m(S,F,D,{locale:P,priority:!0,bypassPrefetchedCheck:!0},{kind:L},R)},onTouchStart(e){A||"function"!=typeof T||T(e),A&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),S&&(M||!R)&&m(S,F,D,{locale:P,priority:!0,bypassPrefetchedCheck:!0},{kind:L},R)}};if((0,s.isAbsoluteUrl)(D))V.href=D;else if(!A||_||"a"===n.type&&!("href"in n.props)){let e=void 0!==P?P:null==N?void 0:N.locale,t=(null==N?void 0:N.isLocaleDomain)&&(0,d.getDomainLocale)(D,e,null==N?void 0:N.locales,null==N?void 0:N.domainLocales);V.href=t||(0,b.addBasePath)((0,c.addLocale)(D,e,null==N?void 0:N.defaultLocale))}return A?o.default.cloneElement(n,V):o.default.createElement("a",{...I,...V},r)}),g=O;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},508:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return s}});let n=r(7294),o=r(29),a="function"==typeof IntersectionObserver,i=new Map,l=[];function s(e){let{rootRef:t,rootMargin:r,disabled:s}=e,c=s||!a,[u,f]=(0,n.useState)(!1),p=(0,n.useRef)(null),d=(0,n.useCallback)(e=>{p.current=e},[]);(0,n.useEffect)(()=>{if(a){if(c||u)return;let e=p.current;if(e&&e.tagName){let n=function(e,t,r){let{id:n,observer:o,elements:a}=function(e){let t;let r={root:e.root||null,margin:e.rootMargin||""},n=l.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=i.get(n)))return t;let o=new Map,a=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e);return t={id:r,observer:a,elements:o},l.push(r),i.set(r,t),t}(r);return a.set(e,t),o.observe(e),function(){if(a.delete(e),o.unobserve(e),0===a.size){o.disconnect(),i.delete(n);let e=l.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&l.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:r});return n}}else if(!u){let e=(0,o.requestIdleCallback)(()=>f(!0));return()=>(0,o.cancelIdleCallback)(e)}},[c,r,t,u,p.current]);let b=(0,n.useCallback)(()=>{f(!1)},[]);return[d,u,b]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},189:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return F}});var n=r(5893),o=r(9008),a=r.n(o),i=r(9906),l=r.n(i),s=r(9111),c=r.n(s),u=r(3356),f=r(1664),p=r.n(f),d=r(3636),b=r(5697),y=r.n(b),h=r(7294);function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach(function(t){g(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function O(e){return(O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function g(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function _(e){return function(e){if(Array.isArray(e))return j(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if("Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return j(e,t)}}(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function x(e){var t;return(t=e-0)==t?e:(e=e.replace(/[\-_\s]+(.)?/g,function(e,t){return t?t.toUpperCase():""})).substr(0,1).toLowerCase()+e.substr(1)}var k=["style"],P=!1;try{P=!0}catch(e){}function E(e){return e&&"object"===O(e)&&e.prefix&&e.iconName&&e.icon?e:d.Qc.icon?d.Qc.icon(e):null===e?null:e&&"object"===O(e)&&e.prefix&&e.iconName?e:Array.isArray(e)&&2===e.length?{prefix:e[0],iconName:e[1]}:"string"==typeof e?{prefix:"fas",iconName:e}:void 0}function C(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?g({},e,t):{}}var T=h.forwardRef(function(e,t){var r,n,o,a,i,l,s,c,u,f,p,b,y,h,m,O,j,x,k,I=e.icon,N=e.mask,w=e.symbol,S=e.className,R=e.title,M=e.titleId,L=e.maskId,F=E(I),D=C("classes",[].concat(_((n=e.beat,o=e.fade,a=e.beatFade,i=e.bounce,l=e.shake,s=e.flash,c=e.spin,u=e.spinPulse,f=e.spinReverse,p=e.pulse,b=e.fixedWidth,y=e.inverse,h=e.border,m=e.listItem,O=e.flip,j=e.size,x=e.rotation,k=e.pull,g(r={"fa-beat":n,"fa-fade":o,"fa-beat-fade":a,"fa-bounce":i,"fa-shake":l,"fa-flash":s,"fa-spin":c,"fa-spin-reverse":f,"fa-spin-pulse":u,"fa-pulse":p,"fa-fw":b,"fa-inverse":y,"fa-border":h,"fa-li":m,"fa-flip":!0===O,"fa-flip-horizontal":"horizontal"===O||"both"===O,"fa-flip-vertical":"vertical"===O||"both"===O},"fa-".concat(j),null!=j),g(r,"fa-rotate-".concat(x),null!=x&&0!==x),g(r,"fa-pull-".concat(k),null!=k),g(r,"fa-swap-opacity",e.swapOpacity),Object.keys(r).map(function(e){return r[e]?e:null}).filter(function(e){return e}))),_(S.split(" ")))),U=C("transform","string"==typeof e.transform?d.Qc.transform(e.transform):e.transform),z=C("mask",E(N)),H=(0,d.qv)(F,v(v(v(v({},D),U),z),{},{symbol:w,title:R,titleId:M,maskId:L}));if(!H)return!function(){if(!P&&console&&"function"==typeof console.error){var e;(e=console).error.apply(e,arguments)}}("Could not find icon",F),null;var K={ref:t};return Object.keys(e).forEach(function(t){T.defaultProps.hasOwnProperty(t)||(K[t]=e[t])}),A(H.abstract[0],K)});T.displayName="FontAwesomeIcon",T.propTypes={beat:y().bool,border:y().bool,beatFade:y().bool,bounce:y().bool,className:y().string,fade:y().bool,flash:y().bool,mask:y().oneOfType([y().object,y().array,y().string]),maskId:y().string,fixedWidth:y().bool,inverse:y().bool,flip:y().oneOf([!0,!1,"horizontal","vertical","both"]),icon:y().oneOfType([y().object,y().array,y().string]),listItem:y().bool,pull:y().oneOf(["right","left"]),pulse:y().bool,rotation:y().oneOf([0,90,180,270]),shake:y().bool,size:y().oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:y().bool,spinPulse:y().bool,spinReverse:y().bool,symbol:y().oneOfType([y().bool,y().string]),title:y().string,titleId:y().string,transform:y().oneOfType([y().string,y().object]),swapOpacity:y().bool},T.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var A=(function e(t,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof r)return r;var o=(r.children||[]).map(function(r){return e(t,r)}),a=Object.keys(r.attributes||{}).reduce(function(e,t){var n=r.attributes[t];switch(t){case"class":e.attrs.className=n,delete r.attributes.class;break;case"style":e.attrs.style=n.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,t){var r=t.indexOf(":"),n=x(t.slice(0,r)),o=t.slice(r+1).trim();return n.startsWith("webkit")?e[n.charAt(0).toUpperCase()+n.slice(1)]=o:e[n]=o,e},{});break;default:0===t.indexOf("aria-")||0===t.indexOf("data-")?e.attrs[t.toLowerCase()]=n:e.attrs[x(t)]=n}return e},{attrs:{}}),i=n.style,l=void 0===i?{}:i,s=function(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(n,k);return a.attrs.style=v(v({},a.attrs.style),l),t.apply(void 0,[r.tag,v(v({},a.attrs),s)].concat(_(o)))}).bind(null,h.createElement),I=r(9417);let N=new u.Z;function w(){let e=async()=>{N.get("token")&&N.remove("token")};return(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:c().nav,id:c().nav,children:[(0,n.jsx)(p(),{href:"#",className:c().active,children:"Home"}),(0,n.jsx)(p(),{href:"#",children:"Account"}),(0,n.jsx)(p(),{href:"#",children:"Admin"}),(0,n.jsx)(p(),{href:"/",onClick:e,children:"Logout"}),(0,n.jsx)(p(),{href:"javascript:void(0);",className:c().icon,onClick:()=>{var e=document.getElementById(c().nav);e.className===c().nav?e.className+=" ".concat(c().responsive):e.className=c().nav},children:(0,n.jsx)(T,{icon:I.xiG})})]})})}var S=r(1163),R=r.n(S),M=r(6154);let L=new u.Z;function F(){let[e,t]=(0,h.useState)(""),[r,o]=(0,h.useState)([]);return(0,h.useEffect)(()=>{let e=L.get("token");t(e),e||R().push("/"),M.Z.defaults.headers.common.Authorization="Bearer ".concat(e),M.Z.get("/api/user/").then(e=>{o(e.data),console.log(e.data)})},[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(a(),{children:[(0,n.jsx)("title",{children:"FCFM"}),(0,n.jsx)("meta",{name:"description",content:"Indicative manager"}),(0,n.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.jsxs)("main",{className:l().main,children:[(0,n.jsx)(w,{}),(0,n.jsx)("h1",{className:l().title,children:"List of users"}),0!==r.length&&(0,n.jsx)("table",{className:l().users,children:r.map((e,t)=>(0,n.jsxs)("tr",{className:1==e.ranks?l().user:l().admin,children:[(0,n.jsx)("th",{children:e.id}),(0,n.jsx)("th",{children:e.indicative}),(0,n.jsx)("th",{children:e.city}),(0,n.jsx)("th",{children:e.address}),(0,n.jsx)("th",{children:e.description})]},t))})]})]})}},9906:function(e){e.exports={title:"Dashboard_title__cl9_F",users:"Dashboard_users__5esE1",user:"Dashboard_user__JkZEj",admin:"Dashboard_admin__wSotd"}},9111:function(e){e.exports={nav:"Navigation_nav__facdA",active:"Navigation_active__Ru7xI",icon:"Navigation_icon__G3bAn",responsive:"Navigation_responsive__M_irT"}},1664:function(e,t,r){e.exports=r(5569)},2703:function(e,t,r){"use strict";var n=r(414);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,a,i){if(i!==n){var l=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw l.name="Invariant Violation",l}}function t(){return e}e.isRequired=e;var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return r.PropTypes=r,r}},5697:function(e,t,r){e.exports=r(2703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}},function(e){e.O(0,[976,458,774,888,179],function(){return e(e.s=1075)}),_N_E=e.O()}]);