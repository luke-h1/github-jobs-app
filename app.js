const btn = document.getElementById('getData');
const jobPreference = document.getElementById('job-input');
const div = document.getElementById('output');
const loadingEl = document.getElementById('loading');

// LOADING & ERROR FUNCTIONS
function showLoading() {
  loadingEl.style.display = 'block';
}

function hideLoading() {
  loadingEl.style.display = 'none';
}

function showError(message) {
  const errorEl = document.getElementById('error');
  errorEl.innerHTML = message;
  setTimeout(() => {
    errorEl.innerHTML = '';
  }, 2000);
}

let page = 1; // FOR PAGINATION

// function showLoader() {
//   showLoading();
//   setTimeout(() => {
//     fetchNewPage();
//   }, 300);
// }

async function fetchJobData() {
  const job = jobPreference.value;
  if (job === '') {
    showError('Enter a correct search term');
  } else {
    showLoading();
    const arr = job;
    const API_URL = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${job}&page=${page}
  `;
    const res = await fetch(`${API_URL}`);
    const json = await res.json();
    console.log(json);
    showJobDataDOM(json);
  }
}

// async function fetchNewPage() {
//   const text = jobPreference.value;
//   page++;
//   const PAGINATION_URL = `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${job}&page=${page}`;
//   const response = await fetch(`${PAGINATION_URL}`);
//   const data = await response.json();
//   showJobDataDOM(data);
// };

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

function paginationCheck() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
    fetchJobData();
  }
}

// EVENT LISTENERS
btn.addEventListener('click', fetchJobData);

// window.addEventListener('scroll', paginationCheck);
