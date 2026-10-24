// Shared UI: navbar, field errors, announcements
function nav(u){
  const L=u.role==="admin"?[["admin","Dashboard"],["employees","Employees"],["leaves","Leaves"],["analytics","Analytics"],["settings","Settings"],["payslip","Payslip"]]:[["employee","Dashboard"],["payslip","Payslip"]];
  const here=location.pathname.split("/").pop().replace(".html","");
  $("nav").innerHTML=`<b>HCM Lite</b>`+L.map(([p,t])=>`<a href="${p}.html" class="${p===here?"on":""}">${t}</a>`).join("")+
    `<span style="font-size:13px">${esc(u.name)}</span><button id="pw">Password</button><button id="lo">Logout</button>`;
  $("pw").onclick=()=>changePassword(u);$("lo").onclick=logout}
function showErrs(er,fields){fields.forEach(f=>{const e=$("e_"+f);if(e)e.textContent=er[f]||""});return Object.keys(er).length===0}
function renderAnn(el){const a=getAnn().slice().reverse().slice(0,5);
  $(el).innerHTML=a.map(x=>`<div class="ann">${esc(x.text)}<br><small>${x.date}</small></div>`).join("")||"<small>No announcements.</small>"}
const rows=(arr,fn,cols)=>arr.map(fn).join("")||`<tr><td colspan="${cols}">Nothing here yet.</td></tr>`;
const badge=s=>`<span class="b ${s}">${s}</span>`;
