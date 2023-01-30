import { AxiosResponse } from 'axios';
import { Attributes } from './Attributes';
import { EventHandler } from './EventHandler';
import { Sync } from './Sync';

interface UserData {
    id?: number;
    name?: string;
    age?: number;
}

export class User {
    private eventHandler: EventHandler = new EventHandler();
    private sync: Sync<UserData> = new Sync('http://localhost:3000/users');
    private attributes: Attributes<UserData>;

    constructor(data: UserData) {
        this.attributes = new Attributes(data);
    }

    get get() {
        return this.attributes.get;
    }

    get on() {
        return this.eventHandler.on;
    }

    get trigger() {
        return this.eventHandler.trigger;
    }

    set(newData: UserData): void {
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
