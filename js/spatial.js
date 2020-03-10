const timer = document.getElementById('timer');
const score = document.getElementById('score');

//intial time and score
time = 30;
points = 0;

timer.innerHTML = time;
score.innerHTML = points;

//tick clock for every second
const clock = setInterval(() => {
    
    timer.innerHTML = time--;

    if(time < 0)
        clearInterval(clock);
}, 1000);