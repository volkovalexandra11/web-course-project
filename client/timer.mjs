class Timer {
    onTickCallback;
    currT = 0;
    timerId;

    constructor(onTick) {
        this.onTickCallback = onTick;
    }

    tick() {
        this.currT++;
        this.onTickCallback(this.currT);
    }

    startTimer() {
        this.timerId = setInterval(() => this.tick(), 1000);
    }

    stopTimer() {
        clearInterval(this.timerId);
    }

    resetTimer() {
        this.stopTimer();
        this.currT = 0;
        this.startTimer();
    }
}

export default Timer;