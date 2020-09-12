const form = document.getElementById('form-control');
const jobPreference = document.getElementById('job-input');
const div = document.getElementById('output');
const loadingEl = document.getElementById('loading');
async function fetchJobData(e) {
  showLoading();
  e.preventDefault();
  const job = jobPreference.value;
  // console.log(`Job: ${job}, area: ${area}`);
  const API_URL = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${job}&page=1
  `;
  const res = await fetch(`${API_URL}`);
  const json = await res.json();
  console.log(json);
  showJobDataDOM(json);
}

function showLoading() {
  loadingEl.style.display = 'block';
}

function hideLoading() {
  loadingEl.style.display = 'none';
}

function showJobDataDOM(json) {
  hideLoading();
  let output = '';
  json.forEach((job) => {
    output += `
    <div class="jobs-container">
      <div class="job">
        <h1>${job.company}</h1>
        <h2>${job.title ? job.title : ''}</h2>
         <img src="${job.company_logo}" /> 
        <div class="card">
          <ul class="card--job-details">
            <li>Contract Type: ${job.type ? job.type : ''}</li>
            <li>Location: ${job.location ? job.location : ''}</li>
            <li>Posted At: ${job.created_at ? job.created_at : ''}</li> 
            <li><a href="${job.url ? job.url : ''}">Apply</a></li>
            </ul>
            </div>
      </div>
    </div>
    
    `;
  });
  div.innerHTML = output;
}

// EVENT LISTENERS
form.addEventListener('submit', fetchJobData);
