import{r as i,g as G,j as t,u as na}from"./index-5bb92454.js";import{S as I,c as C,u as la,e as ia,f as q,i as oa,U as ra}from"./api_utils-656155e4.js";import{c as da,d as f,T as ca,a as pa,e as ha}from"./TableRow-b0536a85.js";import{B as u}from"./Button-8ec9e2c9.js";import{a as ga,U as xa,b as fa,T as ua,e as ba,c as ya,g as ja}from"./utils-677732ef.js";import{c as ka}from"./date_time-812cc899.js";import{C as Sa}from"./Container-1b877ef9.js";import{G as Da}from"./Grid-e6a1f989.js";import{C as Pa}from"./Card-9332cd36.js";import{T as Ta,D as Ea,a as va,b as _a,c as $a}from"./TablePagination-02ced15b.js";import{T as E}from"./TextField-1af8cd54.js";import"./TableSortLabel-df41ceeb.js";import"./MenuItem-86f63860.js";import"./Menu-4493890b.js";import"./InputAdornment-93e217eb.js";import"./FormGroup-df3dc1cb.js";function Fa({selected:b,name:j,currentWeek:r,isNotify:k,id:S,pack:N,pain:w,row:K,selectedColumns:n,url:B,totalWeeks:c,status:d,index:M,start_date:v,end_date:e,handleClick:_,upliftState:D,handleEdit:W,handleDelete:$}){i.useState(null);const[y,m]=i.useState();i.useEffect(()=>{var p;let s=(p=G("data"))==null?void 0:p.type_id;m(s)});const F=async s=>{console.log("data to update",s);const p=await C(la,s);D(),console.log("<><><><><><>",p)};return i.useEffect(()=>{},[]),t.jsxs(da,{hover:!0,tabIndex:-1,children:[(n==null?void 0:n.includes("Name"))&&t.jsx(f,{children:j}),(n==null?void 0:n.includes("Package"))&&t.jsx(f,{children:N==1?"Fitnat Coaching Premium":N==2?"Fitnat Coaching Delux":"Fitnat Personal Training"}),(n==null?void 0:n.includes("Link"))&&t.jsx(f,{align:"center",children:t.jsx(u,{variant:"outlined",href:B,size:"small",color:"success",children:"link"})}),(n==null?void 0:n.includes("Start Date"))&&t.jsx(f,{align:"center",children:new Date(v).toLocaleString().split(",")[0]}),(n==null?void 0:n.includes("End Date"))&&t.jsx(f,{align:"center",children:new Date(e).toLocaleString().split(",")[0]}),(n==null?void 0:n.includes("Pain"))&&t.jsx(f,{children:w}),Array.from({length:12},(s,p)=>p).map(s=>n.includes(`Week ${s+1}`)&&t.jsxs(f,{id:`index${s}`,align:"center",sx:{backgroundColor:k&&s+1==r?"#76bfff":s+1==r&&"#e4eaec",borderRadius:s+1==r&&"20px 0px 20px 0px"},children:[t.jsx(u,{variant:"contained",size:"small",color:d[`week${s+1}u1`]==1?"success":d[`week${s+1}u1`]==0&&s+1<r?"info":"error",disabled:s+1>c,onClick:()=>F({id:S,table:I,[`week${s+1}u1`]:d[`week${s+1}u1`]==1?0:1}),children:y==1?"UPD":"UPD1"}),t.jsx(u,{variant:"contained",size:"small",sx:{margin:"10px"},color:d[`week${s+1}u2`]==1?"success":d[`week${s+1}u1`]==0&&s+1<r?"info":"error",disabled:s+1>c,onClick:()=>F({id:S,table:I,[`week${s+1}u2`]:d[`week${s+1}u2`]==1?0:1}),children:y==1?"TKS":"UPD2"}),y==2&&t.jsx(u,{variant:"contained",size:"small",sx:{margin:"10px"},color:d[`week${s+1}u3`]==1?"success":d[`week${s+1}u1`]==0&&s+1<r?"info":"error",disabled:s+1>c,onClick:()=>F({id:S,table:I,[`week${s+1}u3`]:d[`week${s+1}u3`]==1?0:1}),children:"UPD3"})]}))]})}function Va(){const[b,j]=i.useState([]),[r,k]=i.useState(0),[S,N]=i.useState("asc"),[w,K]=i.useState("name"),[n,B]=i.useState(""),[c,d]=i.useState(15),[M,v]=i.useState(!1),[e,_]=i.useState(null),[D,W]=i.useState(!1),[$,y]=i.useState(!1),[m,F]=i.useState(!0);let s=[{id:1,label:"Name"},{id:2,label:"Package"},{id:3,label:"Link"},{id:4,label:"Start Date"},{id:5,label:"End Date"},{id:6,label:"Pain"},...Array.from({length:12},(a,o)=>`Week ${o+1}`).map((a,o)=>({id:`${a}-${o}`,label:a}))];const[p,V]=i.useState(s==null?void 0:s.map(a=>a==null?void 0:a.label));i.useEffect(()=>{const a=async()=>{var g,x;try{let h=G("data");const R=await C(ia);console.log("RESP BIRD EYE",R);const z=(x=(g=R==null?void 0:R.data)==null?void 0:g.filter(l=>{var T,L;return((L=(T=l==null?void 0:l.patient_master)==null?void 0:T.user_master)==null?void 0:L.type_id)==(h==null?void 0:h.type_id)}))==null?void 0:x.map(l=>{var T;return{...l==null?void 0:l.patient_master,id:l==null?void 0:l.id,totalWeeks:(T=ka(l==null?void 0:l.patient_master))==null?void 0:T.totalWeeks,currentWeek:l==null?void 0:l.currentWeek,isNotify:l==null?void 0:l.isNotify,status:o(l)}});console.log("RESP>>>>>",z),j(z)}catch(h){console.error("Failed to fetch users:",h)}},o=g=>Object.keys(g).filter(x=>x.startsWith("week")).reduce((x,h)=>(x[h]=g[h],x),{});a()},[D]);const H=a=>{_(a),y(!0),v(!0)},Y=async a=>{try{await q.delete(`http://localhost:3690/user_masters/${a}`),j(b.filter(o=>o.id!==a))}catch(o){console.error("Failed to delete user:",o)}},A=()=>{v(!1),y(!1)},J=async()=>{if($)try{await q.put(`http://localhost:3690/user_masters/${e.id}`,e),j(b.map(a=>a.id===e.id?e:a))}catch(a){console.error("Failed to update user:",a)}else try{if(!(e!=null&&e.name)||!(e!=null&&e.mobile)||!(e!=null&&e.username)||!(e!=null&&e.password)||!(e!=null&&e.type_id)){alert("All fields are required");return}const a=await C(oa,{...e,table:ra});console.log("insert RESP",a),W(!D)}catch(a){console.error("Failed to add user:",a)}A()},Q=()=>{W(!D)},X=(a,o)=>{k(o)},Z=a=>{k(0),d(parseInt(a.target.value,10))},U=a=>{k(0),B(a.target.value)},P=a=>{const{name:o,value:g}=a.target;_({...e,[o]:g})},O=ga({inputData:b,comparator:ja(S,w),filterName:n}),aa=()=>{ea("/patients")},ea=na(),ta=a=>{console.log(">>>>>>>>",a),V(a)},sa=!O.length&&!!n;return t.jsxs(Sa,{sx:{display:"flex"},children:[t.jsxs(Da,{xs:12,md:2,margin:5,children:[t.jsx("div",{children:t.jsx(u,{onClick:aa,variant:"contained",color:"primary",children:"Exit"})}),t.jsxs(Pa,{sx:{marginTop:"10px"},children:[t.jsx(xa,{numSelected:0,filterName:n,handleSelectedColumns:ta,onFilterName:U,showFilterButton:m}),t.jsx(ca,{sx:{overflow:"auto"},children:t.jsxs(pa,{sx:{minWidth:800},children:[t.jsx(fa,{headLabel:s==null?void 0:s.filter(a=>p.includes(a==null?void 0:a.label))}),t.jsxs(ha,{children:[O.slice(r*c,r*c+c).map((a,o)=>t.jsx(Fa,{selectedColumns:p,id:a.id,index:o,currentWeek:a==null?void 0:a.currentWeek,isNotify:a==null?void 0:a.isNotify,totalWeeks:a==null?void 0:a.totalWeeks,selected:!1,name:a.name,upliftState:Q,status:a==null?void 0:a.status,pack:a.package,url:a.url,pain:a.pain,start_date:a.start_date,end_date:a.end_date,type_id:a.type_id,handleEdit:()=>H(a),handleDelete:()=>Y(a.id)})),t.jsx(ua,{height:77,emptyRows:ba(r,c,b.length)}),sa&&t.jsx(ya,{query:n})]})]})}),t.jsx(Ta,{page:r,component:"div",count:b.length,rowsPerPage:c,onPageChange:X,rowsPerPageOptions:[15,25,50],onRowsPerPageChange:Z})]})]}),t.jsxs(Ea,{open:M,onClose:A,children:[t.jsx(va,{children:$?"Edit User":"Add New User"}),t.jsxs(_a,{children:[t.jsx(E,{margin:"dense",name:"name",label:"Name",type:"text",fullWidth:!0,value:(e==null?void 0:e.name)||"",onChange:P}),t.jsx(E,{margin:"dense",name:"mobile",label:"Mobile",type:"text",fullWidth:!0,value:(e==null?void 0:e.mobile)||"",onChange:P}),t.jsx(E,{margin:"dense",name:"username",label:"Username",type:"text",fullWidth:!0,value:(e==null?void 0:e.username)||"",onChange:P}),t.jsx(E,{margin:"dense",name:"password",label:"Password",type:"text",fullWidth:!0,value:(e==null?void 0:e.password)||"",onChange:P}),t.jsxs("label",{children:[t.jsx("input",{name:"isMaster",type:"checkbox",checked:(e==null?void 0:e.isMaster)||!1,onChange:a=>_({...e,isMaster:a.target.checked})}),"IsMaster"]}),t.jsx(E,{margin:"dense",name:"type_id",label:"Type ID",type:"number",fullWidth:!0,value:(e==null?void 0:e.type_id)||"",onChange:P})]}),t.jsxs($a,{children:[t.jsx(u,{onClick:A,children:"Cancel"}),t.jsx(u,{onClick:J,children:$?"Save":"Add"})]})]})]})}export{Va as default};
