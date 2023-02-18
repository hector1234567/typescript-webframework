import { User, UserData } from "../models/User";
import { View } from "./View";

export class UserShow extends View<User, UserData> {
    template(): string {
        return `
        <div>Name: ${this.model.get('name')}</div>
        <div>Age: ${this.model.get('age')}</div>
        `;
    }
    
}