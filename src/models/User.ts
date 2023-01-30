import { Attributes } from './Attributes';
import { EventHandler } from './EventHandler';
import { Model } from './Model';
import { Sync } from './Sync';

interface UserData {
    id?: number;
    name?: string;
    age?: number;
}

export class User extends Model<UserData> {
    static UserFromData(data: UserData): User {
        return new User(
            new EventHandler(), 
            new Sync('http://localhost:3000/users'), 
            new Attributes(data));
    }
}
