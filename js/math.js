// nodes we will access and modify in DOM
const timer = document.getElementById('timer');
const subTimer = document.getElementById('s-timer');
const score = document.getElementById('score');
const problem = document.getElementById('problem');
const input = document.getElementById('input');
const solution = document.getElementById('solution');
const cells = document.getElementsByClassName('cell');

//function that runs at the initial state of the website
const start = () => {
    //initialize timer and sub timer
    let time = 30;
    let subTime = 10;
    let userAnswer = '';
    let [a,p,b] = getProblem(); //structure works like [a, operator, b]
    let answer = getSolution(a,p,b);

    //map representing operators
    let map = {
        0:'+',
        1:'-',
        2:'x',
    }

    //display problem on start
    problem.innerHTML = `${a} ${map[p]} ${b}`;

    //receive the user's input through their keyboard
    window.addEventListener('keydown', (event) => {
        //check for number press
        if(isFinite(event.key) || event.key == '-') {
            input.innerHTML += `${event.key}`;
            userAnswer += `${event.key}`;
        }
        //check if the input the user submitted is correct
        if(event.key === 'Enter') {
            if(userAnswer === answer.toString()) {
                //increase score
                score.innerHTML = `${parseInt(score.innerHTML,10)+1}`;
                //generate new problem and answer
                [a,p,b] = getProblem();
                answer = getSolution(a,p,b);
                //project new problem and solution to user
                problem.innerHTML = `${a} ${map[p]} ${b}`;
                //clear input from user
                input.innerHTML = '';
                userAnswer = '';
                subTime = 10;
            }
        }
        //allow user to delete input when backspace is pressed
        if(event.key === 'Backspace') {
            input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length-1);
            userAnswer = userAnswer.slice(0, userAnswer.length-1);
        }
    });

    //Allow for button input through mouse
    for(let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('mouseup', () => {
            if(i < cells.length-2)
                input.innerHTML += `${cells[i].textContent}`;
            else if(i === 10) {
                input.innerHTML = input.innerHTML.slice(0, input.innerHTML.length-1);
                userAnswer = userAnswer.slice(0, userAnswer.length-1);
            } else {
                //increase score
                score.innerHTML = `${parseInt(score.innerHTML,10)+1}`;
                //generate new problem and answer
                [a,p,b] = getProblem();
                answer = getSolution(a,p,b);
                //project new problem and solution to user
                problem.innerHTML = `${a} ${map[p]} ${b}`;
                //clear input from user
                input.innerHTML = '';
                userAnswer = '';
                subTime = 10;
            }
        });
    }

    //timer for task including the subtimer
    const clock = setInterval(() => {
        //decrease time by one second
        time--;
        subTime--;

        //display current subtime and timer for user
        timer.innerHTML = time;
        subTimer.innerHTML = subTime;

        //when time is up
        if(time === 0) {
            clearInterval(clock);
            window.location.href = '../readingInstructions.html'
        }
        //when subtimer reaches 0
        if(subTime === 0 && time !== 0) {
            //reset subtimer
            subTime = 10;
            //display to user the solution to previous problem
            solution.innerHTML = `Solution of previous problem: ${a}${map[p]}${b} = ${answer}`;
            //generate new problem and answer
            [a,p,b] = getProblem();
            answer = getSolution(a,p,b);
            //project new problem and solution to user
            problem.innerHTML = `${a} ${map[p]} ${b}`;
            //clear input from user
            input.innerHTML = '';
            userAnswer = '';
        }
    }, 1000);
}

//generates two random numbers 'a' and 'b' as well as a key from 0-3 that's random
const getProblem = () => {
    let a = Math.floor(Math.random()*16+1);
    let operator = Math.floor(Math.random()*3);
    let b = Math.floor(Math.random()*16+1);
    return [a, operator, b];
};

//works with the destructured array to generate the result to a random operation
const getSolution = (a, problem, b) => {
    switch(problem) {
        case 0: 
            return a + b;
        case 1:
            return a - b;
        case 2: 
            return a * b;
        case 3:
            return Math.floor(a / b);
        default:
            return;
    }
};