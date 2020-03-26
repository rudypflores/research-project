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
        window.location.href = '../spatialInstructions.html';
        clearInterval(clock);
    }
}, 1000);

//Start the score at 0
score.innerHTML = '0';
const correctIcon = document.createElement('img');
const wrongIcon = document.createElement('img');

correctIcon.src = '../img/png/legacy/colorstroop/correct.png';
correctIcon.style.position = 'absolute';
correctIcon.style.zIndex = '1';
wrongIcon.src = '../img/png/legacy/colorstroop/incorrect.png';
wrongIcon.style.position = 'absolute';
wrongIcon.style.zIndex = '1';

const toggleClickEvent = (mode) => {
    for(cell of cells)
        cell.style.pointerEvents = mode === 0 ? 'none' : 'auto'; 
}

//add click event to cells in table
for(cell of cells) {
    cell.addEventListener('click', (event) => {
        const parent = event.target.parentNode;
        //if the user clicks the right answer...
        if(event.target.innerHTML === colorName.style.color[0].toUpperCase()) {
            parent.append(correctIcon);
            score.innerHTML = Number.parseInt(score.innerHTML, 10) + 1;
            subTime = 10;
            toggleClickEvent(0);

            setTimeout(() => {
                parent.removeChild(correctIcon);
                generateColor();
                toggleClickEvent(1);
            }, 1000);
        } 
        else { //if the wrong answer is selected...
            //find correct answer
            for(cell of cells) {
                if(cell.firstChild.innerHTML === colorName.style.color[0].toUpperCase()) {
                    const correctAnswer = cell; //store cell because the function is not async
                    correctAnswer.append(correctIcon);
                    parent.append(wrongIcon);
                    toggleClickEvent(0);
                    setTimeout(() => { //when waiting a second the reference of cell becomes always the last node!
                        parent.removeChild(wrongIcon);
                        correctAnswer.removeChild(correctAnswer.lastChild);
                        generateColor();
                        toggleClickEvent(1);
                    }, 1000);
                }
            }
        }
    });
}