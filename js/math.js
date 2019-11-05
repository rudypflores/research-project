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
    0: '60 + 24',
    1: '5 x 5',
    2: '20 - 10',
    3: '25 + 43',
    4: '50 / 2',
    5: '10 x 3',
}
// a map of solutions the user can get
let solutions = {
    0: '84',
    1: '25',
    2: '10',
    3: '68',
    4: '25',
    5: '30',
}
// a map that will track the problems completed by the user
let completed = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
}

//function that runs at the initial state of the website
const start = () => {

    //initialize timer and sub timer
    let time = 30;
    let subTime = 10;
    let currentScore = 0;
    let key = generateKey();
    let userAnswer = '';

    //handle case where no problems are found
    if(!key) {
        problem.parentNode.removeChild(problem);
    }

    //access submit buttons form the cells HTML collection
    let submit = cells[cells.length-1];
    
    //when submit is clicked increase score by one
    //if the answer is right
    submit.addEventListener('click', () => {
        if(userAnswer === solutions[key]) {
            currentScore++;
            score.innerHTML = currentScore;
            subTime = 10;
            key = generateKey();
            problem.innerHTML = problems[key];
            if(!key) {
                let parent = problem.parentNode;
                while(parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
            }
        }
        userAnswer = '';
        input.innerHTML = '';
    });

    //add events to each number in the number pad
    for(let i = 0; i < cells.length-2; i++) {
        cells[i].addEventListener('click', () => {
            input.innerHTML += `${cells[i].firstChild.innerHTML}`;
            userAnswer += `${cells[i].firstChild.innerHTML}`;
        });
    }

    //add event to delete button
    cells[cells.length - 2].addEventListener('click', () => {
        userAnswer = input.innerHTML.substring(0,input.innerHTML.length-1);
        input.innerHTML = input.innerHTML.substring(0,input.innerHTML.length-1);
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
            goToNext();
        }

        //update sub time every second
        subTimer.innerHTML = subTime;
        subTime--;

        //reset sub time to 10 seconds when it runs out of time
        if(subTime < 0 && time > 0) {
            //display solution
            solution.innerHTML = `Solution of previous question: ${solutions[key]}`;

            //generate new key
            key = generateKey();
            if(!key) {
                problem.parentNode.removeChild(problem);
            }

            //add new problem from new key
            problem.innerHTML = problems[key];

            subTime = 9;
        }  
        
        if(!key) {
            clearInterval(clockOuter);
            goToNext();
        }
    }, 1000); 
}

// Generate a randomized key for a question
// the user hasnt seen yet
const generateKey = () => {

    let key;
    let i = 0;

    while(!key && i < 10) {
        let v = Math.floor(Math.random()*6);
        i++;
        if(!completed[v]) {
            key = v;
            completed[v] = true; 
        }
    }
    return key;
};

//create button to go to next section
const goToNext = () => {
    let button = document.createElement('button');
    button.innerHTML = 'Continue';
    document.getElementById('main').appendChild(button);
};