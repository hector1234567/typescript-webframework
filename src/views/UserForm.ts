import { User } from "../models/User";

export class UserForm {
    constructor(public parentElement: Element, public user: User) {}

    eventsMap(): {[key: string]: () => void} {
        return {
            'click:button': this.onButtonClick
        }
    }

    onButtonClick(): void {
        console.log('Hola')
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventList = this.eventsMap();

        for(let eventKey in eventList) {
            const [event, element] = eventKey.split(':');

            fragment.querySelectorAll(element).forEach(elem => {
                elem.addEventListener(event, eventList[eventKey]);
            });
        }
    }

    template(): string {
        return `
        <div>
            <h1>User Form</h1>
            <div>Name: ${this.user.get('name')}</div>
            <div>Age: ${this.user.get('age')}</div>
            <input type="text"/>
            <button>Click me</button>
        </div>
        `;
    }

    render(): void {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parentElement.append(templateElement.content);
    }
}