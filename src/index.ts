import { User } from "./models/User";
import { UserForm } from "./views/UserForm";
import { UserView } from "./views/UserView";

const root = document.getElementById('root');
const user = User.buildUser({id: 4});
user.fetch();

if(root) {
    const userView = new UserView(root, user);
    userView.render();
} else {
    throw new Error('No hay root');
}