const passageTitle = 'Golf';
const passageText = `Golf is a precision club and ball sport in 
                    which competing players use various clubs to 
                    hit balls into a series of holes on a course 
                    using as few strokes as possible. Golf is defined,
                    in the rules of golf, as playing a ball with a 
                    club from the teeing ground into the hole by a stroke
                    or successive strokes in accordance with the Rules. 
                    It is one of the few ball games that do not require a 
                    standardized playing area. Golf competition is generally
                    played for the lowest number of strokes by an individual,
                    known simply as stroke play.In match play, two players
                    (or two teams) play each hole as a separate contest 
                    against each other. The party with the lower score wins
                    that hole, or if the scores of both players or teams
                    are equal the hole is "halved" (or tied). Stroke play
                    is the game most commonly played by professional golfers.
                    The game is played on a course, in general consisting 
                    of an arranged progression of either nine or 18 holes.
                    The first 18-hole golf course in the United States was
                    on a sheep farm in Downers Grove, Illinois, in 1892.`;

const body = document.getElementById('main');
const title = document.createElement('h1');
const timer = document.createElement('p');
const hr = document.createElement('hr');
const passage = document.createElement('p');
const link = document.createElement('a');
const btnNext = document.createElement('button');
const link = document.createElement('a');

// Passage Title
title.innerHTML = passageTitle;
title.id = 'title';

//Go to next button
link.href = '../colorStroopInstructions.html';
link.append(btnNext);

// Timer
let time = 30;
timer.innerHTML = `00:${time}`;
timer.id = 'timer';
//tick clock every second
const clock = setInterval(() => {
    if(time < 10)
        timer.innerHTML = `00:0${time}`;
    else
        timer.innerHTML = `00:${time}`;
    time--;
    if(time < 0) {
        passage.style.display = 'none';
        body.append(link);
        clearInterval(clock);
    }
}, 1000);

// Horizontal Rule
hr.id = 'seperator';

// Passage text
passage.innerHTML = passageText;
passage.id = 'passage';

// Go to next button
btnNext.innerHTML = 'Next';
link.href = './readingQuestions.html';
link.append(btnNext);

body.append(title);
body.append(timer);
body.append(hr);
body.append(passage);

console.log('here')
