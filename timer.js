const timerForm = document.querySelector('#timer');
let currT = 0;
let timerId;

function onTick() {
    currT++;
    timerForm.value = `${Math.floor(currT / 60)}:${(currT % 60).toString().padStart(2, '0')}`;
}

function startTimer() {
    timerId = setInterval(onTick, 1000);
}

function stopTimer() {
    clearInterval(timerId);
}