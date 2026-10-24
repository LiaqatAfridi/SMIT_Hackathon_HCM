// Smart helper: keyword matching on real app data. Employees only get their own data.
function helperAnswer(q,u){
  const t=q.toLowerCase(),d=today(),emps=getUsers().filter(x=>x.role==="employee"),att=getAtt().filter(a=>a.date===d);
  if(u.role==="admin"){
    if(t.includes("pending"))return`${getLeaves().filter(l=>l.status==="pending").length} leave request(s) are pending.`;
    if(t.includes("employee")&&(t.includes("how many")||t.includes("count")))return`You have ${emps.length} employee(s).`;
    if(t.includes("leave")){const n=emps.filter(x=>onLeave(x.id,d)).map(x=>x.name);return n.length?`${n.length} on leave today: ${n.join(", ")}.`:"Nobody is on leave today."}
    if(t.includes("late")){const n=att.filter(a=>a.status==="late").map(a=>`${userName(a.uid)} (${a.in})`);return n.length?`${n.length} late today: ${n.join(", ")}.`:"Nobody was late today."}
    if(t.includes("present"))return`${att.length} employee(s) checked in today.`;
    if(t.includes("absent")){if(!isWork(d))return"Today is not a working day.";const n=emps.filter(x=>!getRec(x.id,d)&&!onLeave(x.id,d)).map(x=>x.name);return n.length?`Not checked in yet: ${n.join(", ")}.`:"Everyone is accounted for."}
  }else{
    if(t.includes("who")||t.includes("everyone")||t.includes("employees"))return"I can only answer about your own data.";
    if(t.includes("late")){const r=getRec(u.id,d);return!r?"You have not checked in today.":r.status==="late"?`Yes, you checked in at ${r.in} (late).`:`No, you checked in at ${r.in}.`}
    if(t.includes("hour")||t.includes("week")){const f=new Date();f.setDate(f.getDate()-6);const h=getAtt().filter(a=>a.uid===u.id&&a.date>=ymd(f)).reduce((s,a)=>s+a.hours,0);return`You worked ${h.toFixed(1)} hours in the last 7 days.`}
    if(t.includes("leave")||t.includes("balance")||t.includes("left"))return`You have ${balance(u.id)} of ${getCompany().quota} leave days left (${usedDays(u.id)} used).`;
    if(t.includes("check"))return getRec(u.id,d)?`You checked in at ${getRec(u.id,d).in}.`:"You have not checked in today."}
  return u.role==="admin"?"Try: How many employees? Who is on leave today? Who was late today? How many pending leaves?":"Try: How many leaves do I have left? Was I late today? How many hours did I work this week?"}
function initChat(u){
  const add=(c,t)=>{$("log").insertAdjacentHTML("beforeend",`<p class="${c}">${esc(t)}</p>`);$("log").scrollTop=1e9};
  add("ai","Hi! Ask me about your data.");
  $("chatF").onsubmit=e=>{e.preventDefault();const q=$("q").value.trim();if(!q)return;add("me",q);add("ai",helperAnswer(q,u));$("q").value=""}}
