import{s as x,B as p,o as g,r as y,m as b,j as c,a as l}from"./index-d5588370.js";const h=x(p)(({theme:o,ownerState:t})=>{const i=o.palette.mode==="light",r=t.variant==="filled",a=t.variant==="outlined",n=t.variant==="soft",s={...t.color==="default"&&{...r&&{color:i?o.palette.common.white:o.palette.grey[800],backgroundColor:o.palette.text.primary},...a&&{backgroundColor:"transparent",color:o.palette.text.primary,border:`2px solid ${o.palette.text.primary}`},...n&&{color:o.palette.text.secondary,backgroundColor:g(o.palette.grey[500],.16)}}},e={...t.color!=="default"&&{...r&&{color:o.palette[t.color].contrastText,backgroundColor:o.palette[t.color].main},...a&&{backgroundColor:"transparent",color:o.palette[t.color].main,border:`2px solid ${o.palette[t.color].main}`},...n&&{color:o.palette[t.color][i?"dark":"light"],backgroundColor:g(o.palette[t.color].main,.16)}}};return{height:24,minWidth:24,lineHeight:0,borderRadius:6,cursor:"default",alignItems:"center",whiteSpace:"nowrap",display:"inline-flex",justifyContent:"center",textTransform:"capitalize",padding:o.spacing(0,.75),fontSize:o.typography.pxToRem(12),fontWeight:o.typography.fontWeightBold,transition:o.transitions.create("all",{duration:o.transitions.duration.shorter}),...s,...e}}),f=y.forwardRef(({children:o,color:t="default",variant:i="soft",startIcon:r,endIcon:a,sx:n,...s},e)=>{const u=b(),d={width:16,height:16,"& svg, img":{width:1,height:1,objectFit:"cover"}};return c.jsxs(h,{ref:e,component:"span",ownerState:{color:t,variant:i},sx:{...r&&{pl:.75},...a&&{pr:.75},...n},theme:u,...s,children:[r&&c.jsxs(p,{sx:{mr:.75,...d},children:[" ",r," "]}),o,a&&c.jsxs(p,{sx:{ml:.75,...d},children:[" ",a," "]})]})});f.propTypes={children:l.node,endIcon:l.object,startIcon:l.object,sx:l.object,variant:l.oneOf(["filled","outlined","ghost","soft"]),color:l.oneOf(["default","primary","secondary","info","success","warning","error"])};const k=f;export{k as L};
