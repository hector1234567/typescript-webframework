import { Attributes } from './Attributes';
import { EventHandler } from './EventHandler';
import { Model } from './Model';
import { ApiSync } from './ApiSync';
import { Collection } from './Collection';

interface UserData {
    id?: number;
    name?: string;
    age?: number;
}

const rootUrl = 'http://localhost:3000/users';

export class User extends Model<UserData> {
    static buildUser(data: UserData): User {
        return new User(
            new EventHandler(), 
            new ApiSync(rootUrl), 
            new Attributes(data));
    }

    static buildUsersCollection(): Collection<User, UserData> {
        return new Collection(rootUrl, this.buildUser);
    }
}
