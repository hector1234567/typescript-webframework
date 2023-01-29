import axios, {AxiosPromise} from 'axios';

interface HasId {
    id?: number;
}

export class Sync<T extends HasId> {

    constructor(private rootUrl: string) {}

    save(data: T): void {
        const id = data.id;
        if(id) {
            axios.patch(`${this.rootUrl}/${id}`, data);
        } else {
            axios.post(this.rootUrl, data);
        }
    }

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`);
    }
}