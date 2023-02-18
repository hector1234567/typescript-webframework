import { User, UserData } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserData>{
    eventsMap(): {[key: string]: () => void} {
        return {
            'click:button': this.onButtonClick
        }
    }

    onButtonClick(): void {
        console.log('Hola')
    }

    template(): string {
        return `
        <div>
            <h1>User Form</h1>
            <div>Name: ${this.model.get('name')}</div>
            <div>Age: ${this.model.get('age')}</div>
            <input type="text"/>
            <button>Click me</button>
        </div>
        `;
    }
}