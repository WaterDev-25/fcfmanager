(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{5458:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/account",function(){return n(4851)}])},10:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var a=n(5893),s=n(9111),i=n.n(s),c=n(3356),o=n(1664),r=n.n(o),l=n(7814),u=n(9417);let d=new c.Z;function p(e){let{user:t}=e,n=async()=>{d.get("token")&&d.remove("token")};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:i().nav,id:i().nav,children:[(0,a.jsx)(r(),{href:"/",className:i().active,children:"Home"}),(0,a.jsx)(r(),{href:"/account",children:"Account"}),99==t.ranks&&(0,a.jsx)(r(),{href:"#",children:"Admin"}),(0,a.jsx)(r(),{href:"/",onClick:n,children:"Logout"}),(0,a.jsx)(r(),{href:"javascript:void(0);",className:i().icon,onClick:()=>{var e=document.getElementById(i().nav);e.className===i().nav?e.className+=" ".concat(i().responsive):e.className=i().nav},children:(0,a.jsx)(l.G,{icon:u.xiG})})]})})}},4851:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var a=n(5893),s=n(9008),i=n.n(s),c=n(1907),o=n.n(c),r=n(10),l=n(7294),u=n(1163),d=n.n(u),p=n(3356),m=n(6154);let h=new p.Z;function v(){let[e,t]=(0,l.useState)(""),[n,s]=(0,l.useState)({}),[c,u]=(0,l.useState)(),[p,v]=(0,l.useState)(),[f,_]=(0,l.useState)(),[x,g]=(0,l.useState)(),[j,N]=(0,l.useState)(),[k,y]=(0,l.useState)(),[C,w]=(0,l.useState)();(0,l.useEffect)(()=>{let e=h.get("token");t(e),e||d().push("/"),m.Z.defaults.headers.common.Authorization="Bearer ".concat(e),m.Z.get("/api/user/@me").then(e=>{s(e.data)})},[]);let A=async e=>{e.preventDefault();let t=C;C&&(t=parseInt(C)),await m.Z.patch("/api/user/@me",{indicative:c,password:p,city:f,postalCode:x,address:j,description:k,ranks:t}).then(e=>{console.log(e.data)})};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(i(),{children:[(0,a.jsx)("title",{children:"FCFM"}),(0,a.jsx)("meta",{name:"description",content:"Indicative manager"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,a.jsxs)("main",{className:o().main,children:[(0,a.jsx)(r.Z,{user:n}),(0,a.jsx)("h1",{className:o().title,children:"Update informations"}),(0,a.jsx)("div",{className:o().form_container,children:(0,a.jsxs)("form",{className:o().form,onSubmit:A,children:[99==n.ranks&&(0,a.jsx)("input",{className:o().inputfield,type:"text",placeholder:"Indicative",value:c,onChange:e=>u(e.target.value)}),(0,a.jsx)("input",{className:o().inputfield,type:"password",placeholder:"Password",value:p,onChange:e=>v(e.target.value)}),(0,a.jsx)("input",{className:o().inputfield,type:"text",placeholder:"City",value:f,onChange:e=>_(e.target.value)}),(0,a.jsx)("input",{className:o().inputfield,type:"text",placeholder:"Postal code",value:x,onChange:e=>g(e.target.value)}),(0,a.jsx)("input",{className:o().inputfield,type:"text",placeholder:"Address",value:j,onChange:e=>N(e.target.value)}),(0,a.jsx)("input",{className:o().inputfield,type:"text",placeholder:"Description",value:k,onChange:e=>y(e.target.value)}),99==n.ranks&&(0,a.jsx)("input",{className:o().inputfield,type:"text",placeholder:"Ranks",value:C,onChange:e=>w(e.target.value)}),(0,a.jsx)("input",{type:"submit",value:"Update",className:o().submit})]})})]})]})}},1907:function(e){e.exports={title:"Account_title__Pzcco",form_container:"Account_form_container__QWrSd",form:"Account_form__gAiZR",inputfield:"Account_inputfield__To_81",submit:"Account_submit__bwOVy"}},9111:function(e){e.exports={nav:"Navigation_nav__facdA",active:"Navigation_active__Ru7xI",icon:"Navigation_icon__G3bAn",responsive:"Navigation_responsive__M_irT"}}},function(e){e.O(0,[976,458,764,774,888,179],function(){return e(e.s=5458)}),_N_E=e.O()}]);