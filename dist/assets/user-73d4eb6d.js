import{r as l,j as e,S as Q,T as $,B as G,g as H,I as ce,b as me,W as he}from"./index-c644ad95.js";import{Q as ge,B as j}from"./ReactToastify-0ddb12d4.js";import{C as pe}from"./confirmation_dialog-5938ca4c.js";import{c as T,a as ue,U as v,u as xe,i as fe,d as je}from"./api_utils-656155e4.js";import{L as z}from"./label-9c7f96ce.js";import{c as be,d,T as ye,a as Ce,e as Se}from"./TableRow-a14db619.js";import{B as b}from"./Button-0bd2d8e6.js";import{a as De,U as we,b as Ie,T as Te,e as ve,c as Pe,g as Fe}from"./utils-77697fa5.js";import{C as Re}from"./Container-d8b58027.js";import{C as Ae}from"./Card-24a4f5a7.js";import{C as Y}from"./CircularProgress-e27468e1.js";import{T as Ee,D as Me,a as Ne,b as ke,c as Be}from"./TablePagination-7f50f290.js";import{T as P}from"./TextField-df2c55e6.js";import"./TableSortLabel-555d1b44.js";import"./MenuItem-e241356a.js";import"./Menu-af3b1140.js";import"./InputAdornment-50c0534d.js";import"./FormGroup-84301a4d.js";function Ue({selected:g,name:F,id:m,avatarUrl:y,sr:p,mobile:R,username:u,password:A,isAdmin:o,isMaster:C,type_id:i,handleClick:B,handleEdit:E,handleDelete:x}){return l.useState(null),e.jsx(e.Fragment,{children:e.jsxs(be,{children:[e.jsx(d,{align:"center",padding:"checkbox",children:p}),e.jsx(d,{align:"center",children:e.jsx(Q,{direction:"row",alignItems:"center",spacing:2,children:e.jsx($,{variant:"subtitle2",noWrap:!0,children:F})})}),e.jsx(d,{children:R}),e.jsx(d,{children:u}),e.jsx(d,{align:"center",children:o?A:"--"}),e.jsx(d,{children:e.jsx(z,{color:C?"success":"primary",children:C?"ADMIN":"USER"})}),e.jsx(d,{children:e.jsx(z,{color:i==1?"success":"primary",children:i==1?"DR DHAIRYA":"DR NIDHI"})}),e.jsx(d,{align:"right",children:e.jsxs(G,{display:"flex",justifyContent:"flex-end",children:[e.jsx(b,{variant:"contained",disabled:!o,size:"small",onClick:E,color:"primary",sx:{marginRight:1},children:"Edit"}),e.jsx(b,{variant:"contained",disabled:!o,size:"small",color:"error",onClick:()=>x(m),children:"Delete"})]})})]})})}function We(){const[g,F]=l.useState([]),[m,y]=l.useState(0),[p,R]=l.useState("asc"),[u,A]=l.useState("name"),[o,C]=l.useState(""),[i,B]=l.useState(5),[E,x]=l.useState(!1),[s,S]=l.useState(null),[D,M]=l.useState(!1),[w,N]=l.useState(!1),[U,c]=l.useState(!1),[J,W]=l.useState(!1),[K,V]=l.useState(-1),[_,X]=l.useState();l.useEffect(()=>{var r;(async()=>{var f;try{c(!0);const n=await T(ue,{table:v});console.log("RESP>>>>>",n),F((f=n==null?void 0:n.data)==null?void 0:f.data),c(!1)}catch(n){console.error("Failed to fetch users:",n)}})();let t=(r=H("data"))==null?void 0:r.isMaster;X(t)},[D]);const Z=(a,t)=>{R(u===t&&p==="asc"?"desc":"asc"),A(t)},ee=a=>{S(a),N(!0),x(!0)},se=async a=>{try{console.log("ID>>>>",a),V(a),W(!0)}catch(t){console.error("Failed to delete user:",t)}},k=()=>{x(!1),N(!1)},ae=async()=>{var t,r,f,n,O,q;let a=H("data");if(console.log(s),c(!0),!((t=s==null?void 0:s.name)!=null&&t.trim())||!((r=s==null?void 0:s.mobile)!=null&&r.trim())||((n=(f=s==null?void 0:s.mobile)==null?void 0:f.trim())==null?void 0:n.length)!=10||!((O=s==null?void 0:s.username)!=null&&O.trim())||!((q=s==null?void 0:s.password)!=null&&q.trim())){j.error("All fields are required"),c(!1);return}if(w)try{let h=await T(xe,{...s,table:v,type_id:a==null?void 0:a.type_id});M(!D),console.log("response",h),j.success("User Updated Successfully")}catch(h){j.error("Failed to update user"),console.error("Failed to update user:",h)}else try{console.log(s);const de=await T(fe,{...s,table:v,type_id:a==null?void 0:a.type_id});console.log("insert RESP",de),M(!D),j.success("New User Added Successfully")}catch(h){console.error("Failed to add user:",h),j.success("Failed to add new user")}c(!1),k()},te=()=>{S({name:"",mobile:"",username:"",password:"",isMaster:!1,type_id:""}),N(!1),x(!0)},le=(a,t)=>{y(t)},ne=a=>{y(0),B(parseInt(a.target.value,10))},oe=a=>{y(0),C(a.target.value)},I=a=>{const{name:t,value:r}=a.target;S({...s,[t]:r})},L=De({inputData:g,comparator:Fe(p,u),filterName:o}),ie=!L.length&&!!o,re=async a=>{if(console.log(">>>>>",a),c(!0),a){let t=await T(je,{table:v,id:K});M(!D),console.log("response",t)}W(!1),c(!1)};return e.jsxs(e.Fragment,{children:[e.jsx(ge,{position:"top-right"}),e.jsxs(Re,{maxWidth:"xl",children:[e.jsxs(Q,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[e.jsx($,{variant:"h4",children:"Users"}),_&&e.jsx(b,{variant:"contained",color:"inherit",startIcon:e.jsx(ce,{icon:"eva:plus-fill"}),onClick:te,children:"New User"})]}),e.jsxs(Ae,{children:[e.jsx(we,{numSelected:0,filterName:o,onFilterName:oe}),e.jsx(me,{children:e.jsx(ye,{sx:{overflow:"unset"},children:e.jsxs(Ce,{sx:{minWidth:800},children:[e.jsx(Ie,{order:p,orderBy:u,rowCount:g.length,headLabel:[{id:"sr",label:"Sr."},{id:"name",label:"Name"},{id:"mobile",label:"Mobile"},{id:"username",label:"Username"},{id:"password",label:"Password"},{id:"isMaster",label:"Is Master"},{id:"type_id",label:"Created By"},{id:"actions",label:"Actions",align:"center"}],onRequestSort:Z}),U?e.jsx(G,{display:"flex",justifyContent:"center",alignItems:"center",height:200,children:e.jsx(Y,{})}):e.jsxs(Se,{children:[L.slice(m*i,m*i+i).map((a,t)=>e.jsx(Ue,{id:a.id,sr:t+1,isAdmin:_,selected:!1,name:a.name,mobile:a.mobile,company:a.company,username:a.username,password:a.password,isMaster:a.isMaster,type_id:a.type_id,handleClick:()=>{},handleEdit:()=>ee(a),handleDelete:se},a.id)),e.jsx(Te,{height:77,emptyRows:ve(m,i,g.length)}),ie&&e.jsx(Pe,{query:o})]})]})})}),e.jsx(Ee,{page:m,component:"div",count:g.length,rowsPerPage:i,onPageChange:le,rowsPerPageOptions:[5,10,25],onRowsPerPageChange:ne})]}),e.jsxs(Me,{open:E,onClose:k,children:[e.jsx(Ne,{children:w?"Edit User":"Add New User"}),U?e.jsx(Y,{}):e.jsxs(e.Fragment,{children:[e.jsxs(ke,{children:[e.jsx(P,{margin:"dense",name:"name",label:"Name",type:"text",fullWidth:!0,value:(s==null?void 0:s.name)||"",onChange:I}),e.jsx(P,{margin:"dense",name:"mobile",label:"Mobile",type:"number",fullWidth:!0,value:(s==null?void 0:s.mobile)||"",onChange:I}),e.jsx(P,{margin:"dense",name:"username",label:"Username",type:"text",disabled:w,fullWidth:!0,value:(s==null?void 0:s.username)||"",onChange:I}),e.jsx(P,{margin:"dense",name:"password",label:"Password",type:"text",fullWidth:!0,value:(s==null?void 0:s.password)||"",onChange:I}),e.jsxs("label",{children:[e.jsx("input",{name:"isMaster",type:"checkbox",checked:(s==null?void 0:s.isMaster)||!1,onChange:a=>S({...s,isMaster:a.target.checked})}),"IsMaster"]})]}),e.jsxs(Be,{children:[e.jsx(b,{onClick:k,children:"Cancel"}),e.jsx(b,{onClick:ae,children:w?"Save":"Add"})]})]})]}),e.jsx(pe,{openDialog:J,message:"Are You Sure",handleSave:re})]})]})}function ts(){return e.jsxs(e.Fragment,{children:[e.jsx(he,{children:e.jsx("title",{children:" User | FITNAT "})}),e.jsx(We,{})]})}export{ts as default};