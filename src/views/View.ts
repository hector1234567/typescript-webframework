import { Model } from "../models/Model";

interface HasId {
    id?: number;
}

export abstract class View<T extends Model<K>, K extends HasId> {
    public regions: {[key: string]: Element} = {};
    constructor(public parentElement: Element, public model: T) {
        this.bindModel();
    }

    abstract template(): string;

    eventsMap(): {[key: string]: () => void} {
        return {}
    }

    regionsMap(): {[key: string]: string} {
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

    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }

    mapRegions(fragment: DocumentFragment): void {
        for(let key in this.regionsMap()) {
            const region = fragment.querySelector(this.regionsMap()[key]);

            if(region) {
                this.regions[key] = region;
            }
        }
    }

    onRender(): void {}

    render(): void {
        this.parentElement.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);

        this.onRender();

        this.parentElement.append(templateElement.content);
    }
}