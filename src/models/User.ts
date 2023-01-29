import { Attributes } from './Attributees';
import { EventHandler } from './EventHandler';
import { Sync } from './Sync';

interface UserData {
    id?: number;
    name?: string;
    age?: number;
}

export class User {
    eventHandler: EventHandler = new EventHandler();
    sync: Sync<UserData> = new Sync('http://localhost:3000/users');
    attributes: Attributes<UserData>;

    constructor(data: UserData) {
        this.attributes = new Attributes(data);
    }
}
