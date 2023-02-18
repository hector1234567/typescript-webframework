import { User, UserData } from "../models/User";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
import { View } from "./View";

export class UserView extends View<User, UserData> {
    template(): string {
        return `
        <div class="user-show"></div>
        <div class="user-form"></div>
        `;
    }

    regionsMap(): {[key: string]: string} {
        return {
            userShow: '.user-show',
            userForm: '.user-form'
        }
    }

    onRender(): void {
        if(this.regions['userShow']) {
            new UserShow(this.regions['userShow'], this.model).render();
        }
        if(this.regions['userForm']) {
            new UserForm(this.regions['userForm'], this.model).render();
        }
    }
}