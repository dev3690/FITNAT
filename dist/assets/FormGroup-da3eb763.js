import{e as S,f as k,s as w,h as G,_ as a,r as x,i as M,k as N,T as $,j as p,t as y,S as W,l as j}from"./index-d5588370.js";import{b as q,f as T}from"./Menu-b71dbcde.js";function I(e){return k("MuiFormControlLabel",e)}const z=S("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),d=z,B=["checked","className","componentsProps","control","disabled","disableTypography","inputRef","label","labelPlacement","name","onChange","required","slotProps","value"],H=e=>{const{classes:o,disabled:r,labelPlacement:s,error:l,required:t}=e,c={root:["root",r&&"disabled",`labelPlacement${G(s)}`,l&&"error",t&&"required"],label:["label",r&&"disabled"],asterisk:["asterisk",l&&"error"]};return j(c,I,o)},J=w("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:r}=e;return[{[`& .${d.label}`]:o.label},o.root,o[`labelPlacement${G(r.labelPlacement)}`]]}})(({theme:e,ownerState:o})=>a({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${d.disabled}`]:{cursor:"default"}},o.labelPlacement==="start"&&{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},o.labelPlacement==="top"&&{flexDirection:"column-reverse",marginLeft:16},o.labelPlacement==="bottom"&&{flexDirection:"column",marginLeft:16},{[`& .${d.label}`]:{[`&.${d.disabled}`]:{color:(e.vars||e).palette.text.disabled}}})),K=w("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,o)=>o.asterisk})(({theme:e})=>({[`&.${d.error}`]:{color:(e.vars||e).palette.error.main}})),O=x.forwardRef(function(o,r){var s,l;const t=M({props:o,name:"MuiFormControlLabel"}),{className:c,componentsProps:b={},control:n,disabled:m,disableTypography:f,label:_,labelPlacement:U="end",required:v,slotProps:D={}}=t,E=N(t,B),C=q(),L=(s=m??n.props.disabled)!=null?s:C==null?void 0:C.disabled,g=v??n.props.required,R={disabled:L,required:g};["checked","name","onChange","value","inputRef"].forEach(u=>{typeof n.props[u]>"u"&&typeof t[u]<"u"&&(R[u]=t[u])});const A=T({props:t,muiFormControl:C,states:["error"]}),h=a({},t,{disabled:L,labelPlacement:U,required:g,error:A.error}),P=H(h),F=(l=D.typography)!=null?l:b.typography;let i=_;return i!=null&&i.type!==$&&!f&&(i=p.jsx($,a({component:"span"},F,{className:y(P.label,F==null?void 0:F.className),children:i}))),p.jsxs(J,a({className:y(P.root,c),ownerState:h,ref:r},E,{children:[x.cloneElement(n,R),g?p.jsxs(W,{direction:"row",alignItems:"center",children:[i,p.jsxs(K,{ownerState:h,"aria-hidden":!0,className:P.asterisk,children:[" ","*"]})]}):i]}))}),re=O;function Q(e){return k("MuiFormGroup",e)}S("MuiFormGroup",["root","row","error"]);const V=["className","row"],X=e=>{const{classes:o,row:r,error:s}=e;return j({root:["root",r&&"row",s&&"error"]},Q,o)},Y=w("div",{name:"MuiFormGroup",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:r}=e;return[o.root,r.row&&o.row]}})(({ownerState:e})=>a({display:"flex",flexDirection:"column",flexWrap:"wrap"},e.row&&{flexDirection:"row"})),Z=x.forwardRef(function(o,r){const s=M({props:o,name:"MuiFormGroup"}),{className:l,row:t=!1}=s,c=N(s,V),b=q(),n=T({props:s,muiFormControl:b,states:["error"]}),m=a({},s,{row:t,error:n.error}),f=X(m);return p.jsx(Y,a({className:y(f.root,l),ownerState:m,ref:r},c))}),se=Z;export{se as F,re as a};
