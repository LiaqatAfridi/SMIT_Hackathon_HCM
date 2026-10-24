// Session, login, route guard
const getSession=()=>DB.get("hcm_session",null);
const homeFor=u=>u.role==="admin"?"admin.html":"employee.html";
function guard(role){ // call at top of each page; returns the user or redirects
  const s=getSession(),u=s&&getUsers().find(x=>x.id===s.id);
  if(!u){location.href="../index.html";return null}
  if(role&&u.role!==role){location.href=homeFor(u);return null}
  return u}
function login(email,password){
  const u=getUsers().find(x=>x.email.toLowerCase()===email.trim().toLowerCase()&&x.password===password);
  if(!u)return null;DB.set("hcm_session",{id:u.id});return u}
function logout(){localStorage.removeItem("hcm_session");location.href="../index.html"}
function changePassword(u){
  const cur=prompt("Current password:");if(cur===null)return;
  if(cur!==u.password)return alert("Current password is wrong.");
  const n=prompt("New password (min 4 characters):");if(n===null)return;
  if(n.length<4)return alert("Password is too short.");
  const all=getUsers();all.find(x=>x.id===u.id).password=n;saveUsers(all);alert("Password changed.")}
