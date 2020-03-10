const body = document.getElementById('main');
const timer = document.getElementById('timer');
const subTimer = document.getElementById('sub-timer');
const score = document.getElementById('score');
const colorName = document.getElementById('color-name');
const cells = document.getElementsByClassName('cell');

//map of different colors
const colorList = ['Blue', 'Red', 'Green', 'Yellow'];

//Generate random number within the bounds of the colorList array
const randomColor = () => {
    return colorList[Math.floor(Math.random()*colorList.length)];
};

//Generate a unique color
const generateColor = () => {
    //Get a unique text color
    let textColor = randomColor();
    while(textColor === colorName.innerHTML || textColor === colorName.style.color)
        textColor = randomColor();
    
    //Get a unique highlight color
    let highlightColor = randomColor();
    while(highlightColor === textColor || highlightColor === colorName.style.color)
        highlightColor = randomColor();

    //set colors
    colorName.innerHTML = textColor;
    colorName.style.color = highlightColor;
};

//Initial state of color text and highlight
generateColor();

//Initialize timer and sub timer
let time = 30;
let subTime = 10;

const clock = setInterval(() => {
    timer.innerHTML = time;
    time--;

    subTimer.innerHTML = subTime;
    subTime--;

    if(subTime < 0 && time > 0) {
        subTime = 9;
        generateColor();
    }
    if(time < 0) {
        while(body.hasChildNodes()) {
            body.removeChild(body.firstChild);
        }

        let link = document.createElement('a');
        let btnNext = document.createElement('button');
        
        link.href = './spatialInstructions.html';
        btnNext.innerHTML = 'Next';

        link.append(btnNext);
        body.append(link);

        clearInterval(clock);
    }
}, 1000);

//Start the score at 0
score.innerHTML = '0';

//add click event to cells in table
for(cell of cells) {
    cell.addEventListener('click', (event) => {
        //if the user clicks the right answer...
        if(event.target.innerHTML === colorName.style.color[0].toUpperCase()) {
            score.innerHTML = Number.parseInt(score.innerHTML, 10) + 1;
            subTime = 10;
            generateColor();
        }
    });
}

