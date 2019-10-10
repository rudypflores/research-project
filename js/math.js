// nodes we will access and modify in DOM
const timer = document.getElementById('timer');
const subTimer = document.getElementById('s-timer');
const score = document.getElementById('score');
const problem = document.getElementById('problem');
const input = document.getElementById('input');
const solution = document.getElementById('solution');
const cells = document.getElementsByClassName('cell');

// a map of problems the user can get
let problems = {
    0: '60 + 48',
    1: '10 x 25',
    2: '128 - 35',
    3: '256 + 43',
    4: '512 / 2',
    5: '23 x 13',
}

let solutions = {
    0: '108',
    1: '250',
    2: '93',
    3: '299',
    4: '256',
    5: '299',
}

//function that runs at the initial state of the website
const start = () => {

    //initialize timer and sub timer
    let time = 30;
    let subTime = 10;
    let currentScore = 0;
    let key = Math.floor(Math.random()*6);

    //access submit buttons form the cells HTML collection
    let submit = cells[cells.length-1];
    
    //when submit is clicked increase score by one
    /* THIS IS TEMPORARY */
    submit.addEventListener('click', () => {
        currentScore++;
        score.innerHTML = currentScore;
    });

    //generate a random problem and display to user
    problem.innerHTML = problems[key];

    //start countdown for sub and main timer
    const clockOuter = setInterval(() => {
        //update main timer every second
        timer.innerHTML = time;
        time--;

        //if the time is up...
        if(time < 0) {
            subTime = 0;
            clearInterval(clockOuter);  
        }

        //update sub time every second
        subTimer.innerHTML = subTime;
        subTime--;

        //reset sub time to 10 seconds when it runs out of time
        if(subTime < 0 && time > 0) {
            //display solution
            solution.innerHTML = `Solution of previous question: ${solutions[key]}`;

            //generate new key
            key = Math.floor(Math.random()*6);

            //add new problem from new key
            problem.innerHTML = problems[key];

            subTime = 9;
        }     
    }, 1000); 
}