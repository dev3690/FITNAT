import{r as l,f as c,e as p,s as m,P as C,i as f,k as x,_ as n,j as y,t as v,l as _}from"./index-84372fa7.js";function E(e,t){var o,s;return l.isValidElement(e)&&t.indexOf((o=e.type.muiName)!=null?o:(s=e.type)==null||(s=s._payload)==null||(s=s.value)==null?void 0:s.muiName)!==-1}function N(e){return c("MuiCard",e)}p("MuiCard",["root"]);const M=["className","raised"],R=e=>{const{classes:t}=e;return _({root:["root"]},N,t)},h=m(C,{name:"MuiCard",slot:"Root",overridesResolver:(e,t)=>t.root})(()=>({overflow:"hidden"})),j=l.forwardRef(function(t,o){const s=f({props:t,name:"MuiCard"}),{className:i,raised:a=!1}=s,u=x(s,M),r=n({},s,{raised:a}),d=R(r);return y.jsx(h,n({className:v(d.root,i),elevation:a?8:void 0,ref:o,ownerState:r},u))}),P=j;export{P as C,E as i};
