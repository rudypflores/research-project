const main = document.getElementById('main');
const timer = document.getElementById('timer');
const score = document.getElementById('score');
const feedback = document.getElementById('feedback');
const current = document.getElementById('current');
const left = document.getElementById('left');
const right = document.getElementById('right');

//Groups for shapes
const shape = {
    0: [
        './img/png/legacy/spatial/rot01f.png',
        './img/png/legacy/spatial/rot01f2.png',
        './img/png/legacy/spatial/rot01fx80.png',
        './img/png/legacy/spatial/rot01o.png',
        './img/png/legacy/spatial/rot01x120.png',
    ],
    1: [
        './img/png/legacy/spatial/rot02f.png',
        './img/png/legacy/spatial/rot02f2.png',
        './img/png/legacy/spatial/rot02fz140.png',
        './img/png/legacy/spatial/rot02o.png',
        './img/png/legacy/spatial/rot02z180.png',
    ],
    2: [
        './img/png/legacy/spatial/rot03f.png',
        './img/png/legacy/spatial/rot03fx240.png',
        './img/png/legacy/spatial/rot03fz160x.png',
        './img/png/legacy/spatial/rot03o.png',
        './img/png/legacy/spatial/rot03z140.png',
    ],
    3: [
        './img/png/legacy/spatial/rot04f.png',
        './img/png/legacy/spatial/rot04fx180.png',
        './img/png/legacy/spatial/rot04fz140.png',
        './img/png/legacy/spatial/rot04o.png',
        './img/png/legacy/spatial/rot04x260.png',
    ],
    4: [
        './img/png/legacy/spatial/rot05f.png',
        './img/png/legacy/spatial/rot05f1.png',
        './img/png/legacy/spatial/rot05f2.png',
        './img/png/legacy/spatial/rot05o.png',
        './img/png/legacy/spatial/rot05z140.png',
    ],
    5: [
        './img/png/legacy/spatial/zrot01f.png',
        './img/png/legacy/spatial/zrot01f2.png',
        './img/png/legacy/spatial/zrot01f3.png',
        './img/png/legacy/spatial/zrot01o.png',
        './img/png/legacy/spatial/zrot01pp140.png',
    ],
    6: [
        './img/png/legacy/spatial/zrot02f.png',
        './img/png/legacy/spatial/zrot02f1.png',
        './img/png/legacy/spatial/zrot02f2.png',
        './img/png/legacy/spatial/zrot02o.png',
        './img/png/legacy/spatial/zrot02z240.png',
    ],
    7: [
        './img/png/legacy/spatial/zrot03f.png',
        './img/png/legacy/spatial/zrot03f1.png',
        './img/png/legacy/spatial/zrot03f2.png',
        './img/png/legacy/spatial/zrot03o.png',
        './img/png/legacy/spatial/zrot03pp160.png',
    ],
    8: [
        './img/png/legacy/spatial/zrot06f.png',
        './img/png/legacy/spatial/zrot06f1.png',
        './img/png/legacy/spatial/zrot06f2.png',
        './img/png/legacy/spatial/zrot06o.png',
        './img/png/legacy/spatial/zrot06pp140.png',
    ],
    9: [
        './img/png/legacy/spatial/zrot07f.png',
        './img/png/legacy/spatial/zrot07f1.png',
        './img/png/legacy/spatial/zrot07f2.png',
        './img/png/legacy/spatial/zrot07o.png',
        './img/png/legacy/spatial/zrot07pp200.png',
    ],
    10: [
        './img/png/legacy/spatial/zrot08f.png',
        './img/png/legacy/spatial/zrot08f1.png',
        './img/png/legacy/spatial/zrot08f2.png',
        './img/png/legacy/spatial/zrot08o.png',
        './img/png/legacy/spatial/zrot08z100.png',
    ],
    11: [
        './img/png/legacy/spatial/zrot09f.png',
        './img/png/legacy/spatial/zrot09f1.png',
        './img/png/legacy/spatial/zrot09f2.png',
        './img/png/legacy/spatial/zrot09o.png',
        './img/png/legacy/spatial/zrot09pp140.png',
    ],
    12: [
        './img/png/legacy/spatial/zrot10f.png',
        './img/png/legacy/spatial/zrot10f1.png',
        './img/png/legacy/spatial/zrot10f2.png',
        './img/png/legacy/spatial/zrot10o.png',
        './img/png/legacy/spatial/zrot10z80.png',
    ],
}

/*HELPER FUNCTIONS*/
//generate two different images within a range
const generateImage = () => {
    return Math.floor(Math.random() * 4 + 1);
};

//generate two numbers 0-1 that will represent the correct and wrong answer
const generateBiases = () => {
    let bias = Math.floor(Math.random() * 2);
    return [bias, bias === 0 ? 1 : 0];
};

//intial time and score
time = 30;
points = 0;
timer.innerHTML = time;
score.innerHTML = points;
let i = 0;
let j = 0;
let [x, y] = generateBiases();

//display image and choices
current.src = shape[i][j];
left.src = shape[i+x][generateImage()];
right.src = shape[i+y][generateImage()];

//verify answer and go to next shape
const nextProblem = (shapeClicked) => {
    left.style.pointerEvents = 'none';
    right.style.pointerEvents = 'none';
    //verify answer
    let result = document.createElement('img');
    if(i === shapeClicked) {
        points++;
        score.innerHTML = points;
        result.src = './img/png/legacy/spatial/correct.png';
    }
    else {
        result.src = './img/png/legacy/spatial/incorrect.png';
    }
    feedback.append(result);

    //display result and generate a new problem with choices
    setTimeout(() => {
        feedback.removeChild(feedback.firstChild)
    
        //change problem
        i++;
        if(i === Object.keys(shape).length)
            i = 0;
        current.src = shape[i][j];

        //generate new choices
        [x,y] = generateBiases();

        //handle case when bias x or y is greater than shape length
        if(i+x === Object.keys(shape).length)
            x = -x;
        if(i+y === Object.keys(shape).length)
            y = -y;

        left.src = shape[i+x][generateImage()];
        right.src = shape[i+y][generateImage()];
        left.style.pointerEvents = 'auto';
        right.style.pointerEvents = 'auto';
    },1000);
};

left.addEventListener('mouseup', () => nextProblem(i+x));
right.addEventListener('mouseup', () => nextProblem(i+y));

//tick clock for every second
const clock = setInterval(() => {
    timer.innerHTML = time--;
    if(time < 0)
        clearInterval(clock);
}, 1000);