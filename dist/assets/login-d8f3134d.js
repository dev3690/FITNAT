import{u as $,r as l,e as E,f as T,s as C,_ as m,h as v,i as w,k,j as t,l as A,m as F,B as R,n as U,o as W,S as j,T as y,p as M,I as z,q as _,W as N}from"./index-c644ad95.js";import{Q as S,B}from"./ReactToastify-0ddb12d4.js";import{c as D,l as q}from"./api_utils-656155e4.js";import{C as G}from"./Card-24a4f5a7.js";import{D as Q}from"./Divider-72eae243.js";import{T as b}from"./TextField-df2c55e6.js";import{I as V}from"./InputAdornment-50c0534d.js";import{B as H}from"./Button-0bd2d8e6.js";import{u as J}from"./Menu-af3b1140.js";import{C as K}from"./CircularProgress-e27468e1.js";function O(){const n=$();return l.useMemo(()=>({back:()=>n(-1),forward:()=>n(1),reload:()=>window.location.reload(),push:a=>n(a),replace:a=>n(a,{replace:!0})}),[n])}function X(n){return T("MuiLoadingButton",n)}const Y=E("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),r=Y,Z=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],oo=n=>{const{loading:o,loadingPosition:a,classes:e}=n,d={root:["root",o&&"loading"],startIcon:[o&&`startIconLoading${v(a)}`],endIcon:[o&&`endIconLoading${v(a)}`],loadingIndicator:["loadingIndicator",o&&`loadingIndicator${v(a)}`]},c=A(d,X,e);return m({},e,c)},no=n=>n!=="ownerState"&&n!=="theme"&&n!=="sx"&&n!=="as"&&n!=="classes",to=C(H,{shouldForwardProp:n=>no(n)||n==="classes",name:"MuiLoadingButton",slot:"Root",overridesResolver:(n,o)=>[o.root,o.startIconLoadingStart&&{[`& .${r.startIconLoadingStart}`]:o.startIconLoadingStart},o.endIconLoadingEnd&&{[`& .${r.endIconLoadingEnd}`]:o.endIconLoadingEnd}]})(({ownerState:n,theme:o})=>m({[`& .${r.startIconLoadingStart}, & .${r.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0}},n.loadingPosition==="center"&&{transition:o.transitions.create(["background-color","box-shadow","border-color"],{duration:o.transitions.duration.short}),[`&.${r.loading}`]:{color:"transparent"}},n.loadingPosition==="start"&&n.fullWidth&&{[`& .${r.startIconLoadingStart}, & .${r.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0,marginRight:-8}},n.loadingPosition==="end"&&n.fullWidth&&{[`& .${r.startIconLoadingStart}, & .${r.endIconLoadingEnd}`]:{transition:o.transitions.create(["opacity"],{duration:o.transitions.duration.short}),opacity:0,marginLeft:-8}})),ao=C("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(n,o)=>{const{ownerState:a}=n;return[o.loadingIndicator,o[`loadingIndicator${v(a.loadingPosition)}`]]}})(({theme:n,ownerState:o})=>m({position:"absolute",visibility:"visible",display:"flex"},o.loadingPosition==="start"&&(o.variant==="outlined"||o.variant==="contained")&&{left:o.size==="small"?10:14},o.loadingPosition==="start"&&o.variant==="text"&&{left:6},o.loadingPosition==="center"&&{left:"50%",transform:"translate(-50%)",color:(n.vars||n).palette.action.disabled},o.loadingPosition==="end"&&(o.variant==="outlined"||o.variant==="contained")&&{right:o.size==="small"?10:14},o.loadingPosition==="end"&&o.variant==="text"&&{right:6},o.loadingPosition==="start"&&o.fullWidth&&{position:"relative",left:-10},o.loadingPosition==="end"&&o.fullWidth&&{position:"relative",right:-10})),io=l.forwardRef(function(o,a){const e=w({props:o,name:"MuiLoadingButton"}),{children:d,disabled:c=!1,id:h,loading:g=!1,loadingIndicator:I,loadingPosition:f="center",variant:u="text"}=e,p=k(e,Z),x=J(h),L=I??t.jsx(K,{"aria-labelledby":x,color:"inherit",size:16}),i=m({},e,{disabled:c,loading:g,loadingIndicator:L,loadingPosition:f,variant:u}),s=oo(i),P=g?t.jsx(ao,{className:s.loadingIndicator,ownerState:i,children:L}):null;return t.jsxs(to,m({disabled:c||g,id:x,ref:a},p,{variant:u,classes:s,ownerState:i,children:[i.loadingPosition==="end"?d:P,i.loadingPosition==="end"?P:d]}))}),so=io;function ro(){const n=F(),o=O(),[a,e]=l.useState(!1),[d,c]=l.useState(""),[h,g]=l.useState(""),[I,f]=l.useState(!1),[u,p]=l.useState(""),x=async()=>{var i;f(!0),p("");try{const s=await D(q,{username:d,password:h});console.log(s),s.status===200?(_("data",(i=s==null?void 0:s.data)==null?void 0:i.data),o.push("/")):(p("Invalid username or password"),B.error("Invalid username or password"))}catch{p("Invalid username or password"),B.error("Invalid username or password")}finally{f(!1)}},L=t.jsxs(t.Fragment,{children:[t.jsxs(j,{spacing:3,children:[t.jsx(b,{name:"Username",label:"Username",value:d,onChange:i=>c(i.target.value)}),t.jsx(b,{name:"password",label:"Password",type:a?"text":"password",value:h,onChange:i=>g(i.target.value),InputProps:{endAdornment:t.jsx(V,{position:"end",children:t.jsx(M,{onClick:()=>e(!a),edge:"end",children:t.jsx(z,{icon:a?"eva:eye-fill":"eva:eye-off-fill"})})})}})]}),u&&t.jsx(y,{color:"error",sx:{mt:2},children:u}),t.jsx(so,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:x,loading:I,style:{marginTop:"15px"},children:"Login"})]});return t.jsxs(R,{sx:{...U({color:W(n.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:"100vh"},children:[t.jsx(S,{position:"top-right"}),t.jsx(j,{alignItems:"center",justifyContent:"center",sx:{height:"100%",padding:3},children:t.jsxs(G,{sx:{p:5,width:1,maxWidth:420,overflow:"auto",textAlign:"center"},children:[t.jsx("img",{src:"assets\\fitnatlogo.png",alt:"Logo",style:{width:"150px",marginBottom:"17px"}}),t.jsx(y,{variant:"h4",children:"Sign in to FITNAT"}),t.jsx(Q,{sx:{my:3}}),L]})})]})}function xo(){return t.jsxs(t.Fragment,{children:[t.jsx(N,{children:t.jsx("title",{children:" Login | FITNAT "})}),t.jsx(ro,{})]})}export{xo as default};
