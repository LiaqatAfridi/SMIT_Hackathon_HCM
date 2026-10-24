// Check in / out and monthly stats (business rules from the Admin's settings)
const getRec=(uid,date)=>getAtt().find(a=>a.uid===uid&&a.date===date);
function checkIn(uid){
  const c=getCompany(),d=today();
  if(!isWork(d))return"Today is not a working day.";
  if(onLeave(uid,d))return"You are on approved leave today.";
  if(getRec(uid,d))return"You already checked in today.";
  const t=nowHM(),late=mins(t)>mins(c.start)+Number(c.grace);
  const a=getAtt();a.push({uid,date:d,in:t,out:"",status:late?"late":"present",hours:0});saveAtt(a);return""}
function checkOut(uid){
  const a=getAtt(),r=a.find(x=>x.uid===uid&&x.date===today());
  if(!r)return"Check in first.";if(r.out)return"You already checked out.";
  r.out=nowHM();r.hours=+((mins(r.out)-mins(r.in))/60).toFixed(2);
  if(r.hours<5)r.status="half"; // under 5 hours = half day
  saveAtt(a);return""}
function monthStats(u,y,m){
  const first=`${y}-${pad(m)}-01`,last=ymd(new Date(y,m,0)),yest=new Date();yest.setDate(yest.getDate()-1);
  const from=u.joined>first?u.joined:first,to=ymd(yest)<last?ymd(yest):last;let absent=0;
  for(let d=parseD(from);ymd(d)<=to;d.setDate(d.getDate()+1)){const s=ymd(d);if(isWork(s)&&!getRec(u.id,s)&&!onLeave(u.id,s))absent++}
  const r=getAtt().filter(a=>a.uid===u.id&&a.date.startsWith(`${y}-${pad(m)}`));
  return{absent,half:r.filter(x=>x.status==="half").length,late:r.filter(x=>x.status==="late").length,present:r.length}}
