import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    set(newData: T): void;
    getAll(): T;
}

interface ModelEventHandler {
    events: {[key: string]: (() => void)[]};
    on(event: string, callback: () => void): void;
    trigger(event: string): void;
}

interface ModelSync<T> {
    save(data: T): void;
    fetch(id: number): AxiosPromise;
}

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {
    constructor(
        private eventHandler: ModelEventHandler,
        private sync: ModelSync<T>,
        private attributes: ModelAttributes<T>
    ){}

    get get() {
        return this.attributes.get;
    }

    get on() {
        return this.eventHandler.on;
    }

    get trigger() {
        return this.eventHandler.trigger;
    }

    set(newData: T): void {
        this.attributes.set(newData);
        this.trigger('change')
    }

    save(): void {
        this.sync.save(this.attributes.getAll());
        this.trigger('save');
    }

    fetch(): void {
        const id = this.get('id');

        if(typeof id !== 'number') {
            throw new Error('Id required for fetching')
        }

        this.sync.fetch(id)
        .then((response: AxiosResponse) => {
            this.set(response.data);
        })
        .catch(() => {
            this.trigger('error');
        })
    }
}
