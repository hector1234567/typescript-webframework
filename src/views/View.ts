import { Model } from "../models/Model";

interface HasId {
    id?: number;
}

export abstract class View<T extends Model<K>, K extends HasId> {
    constructor(public parentElement: Element, public model: T) {}

    abstract template(): string;

    eventsMap(): {[key: string]: () => void} {
        return {}
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

    render(): void {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parentElement.append(templateElement.content);
    }
}