import{f as j,e as N,v as D,s as g,h as c,_ as o,w as _,r as U,i as z,k as E,j as v,t as I,l as F}from"./index-d5588370.js";function K(r){return j("MuiCircularProgress",r)}N("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const W=["className","color","disableShrink","size","style","thickness","value","variant"];let l=r=>r,P,S,b,$;const t=44,B=D(P||(P=l`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),G=D(S||(S=l`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),L=r=>{const{classes:e,variant:s,color:a,disableShrink:d}=r,u={root:["root",s,`color${c(a)}`],svg:["svg"],circle:["circle",`circle${c(s)}`,d&&"circleDisableShrink"]};return F(u,K,e)},T=g("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.root,e[s.variant],e[`color${c(s.color)}`]]}})(({ownerState:r,theme:e})=>o({display:"inline-block"},r.variant==="determinate"&&{transition:e.transitions.create("transform")},r.color!=="inherit"&&{color:(e.vars||e).palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&_(b||(b=l`
      animation: ${0} 1.4s linear infinite;
    `),B)),V=g("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),Z=g("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.circle,e[`circle${c(s.variant)}`],s.disableShrink&&e.circleDisableShrink]}})(({ownerState:r,theme:e})=>o({stroke:"currentColor"},r.variant==="determinate"&&{transition:e.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&_($||($=l`
      animation: ${0} 1.4s ease-in-out infinite;
    `),G)),q=U.forwardRef(function(e,s){const a=z({props:e,name:"MuiCircularProgress"}),{className:d,color:u="primary",disableShrink:M=!1,size:m=40,style:R,thickness:i=3.6,value:h=0,variant:k="indeterminate"}=a,w=E(a,W),n=o({},a,{color:u,disableShrink:M,size:m,thickness:i,value:h,variant:k}),f=L(n),p={},x={},C={};if(k==="determinate"){const y=2*Math.PI*((t-i)/2);p.strokeDasharray=y.toFixed(3),C["aria-valuenow"]=Math.round(h),p.strokeDashoffset=`${((100-h)/100*y).toFixed(3)}px`,x.transform="rotate(-90deg)"}return v.jsx(T,o({className:I(f.root,d),style:o({width:m,height:m},x,R),ownerState:n,ref:s,role:"progressbar"},C,w,{children:v.jsx(V,{className:f.svg,ownerState:n,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:v.jsx(Z,{className:f.circle,style:p,ownerState:n,cx:t,cy:t,r:(t-i)/2,fill:"none",strokeWidth:i})})}))}),H=q;export{H as C};
