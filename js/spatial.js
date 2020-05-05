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
        './img/png/legacy/spatial/rot01o.png',
        './img/png/legacy/spatial/rot01x120.png',
        './img/png/legacy/spatial/rot01f.png',
        './img/png/legacy/spatial/rot01f2.png',
        './img/png/legacy/spatial/rot01fx80.png',
    ],
    1: [
        './img/png/legacy/spatial/rot02o.png',
        './img/png/legacy/spatial/rot02z180.png',
        './img/png/legacy/spatial/rot02f.png',
        './img/png/legacy/spatial/rot02f2.png',
        './img/png/legacy/spatial/rot02fz140.png',
    ],
    2: [
        './img/png/legacy/spatial/rot03o.png',
        './img/png/legacy/spatial/rot03z140.png',
        './img/png/legacy/spatial/rot03f.png',
        './img/png/legacy/spatial/rot03fx240.png',
        './img/png/legacy/spatial/rot03fz160x.png',
    ],
    3: [
        './img/png/legacy/spatial/rot04o.png',
        './img/png/legacy/spatial/rot04x260.png',
        './img/png/legacy/spatial/rot04f.png',
        './img/png/legacy/spatial/rot04fx180.png',
        './img/png/legacy/spatial/rot04fz140.png',
    ],
    4: [
        './img/png/legacy/spatial/rot05o.png',
        './img/png/legacy/spatial/rot05z140.png',
        './img/png/legacy/spatial/rot05f.png',
        './img/png/legacy/spatial/rot05f1.png',
        './img/png/legacy/spatial/rot05f2.png',
    ],
    5: [
        './img/png/legacy/spatial/zrot01o.png',
        './img/png/legacy/spatial/zrot01pp140.png',
        './img/png/legacy/spatial/zrot01f.png',
        './img/png/legacy/spatial/zrot01f2.png',
        './img/png/legacy/spatial/zrot01f3.png',
    ],
    6: [
        './img/png/legacy/spatial/zrot02o.png',
        './img/png/legacy/spatial/zrot02z240.png',
        './img/png/legacy/spatial/zrot02f.png',
        './img/png/legacy/spatial/zrot02f1.png',
        './img/png/legacy/spatial/zrot02f2.png',
    ],
    7: [
        './img/png/legacy/spatial/zrot03o.png',
        './img/png/legacy/spatial/zrot03pp160.png',
        './img/png/legacy/spatial/zrot03f.png',
        './img/png/legacy/spatial/zrot03f1.png',
        './img/png/legacy/spatial/zrot03f2.png',
    ],
    8: [
        './img/png/legacy/spatial/zrot06o.png',
        './img/png/legacy/spatial/zrot06pp140.png',
        './img/png/legacy/spatial/zrot06f.png',
        './img/png/legacy/spatial/zrot06f1.png',
        './img/png/legacy/spatial/zrot06f2.png',
    ],
    9: [
        './img/png/legacy/spatial/zrot07o.png',
        './img/png/legacy/spatial/zrot07pp200.png',
        './img/png/legacy/spatial/zrot07f.png',
        './img/png/legacy/spatial/zrot07f1.png',
        './img/png/legacy/spatial/zrot07f2.png',
    ],
    10: [
        './img/png/legacy/spatial/zrot08o.png',
        './img/png/legacy/spatial/zrot08z100.png',
        './img/png/legacy/spatial/zrot08f.png',
        './img/png/legacy/spatial/zrot08f1.png',
        './img/png/legacy/spatial/zrot08f2.png',
    ],
    11: [
        './img/png/legacy/spatial/zrot09o.png',
        './img/png/legacy/spatial/zrot09pp140.png',
        './img/png/legacy/spatial/zrot09f.png',
        './img/png/legacy/spatial/zrot09f1.png',
        './img/png/legacy/spatial/zrot09f2.png',
    ],
    12: [
        './img/png/legacy/spatial/zrot10o.png',
        './img/png/legacy/spatial/zrot10z80.png',
        './img/png/legacy/spatial/zrot10f.png',
        './img/png/legacy/spatial/zrot10f1.png',
        './img/png/legacy/spatial/zrot10f2.png',
    ],
}

/*HELPER FUNCTIONS*/
const generateAnswer = index => {
    console.log(index);

    let bias = Math.floor(Math.random()*2);
    let wrongIndex = Math.floor(Math.random() * (shape[index].length - 2) + 2)

    if(bias === 0)
        return [1, wrongIndex, 0];
    else
        return [wrongIndex, 1, 1];
};

//intial time and score
time = 99999;
points = 0;
timer.innerHTML = time;
score.innerHTML = points;
let i = 0;
let [j, k, key] = generateAnswer(i);

//display image and choices
current.src = shape[i][0];
left.src = shape[i][j];
right.src = shape[i][k];

//verify answer and go to next shape based on the side
//side == 0 means left
//side == 1 means right
const nextProblem = side => {
    left.style.pointerEvents = 'none';
    right.style.pointerEvents = 'none';
    const response = document.createElement('img');
    const imgCorrect = './img/png/legacy/spatial/correct.png';
    const imgIncorrect = './img/png/legacy/spatial/incorrect.png';

    if(key === side) {
        points++;
        response.src = imgCorrect;
        feedback.append(response);
    }
    else {
        response.src = imgIncorrect;
        feedback.append(response);
    }

    i++

    // Prevent overflow
    if(i === Object.keys(shape).length)
        i = 0;

    [j, k, key] = generateAnswer(i); 

    setTimeout(() => {
        feedback.removeChild(feedback.firstChild);

        current.src = shape[i][0];
        left.src = shape[i][j];
        right.src = shape[i][k];
        score.textContent = points;

        left.style.pointerEvents = 'auto';
        right.style.pointerEvents = 'auto';
    }, 1000);
};

left.addEventListener('mouseup', () => nextProblem(0));
right.addEventListener('mouseup', () => nextProblem(1));

//tick clock for every second
const clock = setInterval(() => {
    timer.innerHTML = time--;
    if(time < 0)
        clearInterval(clock);
}, 1000);