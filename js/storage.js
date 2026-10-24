// Read/write helpers + date/time helpers (used on every page)
const DB={get:(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const getUsers=()=>DB.get("hcm_users",[]),saveUsers=v=>DB.set("hcm_users",v);
const getCompany=()=>DB.get("hcm_company",null),saveCompany=v=>DB.set("hcm_company",v);
const getAtt=()=>DB.get("hcm_attendance",[]),saveAtt=v=>DB.set("hcm_attendance",v);
const getLeaves=()=>DB.get("hcm_leaves",[]),saveLeaves=v=>DB.set("hcm_leaves",v);
const getAnn=()=>DB.get("hcm_announcements",[]),saveAnn=v=>DB.set("hcm_announcements",v);
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad=n=>String(n).padStart(2,"0");
const ymd=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const today=()=>ymd(new Date());
const nowHM=()=>{const d=new Date();return pad(d.getHours())+":"+pad(d.getMinutes())};
const parseD=s=>{const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)};
const mins=t=>{const [h,m]=t.split(":").map(Number);return h*60+m};
const isWork=s=>(getCompany()?.workDays||[1,2,3,4,5]).includes(parseD(s).getDay());
function workDaysBetween(a,b){let n=0;for(let d=parseD(a);d<=parseD(b);d.setDate(d.getDate()+1))if(isWork(ymd(d)))n++;return n}
const workDaysInMonth=(y,m)=>workDaysBetween(`${y}-${pad(m)}-01`,ymd(new Date(y,m,0)));
const userName=id=>getUsers().find(x=>x.id===id)?.name||"Unknown";
