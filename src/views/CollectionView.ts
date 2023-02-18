import { Collection } from "../models/Collection";

export abstract class CollectionView<T, K> {
    constructor(public parentElement: Element, private collection: Collection<T, K>) {}

    abstract renderItem(model: T, itemParent: Element): void;

    render = (): void => {
        this.parentElement.innerHTML = '';
        
        const templateElement = document.createElement('template');

        this.collection.models.forEach(item => {
            const wrapper = document.createElement('div');
            this.renderItem(item, wrapper);
            templateElement.content.append(wrapper);
        });

        this.parentElement.append(templateElement.content);
    }
}