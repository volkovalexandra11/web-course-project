let onTickCallback;
let currT = 0;
let timerId;

function tick() {
    currT++;
    onTickCallback(currT);
}

function startTimer(onTick) {
    timerId = setInterval(tick, 1000);
    onTickCallback = onTick;
}

function stopTimer() {
    clearInterval(timerId);
}

function resetTimer(onTick) {
    stopTimer();
    currT = 0;
    startTimer(onTick);
}