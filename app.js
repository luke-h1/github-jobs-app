const form = document.getElementById('form-control');
const jobPreference = document.getElementById('job-input');
const div = document.getElementById('output');
async function fetchJobData(e) {
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
// TODO: SHORTEN LINKS WITH A LINK SHORTENER REGEX FUNCTION

function showJobDataDOM(json) {
  let output = '';
  json.forEach((job) => {
    output += `
    <div class="jobs-container">
      <div class="job">
        <h1>${job.company}</h1>
        <h2>${job.title ? job.title : ''}</h2>
         <img src="${job.company_logo}" /> 
        <div class="card">
          <ul>
            <li>Contract Type: ${job.type ? job.type : ''}</li>
            <li>Location: ${job.location ? job.location : ''}</li>
            <li>Posted At: ${job.created_at ? job.created_at : ''}</li>
            <li>How To Apply: ${job.how_to_apply ? job.how_to_apply : ''}</li>
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
