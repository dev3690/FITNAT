import{f as P,e as R,s as w,G as J,_ as n,r as b,k as V,j as r,t as F,h as O,l as T,y as U,z as K,o as M,i as Q,a7 as q,a1 as ae,C as ne}from"./index-a4988a1a.js";import{a as ie,b as ce,d as D}from"./Menu-984ec5d5.js";function re(e){return P("PrivateSwitchBase",e)}R("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const le=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],de=e=>{const{classes:t,checked:o,disabled:s,edge:a}=e,i={root:["root",o&&"checked",s&&"disabled",a&&`edge${O(a)}`],input:["input"]};return T(i,re,t)},ue=w(J)(({ownerState:e})=>n({padding:9,borderRadius:"50%"},e.edge==="start"&&{marginLeft:e.size==="small"?-3:-12},e.edge==="end"&&{marginRight:e.size==="small"?-3:-12})),pe=w("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),fe=b.forwardRef(function(t,o){const{autoFocus:s,checked:a,checkedIcon:i,className:c,defaultChecked:C,disabled:l,disableFocusRipple:d=!1,edge:h=!1,icon:k,id:g,inputProps:y,inputRef:I,name:x,onBlur:u,onChange:v,onFocus:p,readOnly:j,required:z=!1,tabIndex:X,type:S,value:E}=t,Y=V(t,le),[H,Z]=ie({controlled:a,default:!!C,name:"SwitchBase",state:"checked"}),m=ce(),ee=f=>{p&&p(f),m&&m.onFocus&&m.onFocus(f)},te=f=>{u&&u(f),m&&m.onBlur&&m.onBlur(f)},oe=f=>{if(f.nativeEvent.defaultPrevented)return;const G=f.target.checked;Z(G),v&&v(f,G)};let $=l;m&&typeof $>"u"&&($=m.disabled);const se=S==="checkbox"||S==="radio",L=n({},t,{checked:H,disabled:$,disableFocusRipple:d,edge:h}),_=de(L);return r.jsxs(ue,n({component:"span",className:F(_.root,c),centerRipple:!0,focusRipple:!d,disabled:$,tabIndex:null,role:void 0,onFocus:ee,onBlur:te,ownerState:L,ref:o},Y,{children:[r.jsx(pe,n({autoFocus:s,checked:a,defaultChecked:C,className:_.input,disabled:$,id:se?g:void 0,name:x,onChange:oe,readOnly:j,ref:I,required:z,ownerState:L,tabIndex:X,type:S},S==="checkbox"&&E===void 0?{}:{value:E},y)),H?i:k]}))}),me=fe,be=U(r.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),Ce=U(r.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),ge=U(r.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function xe(e){return P("MuiCheckbox",e)}const ve=R("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),N=ve,he=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],ke=e=>{const{classes:t,indeterminate:o,color:s,size:a}=e,i={root:["root",o&&"indeterminate",`color${O(s)}`,`size${O(a)}`]},c=T(i,xe,t);return n({},t,c)},Ie=w(me,{shouldForwardProp:e=>K(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.indeterminate&&t.indeterminate,o.color!=="default"&&t[`color${O(o.color)}`]]}})(({theme:e,ownerState:t})=>n({color:(e.vars||e).palette.text.secondary},!t.disableRipple&&{"&:hover":{backgroundColor:e.vars?`rgba(${t.color==="default"?e.vars.palette.action.activeChannel:e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.hoverOpacity})`:M(t.color==="default"?e.palette.action.active:e.palette[t.color].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.color!=="default"&&{[`&.${N.checked}, &.${N.indeterminate}`]:{color:(e.vars||e).palette[t.color].main},[`&.${N.disabled}`]:{color:(e.vars||e).palette.action.disabled}})),ye=r.jsx(Ce,{}),$e=r.jsx(be,{}),Be=r.jsx(ge,{}),Me=b.forwardRef(function(t,o){var s,a;const i=Q({props:t,name:"MuiCheckbox"}),{checkedIcon:c=ye,color:C="primary",icon:l=$e,indeterminate:d=!1,indeterminateIcon:h=Be,inputProps:k,size:g="medium",className:y}=i,I=V(i,he),x=d?h:l,u=d?h:c,v=n({},i,{color:C,indeterminate:d,size:g}),p=ke(v);return r.jsx(Ie,n({type:"checkbox",inputProps:n({"data-indeterminate":d},k),icon:b.cloneElement(x,{fontSize:(s=x.props.fontSize)!=null?s:g}),checkedIcon:b.cloneElement(u,{fontSize:(a=u.props.fontSize)!=null?a:g}),ownerState:v,ref:o,className:F(p.root,y)},I,{classes:p}))}),Te=Me,Re=R("MuiListItemIcon",["root","alignItemsFlexStart"]),W=Re;function Ue(e){return P("MuiListItemText",e)}const ze=R("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]),A=ze;function Se(e){return P("MuiMenuItem",e)}const Fe=R("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),B=Fe,Oe=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],Pe=(e,t)=>{const{ownerState:o}=e;return[t.root,o.dense&&t.dense,o.divider&&t.divider,!o.disableGutters&&t.gutters]},we=e=>{const{disabled:t,dense:o,divider:s,disableGutters:a,selected:i,classes:c}=e,l=T({root:["root",o&&"dense",t&&"disabled",!a&&"gutters",s&&"divider",i&&"selected"]},Se,c);return n({},c,l)},je=w(J,{shouldForwardProp:e=>K(e)||e==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:Pe})(({theme:e,ownerState:t})=>n({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!t.disableGutters&&{paddingLeft:16,paddingRight:16},t.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${B.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${B.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${B.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${B.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${B.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${D.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${D.inset}`]:{marginLeft:52},[`& .${A.root}`]:{marginTop:0,marginBottom:0},[`& .${A.inset}`]:{paddingLeft:36},[`& .${W.root}`]:{minWidth:36}},!t.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},t.dense&&n({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${W.root} svg`]:{fontSize:"1.25rem"}}))),Le=b.forwardRef(function(t,o){const s=Q({props:t,name:"MuiMenuItem"}),{autoFocus:a=!1,component:i="li",dense:c=!1,divider:C=!1,disableGutters:l=!1,focusVisibleClassName:d,role:h="menuitem",tabIndex:k,className:g}=s,y=V(s,Oe),I=b.useContext(q),x=b.useMemo(()=>({dense:c||I.dense||!1,disableGutters:l}),[I.dense,c,l]),u=b.useRef(null);ae(()=>{a&&u.current&&u.current.focus()},[a]);const v=n({},s,{dense:x.dense,divider:C,disableGutters:l}),p=we(s),j=ne(u,o);let z;return s.disabled||(z=k!==void 0?k:-1),r.jsx(q.Provider,{value:x,children:r.jsx(je,n({ref:j,role:h,tabIndex:z,component:i,focusVisibleClassName:F(p.focusVisible,d),className:F(p.root,g)},y,{ownerState:v,classes:p}))})}),Ee=Le;export{Te as C,Ee as M,me as S,Ue as g,A as l};
