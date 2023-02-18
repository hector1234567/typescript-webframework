import { User, UserData } from "../models/User";
import { CollectionView } from "./CollectionView";
import { UserView } from "./UserView";

export class UserList extends CollectionView<User, UserData>{
    renderItem(model: User, itemParent: Element): void {
        new UserView(itemParent, model).render();
    }
}