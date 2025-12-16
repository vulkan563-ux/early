 import { jobs } from '../data/jobs.js';
 import { questions } from '../data/questions.js';
 

      let filteredJobs = jobs;
      let state = 'starting';
      let answeredquestions = 0;
      function renderHTML() {
        //1) Start the test  -> state = 'starting'    
        // 2) Send my answer   -> state = 'answering' 
        // 3) Check the results -> state = 'finished'

        if (state === 'starting') {
          let elem = document.querySelector('.changethis');
          elem.innerHTML = `
            <p class="testtextparag">
              This is the early version of the algorithm, that helps to find the job (jobs), which match your characteristics
            </p>
            <p>
              <button class="startbutton cssstartbut"  >
                Start the test
              </button>
            </p>
          `;
          document.querySelector('.startbutton').addEventListener('mouseenter', () => {
            document.querySelector('.startbutton').innerHTML = `&check;`;
          });

          document.querySelector('.startbutton').addEventListener('mouseleave', () => {
            document.querySelector('.startbutton').innerHTML = `Start the test`;
          });
          
          document.querySelector('.startbutton').addEventListener('click', () => {
            state = 'answering';
            renderHTML();
          });
        }
        else if (state === 'answering') {
            let numberOfQuestion = answeredquestions + 1;
            let questionObject = questions[numberOfQuestion - 1];
          
            numberOfQuestion === questions.length?  document.querySelector('.changethis').innerHTML = `
          <p class="testtextparag">
            ${numberOfQuestion}) ${questions[numberOfQuestion - 1].question}
          </p>
          <input type = "range" class="inputs css-input">
          <button class="sendbuttons csssendbut">
            &#8594;
          </button>`: document.querySelector('.changethis').innerHTML = `
          <p class="testtextparag">
            ${numberOfQuestion}) ${questions[numberOfQuestion - 1].question}
          </p>
          <input type = "range" class="inputs css-input">
          <button class="sendbuttons csssendbut">
            &#8594;
          </button>`;


          document.querySelector('.sendbuttons').addEventListener('click', () => {
            
            changethearray(questionObject);
            
            if (numberOfQuestion === questions.length) {
              answeredquestions ++; 
              state = 'finished'; 
              renderHTML();
            } else {
              answeredquestions ++; 
              renderHTML();
            }
          })
        }
        else if (state === 'finished') {
            
            if (returnjobs() === '') {
              document.querySelector('.changethis').innerHTML = `
              <p class="testtextparag">
                Unfortunately, we didn't find a match for you. Try passing test again.
              </p>
              <button class="tryagainbut cssrefreshbut">
                Try again
              </button>`;
            }
            else if (filteredJobs.length === 1) {
                document.querySelector('.changethis').innerHTML = `
              <p class="testtextparag">
                Your ideal occupation is <strong>${returnjobs()}</strong>
              </p>
              <button class="tryagainbut cssrefreshbut">
                Try again
              </button>`;
            }
            
            else {
              document.querySelector('.changethis').innerHTML = `
              <p class="testtextparag">
                Your ideal occupations are <strong>${returnjobs()}</strong>
              </p>
              <button class="tryagainbut cssrefreshbut">
                Try again
              </button>`;
            }

            document.querySelector('.tryagainbut').addEventListener('mouseenter', () => {
              document.querySelector('.tryagainbut').innerHTML = `&check;`;
            });

            document.querySelector('.tryagainbut').addEventListener('mouseleave', () => {
              document.querySelector('.tryagainbut').innerHTML = `Try again`;
            });
            
            
            document.querySelector('.tryagainbut').addEventListener('click', () => {
              state = 'starting';
              answeredquestions = 0;
              filteredJobs = jobs;
              renderHTML()
            })
        }
      };

      function changethearray(obj) {
        let currentvalue = document.querySelector('.inputs').value;
        let weight = currentvalue/100;
        console.log(filteredJobs);
        
    

        if (weight >= obj.bp2) {
          filteredJobs = filteredJobs.filter(job => job[obj.param1] >= obj.bp2)
        }
        else if (weight <= obj.bp1) {
          filteredJobs = filteredJobs.filter(job => job[obj.param1] <= obj.bp1)
        } 
        console.log(filteredJobs);
        };

        function returnjobs() {
        let string = '';
        

        filteredJobs.forEach((job) => {
          if (job === filteredJobs[filteredJobs.length - 1]) {
            string += `${job.name} .`
          }
          else {
            string += `${job.name}, `
          }
        })

        return string
      };
      renderHTML();
