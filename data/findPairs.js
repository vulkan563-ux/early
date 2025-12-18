import { questions } from './questions.js';
import { jobs } from './jobs.js';
let filteredJobs = jobs;
export  function findPairs() {

      //Создаем массив где будут пары
      let arrayOfMatches = [];
      
      // Тут мы как резульзат получаем массив с параметрами предсталенными в виде string
      let arrayOfParams = [];
      questions.forEach((q) => {
        arrayOfParams.push(q.param1)
      });


      filteredJobs.forEach((job) => {
        // Снизу выполняется код для каждой профессии в массиве "filteredJobs"
        
        // Для определенной профессии создаем массив профессий, исключающий данную (т.к. мы не сравниваем оиднаковые)
        let excludingJobs = filteredJobs.filter((j) => j != job);
        
        //Снизу код где мы сравниваем определенную профессию и каждую профессию из нашего "исключающего" массива профессий. Тоесть вот тут как раз и выполнуется сравнение один на один
        excludingJobs.forEach((exclJob) => {
          let moves = '';
          let isMatching = '';
          
          // Логика такая что признание что професии матчатся происходит только если успешно сочитаются последние параметры и проверочная переменная ifMatching пустая. Логично что если последнее условие матчится и значение не равно '', которое идет по умолчанию, то значение переменной менялось. Вот как раз когда хоть одно условие не матчится то значение меняется на фалс и его невозможно поменять на что либо еще
          /* ифка для более обшироного - if (
              (job[param] <= 0.4 && exclJob[param] <= 0.4) || 
              (job[param] >= 0.6 && exclJob[param] >= 0.6) ||
              (job[param] > 0.4 && job[param] < 0.6 && exclJob[param] > 0.4 && exclJob[param] < 0.6)
            )*/
          arrayOfParams.forEach((param) => {
            /*if ((job[param] <= 0.4 && exclJob[param] <= 0.4) || (job[param] >= 0.6 && exclJob[param] >= 0.6)) {
              if (param === arrayOfParams[arrayOfParams.length - 1] && isMatching === '') {
                isMatching = true;
              }
            }*/

              if ((job[param] <= 0.4 && exclJob[param] <= 0.4)) {
                moves += 'L';
                if (param === arrayOfParams[arrayOfParams.length - 1] && isMatching === '') {
                  isMatching = true;
                }
              }
              else if ((job[param] >= 0.6 && exclJob[param] >= 0.6)) {
                moves += 'H';
                if (param === arrayOfParams[arrayOfParams.length - 1] && isMatching === '') {
                  isMatching = true;
                }
              } 
              /*else if ((job[param] < 0.6 && job[param] > 0.4 && exclJob[param] < 0.6 && exclJob[param] > 0.4)) {
                moves += 'S';
                if (param === arrayOfParams[arrayOfParams.length - 1] && isMatching === '') {
                  isMatching = true;
                }
              }*/
              
              else {isMatching = false}
          });

          // Тут нужна еще одна проверка - логично что если профессия х и у заматчились когда мы чекали через х, то они заматчатся когда мы будем чекать через у. Чтобы избежать дублирования, мы чекаем существует ли уже она. Но тут замечу что если мы чекаем через х, то пара будет выглядеть так: 'x.name and y.name'. Но дубликат возможен когда мы чекаем через у, то есть пара будет выглядеть так: 'y.name and x.name'. Тоесть когда мы мы наши матч нужно чекнуть не существует ли он уже, но с другой формулировкой
          let ifExistsAlready = false;
          let existingObj = '';
            
          arrayOfMatches.forEach((matchObject) => {
              if (matchObject.move === `${moves}`) {
                ifExistsAlready = true;
                existingObj = matchObject;
              }
            });
            if (isMatching === true && ifExistsAlready === false) {
            arrayOfMatches.push(
              {move: `${moves}`, occupations: [{name: `${job.name}`},{name: `${exclJob.name}`}],}
            )
            }
            else if (isMatching === true && ifExistsAlready === true) {
              arrayOfMatches.forEach((obj) => {
                if (obj === existingObj) {
                  let doesJobAlreadyExists = false;
                  let doesExclJobAlreadyExists = false;


                  obj.occupations.forEach((occupation) => {
                    if (occupation.name === job.name) {
                      doesJobAlreadyExists = true
                    }
                    else if (occupation.name === exclJob.name) {
                      doesExclJobAlreadyExists = true
                    }
                  });
                  if (doesJobAlreadyExists === false) {
                    obj.occupations.push({name: `${job.name}`})
                  };
                  if (doesExclJobAlreadyExists === false) {
                    obj.occupations.push({name: `${exclJob.name}`})
                  };
                }
              })
            }
        
        })
      })
    
      //Ну и тут просто смотрим в массив и заносим в стринг пары
      let string ='';

      if (arrayOfMatches.length === 0) {
          string = 'Not found'
        } else {
          arrayOfMatches.forEach((obj) => {
            if (arrayOfMatches[arrayOfMatches.length - 1] === obj) {
              obj.occupations.forEach((occupation) => {
                if (occupation === obj.occupations[obj.occupations.length - 1]) {
                  string += ` ${occupation.name}`
                }
                else {
                  string += ` ${occupation.name},`
                }
              })
              string += `: ${obj.move}.`
            } else {
              obj.occupations.forEach((occupation) => {
                if (occupation === obj.occupations[obj.occupations.length - 1]) {
                  string += ` ${occupation.name}`
                }
                else {
                  string += ` ${occupation.name},`
                }
              })
              string += `: ${obj.move};\n`
            }
          })
        };
      return string
    };