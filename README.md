# HCM Lite — Saylani Hackathon (Beginner Track)
Small HR web app: HTML + CSS + JavaScript only, data in `localStorage`. No framework, no backend.

## How to run
Open `index.html` in a browser (or host the folder on GitHub Pages / Netlify / Vercel).

## How to use
1. **First run:** create the company + Admin account on `index.html`.
2. **Admin → Settings:** office start time, grace minutes, yearly leave quota, working days.
3. **Admin → Employees:** add an employee (this also creates their login: email + password). Edit, delete, search, filter by department.
4. Log out, log in as the employee: **Check in / Check out**, apply for leave, ask the helper.
5. Log in as Admin: **Leaves** page to approve/reject (comment required to reject). Post announcements on the dashboard.
6. **Analytics (Admin):** KPIs, 6 charts, insights, employee report, CSV export (charts need internet for Chart.js CDN).
7. **Payslip:** pick month (Admin also picks employee). Print / Save as PDF.

## Business rules
- Late = check-in after start time + grace. One check-in per day; check-out only after check-in.
- Worked under 5 hours = half day. Working day with no record (and no approved leave) = absent.
- Leave: From <= To, working days only, no overlap, cannot exceed yearly quota.
- Payslip: per day = salary / working days; deduction = per day x (absent + 0.5 x half); net = salary - deduction.

## Smart helper examples
Admin: "How many employees?", "Who is on leave today?", "Who was late today?", "How many pending leaves?"
Employee: "How many leaves do I have left?", "Was I late today?", "How many hours did I work this week?"

## Files
`index.html`, `pages/*.html` (incl. analytics.html), `css/style.css`, `js/storage.js, auth.js, ui.js, employees.js, attendance.js, leave.js, helper.js`

Note: passwords are stored as plain text because this is a learning project; real apps use a server and hashed passwords.
