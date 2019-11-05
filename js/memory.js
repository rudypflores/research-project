// Array that contains all possible images
const fruits = [
    './img/png/legacy/memory/apple.png',
    './img/png/legacy/memory/cherry.png',
    './img/png/legacy/memory/grapes.png',
    './img/png/legacy/memory/orange.png',
    './img/png/legacy/memory/pear.png',
    './img/png/legacy/memory/pineapple.png'
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
        if(time < 0) {
            clearInterval(clock);
            createButton();
        }
    }, 1000);
};

let attempts = 0;
let imgStack = [];
let imgPrev = '';
let id = '';
let running = false;

// Check for a successful match and add to score if so
const checkForMatches = (img) => {
    if(time > 0 && !running) {
        attempts++;
        img.style.opacity = 1;
        imgStack.push(img);

        // If the match was found
        // This will only happen when two attempts have been made
        if(imgPrev === img.src && id !== img.id) {
            imgStack.forEach(img => {
                img.parentNode.style.opacity = 0;
                img.parentNode.style.cursor = 'auto';
            });
            imgStack[0].style.opacity = 1;
            imgStack = [];
            textScore.innerHTML = Number(textScore.innerHTML)+1;
        }
        // If two attempts at finding a match have been made
        // but no matches were found...
        if(attempts === 2) {
            running = true;
            setTimeout(() => {
                // Reset stack and values
                imgStack.forEach(image => {
                    image.style.opacity = 0;
                });
                imgStack = [];
                attempts = 0;
                imgPrev = '';
                id = '';
                running = false;
            }, 400);
        }
        id = img.id;
        imgPrev = img.src;
    }
};

const createButton = () => {
    // Create a continue button and insert to DOM
    let buttonNext = document.createElement('button');
    buttonNext.innerHTML = 'Continue';
    buttonNext.onclick = () => location.href = 'mathInstructions.html';
    document.body.appendChild(buttonNext);
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

    // Pull opacity data from each cell for the tiles array
    for(let cell of cells) {
        tiles.push(cell.firstChild.style.opacity);
    }

    // if atleast one tile is not completed or is not visible
    if(tiles.includes("0")) {
        return false;
    }
    return true;
};