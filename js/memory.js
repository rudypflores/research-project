// Array that contains all possible images
const fruits = [
    './img/png/banana.png',
    './img/png/grape.png',
    './img/png/pear.png',
    './img/png/pineapple.png',
    './img/png/strawberry.png',
    './img/png/watermelon.png'
];

// Assign each tile an image at random each time
const table = document.getElementById('table');
const cells = table.getElementsByClassName('cell');

// Will soon be used when view loads
const setup = () => {
    // Creation of array for storing random values
    const rand = [];

    // Make sure to add values from 1-6 only twice each in the array at random
    do {
        let num = Math.floor(Math.random() * fruits.length);
        
        // If two ocurrences of the element are not found
        if(countInArray(rand, num) < 2)
            rand.push(num);
    } while(rand.length !== 12);

    // Add each img into the tiles at random
    for(let i = 0; i < cells.length; i++) {
        let img = document.createElement('img');
        img.src = fruits[rand[i]];
        img.id = i;
        img.style.opacity = 0;
        img.addEventListener('click', () => checkForMatches(img));
        cells[i].appendChild(img);
    }

    // Creation of timer to limit gameplay to a fixed time amount
    timer();
};

// Retrieve the text from the timer
const textTime = document.getElementById('timer');
const textScore = document.getElementById('score');
let time = 30;

// Memory game timer
const timer = () => {
    textTime.innerHTML = time;

    let clock = setInterval(() => {
        textTime.innerHTML = time;
        time--;

        // Stop timer if user has completed game
        if(isCompleted())
            time = -1;

        // Stop timer if the user has run out of time
        if(time < 0) 
            clearInterval(clock);
    }, 1000);
};

let attempts = 0;
let imgStack = [];
let imgPrev = '';
let imgId = ''

// Check for a successful match and add to score if so
const checkForMatches = (img) => {
    if(time > 0) {
        if(attempts < 2) {
            if(imgPrev === img.src) {
                attempts++;
                img.style.opacity = 1;
                imgStack.pop();
                textScore.innerHTML = Number(textScore.innerHTML)+1;
            } else {
                // Add to stack and display
                imgStack.push(img);
                imgPrev = img.src;
                imgId = img.id;
                img.style.opacity = 1;
                attempts++;
            }
        } else if(attempts === 2) {
            // Reset stack and values
            imgStack.forEach(image => {
                image.style.opacity = 0;
            });
            imgStack = [];
            attempts = 0;
            imgPrev = '';
            imgId = '';

            // Add to stack and display
            imgStack.push(img);
            imgPrev = img.src;
            imgId = img.id;
            img.style.opacity = 1;
            attempts++;
        }
    }
};

// Helper method for checking occurences of x in an array
const countInArray = (arr, x) => {
    let count = 0;
    arr.forEach(num => num === x ? count++ : null);
    return count;
}

// Helper method for checking completion of memory game
const isCompleted = () => {
    let tiles = [];

    for(let cell of cells) {
        tiles.push(cell.firstChild.style.opacity);
    }

    if(tiles.includes("0")) {
        return false;
    }

    // Create a continue button and insert to DOM
    let buttonNext = document.createElement('button');
    buttonNext.innerHTML = 'Continue';
    buttonNext.onclick = () => location.href = 'index.html';
    document.body.appendChild(buttonNext);
    return true;
};