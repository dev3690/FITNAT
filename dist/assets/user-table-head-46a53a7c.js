import{j as e,a as r}from"./index-d5588370.js";import{b as d,c as u,d as p}from"./TableRow-175fc24b.js";import{T as b}from"./TableSortLabel-8cc8e201.js";l.propTypes={order:r.oneOf(["asc","desc"]).isRequired,orderBy:r.string.isRequired,rowCount:r.number.isRequired,headLabel:r.array.isRequired,onRequestSort:r.func.isRequired};function l({order:o,orderBy:s,rowCount:m,headLabel:a,onRequestSort:t}){const n=i=>c=>{t(c,i)};return e.jsx(d,{children:e.jsx(u,{children:a.map(i=>e.jsx(p,{align:i.alignRight?"right":"left",sortDirection:s===i.id?o:!1,children:e.jsx(b,{active:s===i.id,direction:s===i.id?o:"asc",onClick:n(i.id),children:i.label})},i.id))})})}export{l as U};
