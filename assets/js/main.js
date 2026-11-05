document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
  const dateEl = document.getElementById('topDate');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-BD', {day:'numeric',month:'short',year:'numeric'});
  const loginTime = document.getElementById('loginDateTime');
  const updateClock = () => { if (loginTime) loginTime.textContent = 'Current date & time: ' + new Date().toLocaleString('en-BD', {dateStyle:'full',timeStyle:'medium'}); };
  updateClock(); if (loginTime) setInterval(updateClock, 1000);

  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const message = document.getElementById('loginMessage');
    if (!loginForm.reportValidity()) return;
    const submittedAt = new Date().toLocaleString('en-BD');
    message.innerHTML = `<div class="alert alert-success mb-0"><strong>Demo login submitted!</strong><br>Welcome, ${escapeHTML(username)}. Form submitted at ${submittedAt}. This demonstration does not authenticate users or store passwords.</div>`;
    window.alert('Login form submitted successfully!\\nUsername: ' + username + '\\nTime: ' + submittedAt + '\\n\\nDemo only — no account was authenticated.');
  });

  const resultForm = document.getElementById('resultForm');
  if (resultForm) resultForm.addEventListener('submit', event => {
    event.preventDefault();
    const id = document.getElementById('studentId').value.trim().toUpperCase();
    const dept = document.getElementById('department').value;
    const students = {
      'GMS-1001': {name:'Rafi Ahmed', department:'Science', className:'10', gpa:'5.00', grade:'A+'},
      'GMS-1002': {name:'Sumaiya Islam', department:'Business Studies', className:'10', gpa:'5.00', grade:'A+'},
      'GMS-1003': {name:'Nafis Rahman', department:'Humanities', className:'10', gpa:'5.00', grade:'A+'},
      'GMS-0904': {name:'Jannatul Ferdous', department:'Science', className:'9', gpa:'4.80', grade:'A'},
      'GMS-0805': {name:'Adnan Hossain', department:'Business Studies', className:'8', gpa:'4.60', grade:'A'}
    };
    const s = students[id], output = document.getElementById('resultOutput');
    if (s && s.department === dept) {
      output.innerHTML = `<div class="alert alert-success"><h3 class="h5">Result found</h3><div class="table-responsive"><table class="table mb-0"><tr><th>Student name</th><td>${escapeHTML(s.name)}</td></tr><tr><th>Student ID</th><td>${escapeHTML(id)}</td></tr><tr><th>Class</th><td>${s.className}</td></tr><tr><th>Department</th><td>${escapeHTML(s.department)}</td></tr><tr><th>Grade</th><td>${s.grade}</td></tr><tr><th>GPA</th><td><strong>${s.gpa}</strong></td></tr></table></div><small>Sample data for demonstration only.</small></div>`;
    } else {
      output.innerHTML = '<div class="alert alert-warning mb-0">No matching sample result found. Check the student ID and department. Try GMS-1001, GMS-1002 or GMS-1003.</div>';
    }
  });
});
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
