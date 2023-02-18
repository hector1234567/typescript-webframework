import { User, UserData } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserData>{
    eventsMap(): {[key: string]: () => void} {
        return {
            'click:.name-button': this.onNameButtonClick,
            'click:.age-button': this.onAgeButtonClick,
            'click:.save-button': this.onSaveButtonClick
        }
    }

    onNameButtonClick = (): void => {
        const nameInput = this.parentElement.querySelector('.name-input') as HTMLInputElement;

        if(nameInput) {
            const name = nameInput.value;
            this.model.set({name})
        }
    }

    onAgeButtonClick = (): void => {
        const ageInput = this.parentElement.querySelector('.age-input') as HTMLInputElement;

        if(ageInput) {
            const age = Number.parseInt(ageInput.value);
            this.model.set({age})
        }
    }

    onSaveButtonClick = (): void => {
        this.model.save();
    }

    template(): string {
        return `
        <div>
            <input class="name-input" type="text"/>
            <button class="name-button">Change Name</button>
        </div>
        <div>
            <input class="age-input" type="number"/>
            <button class="age-button">Change Age</button>
        </div>
        <div>
            <button class="save-button">Save</button>
        </div>
        `;
    }
}