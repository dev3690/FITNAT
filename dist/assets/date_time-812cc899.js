const r=e=>{const t=new Date(e),a=t.getUTCFullYear(),n=String(t.getUTCMonth()+1).padStart(2,"0"),c=String(t.getUTCDate()).padStart(2,"0"),o=`${a}-${n}-${c}`;return console.log(o),o},s=e=>{const t=new Date,a=new Date(e.start_date),n=new Date(e.end_date),c=Math.ceil((n-a)/(7*24*60*60*1e3));return{currentWeek:Math.ceil((t-a)/(7*24*60*60*1e3)),totalWeeks:c}};export{s as c,r as f};
