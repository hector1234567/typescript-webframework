type Callback = () => void;

export class EventHandler {
    events: {[key: string]: Callback[]} = {};

    on(event: string, callback: Callback): void {
        if(this.events[event]) {
            this.events[event].push(callback);
        } else {
            this.events[event] = [callback];
        }
    }

    trigger(event: string): void {
        const handlers = this.events[event];

        if(!handlers || handlers.length === 0) return;

        handlers.forEach(callback => {
            callback();
        })
    }
}
