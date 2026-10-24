// Leave rules: working days only, no overlap, within yearly quota
const usedDays=(uid,sts=["approved"],y=new Date().getFullYear())=>getLeaves().filter(l=>l.uid===uid&&sts.includes(l.status)&&l.from.startsWith(y)).reduce((s,l)=>s+l.days,0);
const balance=uid=>Number(getCompany().quota)-usedDays(uid);
const onLeave=(uid,date)=>getLeaves().some(l=>l.uid===uid&&l.status==="approved"&&l.from<=date&&date<=l.to);
function applyLeave(uid,f){
  const er={};
  if(!f.type)er.type="Choose a type";
  if(!f.from)er.from="Required";if(!f.to)er.to="Required";
  if(!f.reason.trim())er.reason="Reason is required";
  if(f.from&&f.to){
    if(f.from>f.to)er.to="To date must be on or after From date";
    else{
      const days=workDaysBetween(f.from,f.to);
      if(days<1)er.to="No working days in this range";
      else if(getLeaves().some(l=>l.uid===uid&&l.status!=="rejected"&&l.from<=f.to&&f.from<=l.to))er.from="Overlaps another leave";
      else{const left=Number(getCompany().quota)-usedDays(uid,["approved","pending"],+f.from.slice(0,4));
        if(days>left)er.to=`Not enough quota: ${days} days asked, ${left} left`;
        else{const a=getLeaves();a.push({id:Date.now(),uid,type:f.type,from:f.from,to:f.to,days,reason:f.reason.trim(),status:"pending",comment:""});saveLeaves(a)}}}}
  return er}
