import{u as V,r as i,j as a,S as H,B as b,P as M,R as X}from"./index-d5588370.js";import q from"./bird-eye-view-a468108e.js";import{U as K}from"./user-table-head-46a53a7c.js";import{C as Q}from"./Container-336572a5.js";import{B as n}from"./Button-acd88f2b.js";import{D as k,a as j,b as C,c as D,T as Y}from"./TablePagination-b0e6ee39.js";import{F as Z,a as P}from"./FormGroup-da3eb763.js";import{C as y}from"./MenuItem-b7847bdd.js";import{G as ee}from"./Grid-49b1bf41.js";import{C as ae}from"./Card-3d016d94.js";import{T as le,a as te,b as ie,c as S,d as o,e as ne}from"./TableRow-175fc24b.js";import{T as d}from"./TextField-3d7d31c2.js";import"./api_utils-656155e4.js";import"./date_time-0f4139e7.js";import"./utils-1acd8cfa.js";import"./TableSortLabel-8cc8e201.js";import"./InputAdornment-23b4c846.js";import"./Menu-b71dbcde.js";const w={Gold:4,Premium:8,Deluxe:12},c=[{id:1,details:[{label:"Name",value:"John Doe"},{label:"Package",value:"Premium"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-01-01"},{label:"End Date",value:"2023-12-31"}]},{id:2,details:[{label:"Name",value:"Jane Smith"},{label:"Package",value:"Premium"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-02-01"},{label:"End Date",value:"2023-11-30"}]},{id:3,details:[{label:"Name",value:"Michael Brown"},{label:"Package",value:"Deluxe"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-03-01"},{label:"End Date",value:"2023-12-31"}]},{id:4,details:[{label:"Name",value:"Emily Davis"},{label:"Package",value:"Premium"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-04-01"},{label:"End Date",value:"2023-12-31"}]},{id:5,details:[{label:"Name",value:"David Wilson"},{label:"Package",value:"Gold"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-05-01"},{label:"End Date",value:"2023-12-31"}]},{id:6,details:[{label:"Name",value:"Olivia Martinez"},{label:"Package",value:"Gold"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-06-01"},{label:"End Date",value:"2023-12-31"}]},{id:7,details:[{label:"Name",value:"James Johnson"},{label:"Package",value:"Deluxe"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-07-01"},{label:"End Date",value:"2023-12-31"}]},{id:8,details:[{label:"Name",value:"Sophia Lee"},{label:"Package",value:"Gold"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-08-01"},{label:"End Date",value:"2023-12-31"}]},{id:9,details:[{label:"Name",value:"Robert White"},{label:"Package",value:"Premium"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-09-01"},{label:"End Date",value:"2023-12-31"}]},{id:10,details:[{label:"Name",value:"Emma Garcia"},{label:"Package",value:"Premium"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-10-01"},{label:"End Date",value:"2023-12-31"}]},{id:11,details:[{label:"Name",value:"Daniel Harris"},{label:"Package",value:"Deluxe"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-11-01"},{label:"End Date",value:"2023-12-31"}]},{id:12,details:[{label:"Name",value:"Isabella Clark"},{label:"Package",value:"Premium"},{label:"Link",value:"http://example.com/exercise1"},{label:"Start Date",value:"2023-12-01"},{label:"End Date",value:"2023-12-31"}]}];function ye(){const E=()=>{window.close(),$("/")},$=V(),[L,se]=i.useState(!1),[s,W]=i.useState({Name:!0,"Start Date":!0,"End Date":!0,Package:!0," Link":!0,...Array.from({length:12},(e,l)=>`Week ${l+1}`).reduce((e,l)=>({...e,[l]:!0}),{})}),[A,T]=i.useState({}),[N,O]=i.useState({}),[F,h]=i.useState(!1),[z,B]=i.useState(!1),[m,v]=i.useState(0),[r,R]=i.useState(10),g=e=>{W(l=>({...l,[e]:!l[e]}))},G=(e,l)=>{T(t=>({...t,[`${e}-${l}`]:!t[`${e}-${l}`]}))},I=(e,l)=>{O(t=>({...t,[`${e}-${l}`]:!t[`${e}-${l}`]}))},u=()=>{B(!1)},_=()=>{h(!0)},f=()=>{h(!1)},J=(e,l)=>{v(l)},U=e=>{R(parseInt(e.target.value,10)),v(0)};return a.jsxs(Q,{children:[a.jsx("div",{children:a.jsx("button",{onClick:E,children:"Exit"})}),a.jsx(H,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5}),a.jsx(b,{display:"flex",children:a.jsxs(b,{style:{flex:1,transition:"margin-left 0.3s ease",marginLeft:L?"250px":"0",display:"flex",flexDirection:"column",alignItems:"baseline"},children:[a.jsx(b,{my:1,style:{width:"95%",display:"flex",justifyContent:"space-between",alignItems:"center"},children:a.jsx(n,{variant:"outlined",onClick:_,children:"Collapse Columns"})}),a.jsxs(k,{open:F,onClose:f,maxWidth:"xs",position:"fixed",right:0,top:50,style:{width:"300px",zIndex:1},children:[a.jsx(j,{children:"Collapse Columns"}),a.jsx(C,{children:a.jsxs(Z,{children:[c[0].details.map(e=>a.jsx(P,{control:a.jsx(y,{checked:s[e.label],onChange:()=>g(e.label),color:"primary"}),label:e.label},e.label)),Array.from({length:12},(e,l)=>`Week ${l+1}`).map(e=>a.jsx(P,{control:a.jsx(y,{checked:s[e],onChange:()=>g(e),color:"primary"}),label:e},e))]})}),a.jsx(D,{children:a.jsx(n,{onClick:f,color:"primary",children:"Close"})})]}),a.jsxs(ee,{xs:12,md:2,margin:5,children:[a.jsx(ae,{elevation:10,backgroundColor:"#000000",sx:{padding:3,backgroundColor:"#BFF6C3"},children:a.jsxs(le,{component:M,style:{width:"auto",marginInline:"auto",overflowX:"auto"},children:[a.jsxs(te,{size:"small","aria-label":"user details table",children:[a.jsx(K,{headLabel:[...c[0].details.map((e,l)=>({id:`${e}-${l}`,label:e==null?void 0:e.label})),...Array.from({length:12},(e,l)=>`Week ${l+1}`).map((e,l)=>({id:`${e}-${l}`,label:e}))]}),"                ",a.jsx(ie,{children:a.jsxs(S,{children:[c[0].details.map(e=>s[e.label]&&a.jsx(o,{style:{padding:"8px",fontSize:"0.975rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontWeight:"bold",position:"sticky",top:0,backgroundColor:"#ACE1AF"},children:e.label},e.label)),Array.from({length:12},(e,l)=>`Week ${l+1}`).map(e=>s[e]&&a.jsx(o,{colSpan:2,style:{padding:"8px",fontSize:"0.975rem",textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontWeight:"bold",position:"sticky",top:0,backgroundColor:"#ACE1AF"},children:e},e))]})}),a.jsx(ne,{children:c.slice(m*r,m*r+r).map((e,l)=>a.jsxs(S,{style:{backgroundColor:(m*r+l)%2===0?"#8DECB4":"#ffffff"},children:[e.details.map(t=>s[t.label]&&a.jsx(o,{style:{padding:"8px",fontSize:"0.875rem",whiteSpace:"nowrap",alignItems:"center",overflow:"hidden",textOverflow:"ellipsis"},children:t.label==="Link"?a.jsx(n,{variant:"contained",size:"small",color:"primary",href:t.value,target:"_blank",rel:"noopener noreferrer",style:{borderRadius:"50%",minWidth:"40px"},children:"Link"}):t.value},t.label)),Array.from({length:12},(t,p)=>`Week ${p+1}`).map((t,p)=>s[t]&&a.jsxs(X.Fragment,{children:[a.jsx(o,{style:{padding:"8px",fontSize:"0.875rem",textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:a.jsx(n,{variant:"contained",size:"large",color:A[`${e.id}-${t}`]?"success":"inherit",onClick:()=>G(e.id,t),style:{minWidth:"40px",padding:"4px 8px"},disabled:p>=w[e.details.find(x=>x.label==="Package").value],children:"Upd"})}),a.jsx(o,{style:{padding:"8px",fontSize:"0.875rem",textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:a.jsx(n,{variant:"contained",size:"large",color:N[`${e.id}-${t}`]?"success":"info",onClick:()=>I(e.id,t),style:{minWidth:"40px",padding:"4px 8px"},disabled:p>=w[e.details.find(x=>x.label==="Package").value],children:"Tks"})})]},`${t}-${e.id}`))]},e.id))})]}),a.jsx(Y,{rowsPerPageOptions:[5,15,30],component:"div",count:c.length,rowsPerPage:r,page:m,onPageChange:J,onRowsPerPageChange:U})]})}),a.jsx(q,{})]})]})}),a.jsxs(k,{open:z,onClose:u,children:[a.jsx(j,{children:"Add Patient"}),a.jsx(C,{children:a.jsxs("form",{children:[a.jsx(d,{margin:"dense",id:"name",label:"Name",type:"text",fullWidth:!0,variant:"outlined"}),a.jsx(d,{margin:"dense",id:"start-date",label:"Start Date",type:"date",fullWidth:!0,variant:"outlined",InputLabelProps:{shrink:!0}}),a.jsx(d,{margin:"dense",id:"end-date",label:"End Date",type:"date",fullWidth:!0,variant:"outlined",InputLabelProps:{shrink:!0}}),a.jsx(d,{margin:"dense",id:"package",label:"Package",type:"text",fullWidth:!0,variant:"outlined"}),a.jsx(d,{margin:"dense",id:"link",label:"Link",type:"url",fullWidth:!0,variant:"outlined"})]})}),a.jsxs(D,{children:[a.jsx(n,{onClick:u,color:"primary",children:"Cancel"}),a.jsx(n,{onClick:u,color:"primary",children:"Add"})]})]})]})}export{ye as default};
