(this["webpackJsonprecipe-domain"]=this["webpackJsonprecipe-domain"]||[]).push([[0],{100:function(e,a,n){"use strict";n.r(a);var t=n(0),c=n.n(t),s=n(22),r=n.n(s),i=(n(69),n(105)),o=n(7),l=n(28),j=n.n(l),d=n(24),p=n(111),u=n(110),b=n(108),m=n.p+"static/media/logo-removebg.e817a1fe.png",h=n(15),O=n.n(h),x=n(11),v=n(2),g=function(){var e=Object(t.useState)(!0),a=Object(d.a)(e,2),n=a[0],c=a[1];return Object(v.jsx)(p.a,{className:O.a.NavBar,expand:"md",fixed:"top",children:Object(v.jsxs)(i.a,{children:[Object(v.jsx)(x.c,{to:"/",children:Object(v.jsxs)(p.a.Brand,{children:[Object(v.jsx)("img",{src:m,alt:"logo",height:"75"}),"Recipe Domain"]})}),Object(v.jsx)(p.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(v.jsxs)(p.a.Collapse,{id:"basic-navbar-nav",children:[Object(v.jsxs)(u.a,{className:"",children:[Object(v.jsxs)(x.c,{className:O.a.NavLink,to:"/",exact:!0,activeClassName:O.a.Active,children:[Object(v.jsx)("i",{className:"fas fa-home"}),"Home"]}),Object(v.jsx)(x.c,{className:O.a.NavLink,to:"/recipes",activeClassName:O.a.Active,children:"Recipes"})]}),Object(v.jsx)(u.a,{className:"ml-auto",children:n?Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)(b.a,{title:Object(v.jsxs)("span",{children:[Object(v.jsx)("i",{className:"fa-solid fa-user"})," Account"]}),id:"basic-nav-dropdown",children:[Object(v.jsx)(b.a.Item,{as:x.c,activeClassName:O.a.Active,to:"/profile",children:"Profile Page"}),Object(v.jsx)(b.a.Item,{as:x.c,activeClassName:O.a.Active,to:"/action",children:"Another action"}),Object(v.jsx)(b.a.Item,{as:x.c,activeClassName:O.a.Active,to:"/something",children:"Something"}),Object(v.jsx)(b.a.Divider,{}),Object(v.jsxs)(b.a.Item,{onClick:function(){return c(!1)},children:[" ",Object(v.jsx)("i",{class:"fa-solid fa-right-from-bracket"}),"Sign Out"]})]})}):Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)(x.c,{className:O.a.NavLink,activeClassName:O.a.Active,to:"/signin",children:[Object(v.jsx)("i",{class:"fa-solid fa-right-to-bracket"}),"Login"]}),Object(v.jsxs)(x.c,{className:O.a.NavLink,activeClassName:O.a.Active,to:"/signup",children:[Object(v.jsx)("i",{class:"fa-solid fa-user-plus"}),"Sign Up"]})]})})]})]})})},_=function(){return Object(v.jsx)("div",{children:"Footer"})},f=n(34),N=n(43),w=n(33),I=n(35),C=n(9),S=n.n(C),B=n(26),k=n.n(B),A=n.p+"static/media/pancakes.037fd4c1.webp",F=n(106),U=n(64),y=n(109),L=n(112),P=n(63),T=n(107),W=n(44),G=n.n(W),R=function(){var e,a,n,c,s=Object(t.useState)({username:"",password1:"",password2:""}),r=Object(d.a)(s,2),i=r[0],l=r[1],p=i.username,u=i.password1,b=i.password2,m=Object(t.useState)({}),h=Object(d.a)(m,2),O=h[0],g=h[1],_=Object(o.f)(),C=function(e){l(Object(I.a)(Object(I.a)({},i),{},Object(w.a)({},e.target.name,e.target.value)))},B=function(){var e=Object(N.a)(Object(f.a)().mark((function e(a){var n;return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.prev=1,e.next=4,G.a.post("api/dj-rest-auth/registration/",i,{headers:{"Content-Type":"application/json"}});case 4:_.push("/signin"),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(1),console.error("Error during registration:",e.t0.response||e.t0),g(null===(n=e.t0.response)||void 0===n?void 0:n.data);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(a){return e.apply(this,arguments)}}();return Object(v.jsx)("div",{className:S.a.Wrapper,children:Object(v.jsxs)(F.a,{className:S.a.Row,children:[Object(v.jsxs)(U.a,{className:"my-auto p-0 text-center",md:8,children:[Object(v.jsx)("h1",{className:"".concat(S.a.Header," pb-2 pt-2"),children:"Sign Up"}),Object(v.jsxs)(y.a,{onSubmit:B,children:[Object(v.jsxs)(y.a.Group,{controlId:"username",children:[Object(v.jsx)(y.a.Label,{className:"d-none",children:"Username"}),Object(v.jsx)(y.a.Control,{className:S.a.Input,type:"text",placeholder:"Username",name:"username",value:p,onChange:C})]}),null===(e=O.username)||void 0===e?void 0:e.map((function(e,a){return Object(v.jsx)(L.a,{variant:"warning",children:e},a)})),Object(v.jsxs)(y.a.Group,{controlId:"password1",children:[Object(v.jsx)(y.a.Label,{className:"d-none",children:"Password"}),Object(v.jsx)(y.a.Control,{className:S.a.Input,type:"password",placeholder:"Password",name:"password1",value:u,onChange:C})]}),null===(a=O.password1)||void 0===a?void 0:a.map((function(e,a){return Object(v.jsx)(L.a,{variant:"warning",children:e},a)})),Object(v.jsxs)(y.a.Group,{controlId:"password2",children:[Object(v.jsx)(y.a.Label,{className:"d-none",children:"Confirm Password"}),Object(v.jsx)(y.a.Control,{className:S.a.Input,type:"password",placeholder:"Confirm Password",name:"password2",value:b,onChange:C})]}),null===(n=O.password2)||void 0===n?void 0:n.map((function(e,a){return Object(v.jsx)(L.a,{variant:"warning",children:e},a)})),Object(v.jsx)(P.a,{className:"".concat(k.a.Button," ").concat(k.a.Wide," ").concat(k.a.Yellow," mt-2 mb-2"),type:"submit",children:"Sign Up"}),null===(c=O.non_field_errors)||void 0===c?void 0:c.map((function(e,a){return Object(v.jsx)(L.a,{variant:"warning",className:"mt-3",children:e},a)}))]}),Object(v.jsxs)(x.b,{className:"".concat(S.a.Link," mt-4 mb-1"),to:"/signin",children:["Already have an account? ",Object(v.jsx)("span",{children:"Sign in"})]})]}),Object(v.jsx)(U.a,{md:4,className:"my-auto d-none d-md-block p-0 ".concat(S.a.SignUpCol),children:Object(v.jsx)(T.a,{className:"".concat(j.a.FillerImage),src:A})})]})})},D=function(){var e,a,n,c=Object(t.useState)({username:"",password:""}),s=Object(d.a)(c,2),r=s[0],i=s[1],l=r.username,p=r.password,u=Object(t.useState)({}),b=Object(d.a)(u,2),m=b[0],h=b[1],O=Object(o.f)(),g=function(e){i(Object(I.a)(Object(I.a)({},r),{},Object(w.a)({},e.target.name,e.target.value)))},_=function(){var e=Object(N.a)(Object(f.a)().mark((function e(a){var n;return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),e.prev=1,e.next=4,G.a.post("api/dj-rest-auth/login/",r);case 4:O.push("/"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),h(null===(n=e.t0.response)||void 0===n?void 0:n.data);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(a){return e.apply(this,arguments)}}();return Object(v.jsx)("div",{className:S.a.Wrapper,children:Object(v.jsxs)(F.a,{className:S.a.Row,children:[Object(v.jsxs)(U.a,{className:"my-auto p-0 text-center",md:8,children:[Object(v.jsx)("h1",{className:"".concat(S.a.Header," pb-2 pt-2"),children:"Sign In"}),Object(v.jsxs)(y.a,{onSubmit:_,children:[Object(v.jsxs)(y.a.Group,{controlId:"username",children:[Object(v.jsx)(y.a.Label,{className:"d-none",children:"Username"}),Object(v.jsx)(y.a.Control,{className:S.a.Input,type:"text",placeholder:"Username",name:"username",value:l,onChange:g})]}),null===(e=m.username)||void 0===e?void 0:e.map((function(e,a){return Object(v.jsx)(L.a,{variant:"warning",children:e},a)})),Object(v.jsxs)(y.a.Group,{controlId:"password",children:[Object(v.jsx)(y.a.Label,{className:"d-none",children:"Password"}),Object(v.jsx)(y.a.Control,{className:S.a.Input,type:"password",placeholder:"Password",name:"password",value:p,onChange:g})]}),null===(a=m.password)||void 0===a?void 0:a.map((function(e,a){return Object(v.jsx)(L.a,{variant:"warning",children:e},a)})),Object(v.jsx)(P.a,{className:"".concat(k.a.Button," ").concat(k.a.Wide," ").concat(k.a.Yellow," mt-2 mb-2"),type:"submit",children:"Sign In"}),null===(n=m.non_field_errors)||void 0===n?void 0:n.map((function(e,a){return Object(v.jsx)(L.a,{variant:"warning",className:"mt-3",children:e},a)}))]}),Object(v.jsxs)(x.b,{className:"".concat(S.a.Link," mt-4 mb-1"),to:"/signup",children:["Don't have an account? ",Object(v.jsx)("span",{children:"Sign Up"})]})]}),Object(v.jsx)(U.a,{md:4,className:"my-auto d-none d-md-block p-0 ".concat(S.a.SignInCol),children:Object(v.jsx)(T.a,{className:"".concat(j.a.FillerImage),src:A})})]})})};var H=function(){return Object(v.jsxs)("div",{className:j.a.App,children:[Object(v.jsx)(g,{}),Object(v.jsx)(i.a,{className:j.a.Main,children:Object(v.jsxs)(o.c,{children:[Object(v.jsx)(o.a,{path:"/",exact:!0,render:function(){return Object(v.jsx)("h1",{children:"Welcome to the app!"})}}),Object(v.jsx)(o.a,{path:"/signin",exact:!0,render:function(){return Object(v.jsx)(D,{})}}),Object(v.jsx)(o.a,{path:"/signup",exact:!0,render:function(){return Object(v.jsx)(R,{})}}),Object(v.jsx)(o.a,{path:"/profile",exact:!0,render:function(){return Object(v.jsx)("h1",{children:"Your Profile"})}}),Object(v.jsx)(o.a,{path:"/recipes",exact:!0,render:function(){return Object(v.jsx)("h1",{children:"Recipes"})}}),Object(v.jsx)(o.a,{path:"/action",exact:!0,render:function(){return Object(v.jsx)("h1",{children:"Perform an Action"})}}),Object(v.jsx)(o.a,{path:"/something",exact:!0,render:function(){return Object(v.jsx)("h1",{children:"Something Else"})}}),Object(v.jsx)(o.a,{render:function(){return Object(v.jsx)("h1",{children:"404 Not Found"})}})]})}),Object(v.jsx)(_,{})]})},Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,113)).then((function(a){var n=a.getCLS,t=a.getFID,c=a.getFCP,s=a.getLCP,r=a.getTTFB;n(e),t(e),c(e),s(e),r(e)}))};r.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(x.a,{children:Object(v.jsx)(H,{})})}),document.getElementById("root")),Y()},15:function(e,a,n){e.exports={NavBar:"NavBar_NavBar__dhY2H",Active:"NavBar_Active__1nttR",NavLink:"NavBar_NavLink__1HAty"}},26:function(e,a,n){e.exports={Button:"Button_Button__1xnQg",Wide:"Button_Wide__43Xqo",Blue:"Button_Blue__2t5gu",BlueOutline:"Button_BlueOutline__1snG2",Yellow:"Button_Yellow__3muUT",Black:"Button_Black__jiiZ9",BlackOutline:"Button_BlackOutline__NAtMo"}},28:function(e,a,n){e.exports={App:"App_App__XwwGr","font-merriweather-sans":"App_font-merriweather-sans__2zlpB",Main:"App_Main__3IDkh",Content:"App_Content__2eThI",FillerImage:"App_FillerImage__2Jgnx",Image:"App_Image__GYcZT"}},69:function(e,a,n){},9:function(e,a,n){e.exports={Wrapper:"SignInUpForm_Wrapper__o94eQ",Row:"SignInUpForm_Row__nmqMp",Input:"SignInUpForm_Input__2qBaF",Header:"SignInUpForm_Header__1Tvq-",Link:"SignInUpForm_Link__-7El5",Container:"SignInUpForm_Container__gFiw5",SignInCol:"SignInUpForm_SignInCol__mPy2c",SignUpCol:"SignInUpForm_SignUpCol__2CTBS"}}},[[100,1,2]]]);
//# sourceMappingURL=main.5c3542d5.chunk.js.map