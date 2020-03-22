import { EventEmitter } from 'events';

export default class PollerHandler extends EventEmitter {
    constructor(pollCallback = () => {}) {
        super();

        this.stop = false;
        this.pollCallback = pollCallback;
    }

    customTimer() {
        return new Promise(resolve => {
            this.removeAllListeners('shutdown');
            this.once('shutdown', resolve);

            this.timer = setTimeout(
                resolve,
                60 * 1000 // 1 min
            );
        });
    }

    async startPolling() {
        do {
            if (!this.stop) {
                try {
                    await this.pollCallback();
                } catch(error) {
                    console.warn(error);
                    this.stopPolling();
                }
            }

            await this.customTimer();
        } while (!this.stop);
    }

    stopPolling() {
        this.stop = true;
        this.emit('shutdown');
        this.timer && clearTimeout(this.timer);
    }
}