let chooseCon = document.querySelector('.choose')
let resultCon = document.querySelector('.result');

const start = () => {
    let startCon = document.querySelector('.start');
    startCon.addEventListener('click', (e) => {
        e.preventDefault()
        startCon.style.display = 'none'
        chooseCon.style.display = 'block'
    })
}

const handOptions = {
    'rock': '✊',
    'paper': '✋',
    'scissors': '✌️'
}

const textOptions = {
    'rock': 'Rock',
    'paper': 'Paper',
    'scissors': 'Scissors'
}

let SCORE = 0;
let SCORE_COMP = 0;
let ROUNDS = 0;
let losserCount = 0;
let winnerCount = 0;

const userChoose = (hand) => {
    chooseCon.style.display = 'none'
    resultCon.style.display = 'block'
    document.getElementById('userHand').innerHTML = handOptions[hand];
    document.getElementById('userOption').innerHTML = textOptions[hand];
    ROUNDS++;
    document.getElementById('round').innerHTML = `Round ${ROUNDS}`
    let compHand = compChoose();
    winner(hand, compHand)

    if(ROUNDS % 3 === 0) {
        roundsWinner()
    } else{
        document.querySelector('.winner').style.display = 'none';
    }
}

const compChoose = () => {
    let result = ['rock', 'paper', 'scissors'];
    let randItem = result[Math.floor(Math.random() * result.length)];

    document.getElementById('compHand').innerHTML = handOptions[randItem];
    document.getElementById('compOption').innerHTML = textOptions[randItem];

    return randItem
}

const winner = (userH, compH) => {
    if (userH === 'paper' && compH === 'scissors') {
        result('YOU LOSE!');
        losserCount++;
        SCORE_COMP++;
    }
    if (userH === 'paper' && compH === 'rock') {
        result('YOU WIN!');
        winnerCount++;
        SCORE++;
    }
    if (userH === 'paper' && compH === 'paper') {
        result("It's a tie!");
    }
    if (userH === 'rock' && compH === 'scissors') {
        result('YOU WIN!');
        winnerCount++;
        SCORE++;
    }
    if (userH === 'rock' && compH === 'paper') {
        result('YOU LOSE!');
        losserCount++;
        SCORE_COMP++;
    }
    if (userH === 'rock' && compH === 'rock') {
        result("It's a tie!");
    }
    if (userH === 'scissors' && compH === 'scissors') {
        result("It's a tie!");
    }
    if (userH === 'scissors' && compH === 'rock') {
        result('YOU LOSE!');
        losserCount++;
        SCORE_COMP++;
    }
    if (userH === 'scissors' && compH === 'paper') {
        result('YOU WIN!');
        winnerCount++;
        SCORE++;
    }
    score(SCORE, SCORE_COMP)
}

const result = (res) => {
    document.getElementById('winner').innerHTML = res;
}

const score = (scoreUser, scoreComp) => {
    document.getElementById('score').innerHTML = scoreUser;
    document.getElementById('scoreC').innerHTML = scoreComp;
}

const playAgain = () => {
    chooseCon.style.display = 'block'
    resultCon.style.display = 'none'
}

const reset = () => {
    SCORE = 0;
    SCORE_COMP = 0;
    ROUNDS = 0;
    document.getElementById('score').innerHTML = SCORE;
    document.getElementById('scoreC').innerHTML = SCORE_COMP;
    document.getElementById('round').innerHTML = ROUNDS;
}

const roundsWinner = () => {
    document.querySelector('.winner').style.display = 'block';
    if(winnerCount > losserCount) {
        document.getElementById('winner__text').innerHTML = 'YOU WON!!!';
    } else if (winnerCount < losserCount){
        document.getElementById('winner__text').innerHTML = 'YOU LOST!!!';
    } else {
        document.getElementById('winner__text').innerHTML = 'TIE!!!';
    }
    winnerCount = 0;
    losserCount = 0;
}