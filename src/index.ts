import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const root = document.getElementById('root');
const user = User.buildUser({name: 'Héctor', age: 999})

if(root) {
    const userForm = new UserForm(root, user);
    userForm.render();
} else {
    throw new Error('No hay root');
}