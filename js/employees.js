// Manage employees: add (creates login), edit, delete, search, filter
const u=guard("admin");
if(u){nav(u);
const F=["name","email","password","department","salary","joined"];
function reset(){$("f").reset();$("editId").value="";$("joined").value=today();$("ft").textContent="Add employee";$("sv").textContent="Add employee";$("cx").hidden=true;$("pn").textContent="(min 4)";showErrs({},F)}
function list(){
  const q=$("search").value.toLowerCase(),dep=$("dep").value,all=getUsers().filter(x=>x.role==="employee"),deps=[...new Set(all.map(x=>x.department))];
  $("dep").innerHTML='<option value="">All departments</option>'+deps.map(d=>`<option ${d===dep?"selected":""}>${esc(d)}</option>`).join("");
  $("dl").innerHTML=deps.map(d=>`<option value="${esc(d)}">`).join("");
  $("rows").innerHTML=rows(all.filter(x=>(x.name+x.email).toLowerCase().includes(q)&&(!dep||x.department===dep)),
    x=>`<tr><td>${esc(x.name)}</td><td>${esc(x.email)}</td><td>${esc(x.department)}</td><td>${x.salary}</td><td><button class="btn sm" data-e="${x.id}">Edit</button> <button class="btn sm red" data-d="${x.id}">Delete</button></td></tr>`,5)}
$("f").onsubmit=e=>{e.preventDefault();
  const v=k=>$(k).value.trim(),users=getUsers(),id=+$("editId").value,er={};
  if(!v("name"))er.name="Name is required";
  if(!v("email"))er.email="Email is required";
  else if(!/^\S+@\S+\.\S+$/.test(v("email")))er.email="Enter a valid email";
  else if(users.some(x=>x.email.toLowerCase()===v("email").toLowerCase()&&x.id!==id))er.email="This email is already used";
  if((!id||$("password").value)&&$("password").value.length<4)er.password="Password must be at least 4 characters";
  if(!v("department"))er.department="Department is required";
  if(!(+v("salary")>0))er.salary="Salary must be greater than 0";
  if(!v("joined"))er.joined="Joining date is required";
  if(!showErrs(er,F))return;
  const data={name:v("name"),email:v("email"),department:v("department"),salary:+v("salary"),joined:v("joined")};
  if(id){const x=users.find(y=>y.id===id);Object.assign(x,data);if($("password").value)x.password=$("password").value}
  else users.push({id:Date.now(),password:$("password").value,role:"employee",...data});
  saveUsers(users);reset();list()};
$("rows").onclick=e=>{
  const ed=e.target.dataset.e,dl=e.target.dataset.d;
  if(ed){const x=getUsers().find(y=>y.id===+ed);F.forEach(k=>k!=="password"&&($(k).value=x[k]));$("password").value="";$("editId").value=x.id;
    $("ft").textContent="Edit employee";$("sv").textContent="Save changes";$("cx").hidden=false;$("pn").textContent="(leave blank to keep)";scrollTo(0,0)}
  if(dl&&confirm("Delete this employee and their records?")){const id=+dl;
    saveUsers(getUsers().filter(x=>x.id!==id));saveAtt(getAtt().filter(a=>a.uid!==id));saveLeaves(getLeaves().filter(l=>l.uid!==id));list()}};
$("cx").onclick=reset;$("search").oninput=list;$("dep").onchange=list;
reset();list()}
