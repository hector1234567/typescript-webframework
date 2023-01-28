import axios, {AxiosResponse} from 'axios';

interface UserData {
    id?: number;
    name?: string;
    age?: number;
}

type Callback = () => void;

export class User {
    events: {[key: string]: Callback[]} = {};

    constructor(private data: UserData){}

    get(key: keyof UserData): number | string | undefined {
        return this.data[key];
    }

    set(newData: UserData): void {
        this.data = {...this.data, ...newData};
    }

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

    save(): void {
        const id = this.get('id');

        if(id) {
            axios.patch(`http://localhost:3000/users/${id}`, this.data);
        } else {
            axios.post('http://localhost:3000/users', this.data);
        }
    }

    fetch(): void {
        axios.get(`http://localhost:3000/users/${this.get('id')}`).then((response: AxiosResponse): void => {
            this.set(response.data);
        })
    }
}