import axios, { AxiosResponse } from 'axios';
import { EventHandler } from './EventHandler';

export class Collection<T, K> {
    models: T[] = [];
    eventHandler: EventHandler = new EventHandler();

    constructor(private rootUrl: string, private deserialize: (json: K) => T) {}

    on = this.eventHandler.on;
    trigger = this.eventHandler.trigger;

    fetch(): void {
        axios.get(this.rootUrl).then((response: AxiosResponse) => {
            response.data.forEach((element: K) => {
                this.models.push(this.deserialize(element));
            });
            this.trigger('loaded');
        })
    }
}