document.querySelector(".button-container").addEventListener("click", () => {
  let text = document.querySelector("#filter-jobs").value;
  getJobs().then((jobs) => {
    let filteredJobs = filterJobs(jobs, text);
    showJobs(filteredJobs);
  });
  s;
});

const getJobs = () => {
  return fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const filterJobs = (jobs, searchText) => {
  if (searchText) {
    let filteredJobs = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText) ||
        job.type.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.requirements.content.toLowerCase().includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filteredJobs;
  } else {
    return jobs;
  }
};

const showJobs = (jobs) => {
  console.log(jobs);

  let jobsContainer = document.querySelector(".jobs-container");
  let jobsNumber = document.querySelector(".job-number");

  let jobsHTML = "";
  jobsNumber.innerHTML = `Showing ${jobs.length} jobs`;
  jobs.map((job) => {
    jobsHTML += `<form class="job-tile" id="${job.id}" action="jobDescription.html" >
            <div class="top">
              <img src="${job.logo}" alt="company logo" />
              <i class="fas fa-ellipsis-h"></i>
            </div>
            <div class="rolename">
              <span>${job.roleName}</span>
            </div>
            <div class="description">
              <span
                >${job.requirements.content}</span
              >
            </div>
            <div class="buttons">
              <button class="button apply-now" id="apply" type="submit" onSubmit="showClickedJob(
                ${job.id}
              )"> Apply now</button>
              <button class="button">Message</button>
            </div>
          </form>`;
  });
  jobsContainer.innerHTML = jobsHTML;
};

//when the application is loaded
const data = getJobs().then((data) => {
  showJobs(data);
});

const showClickedJob = (id) => {
  console.log(id);
  // getJobs().then((data) => {
  //   let job = data.filter((job) => {
  //     if (job.id === id) {
  //       return true;
  //     }
  //   });
  //   showJobInfo(job);
  // });
};
