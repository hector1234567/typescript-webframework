import { User } from "./models/User";
import { UserForm } from "./views/UserForm";
import { UserList } from "./views/UserList";
import { UserView } from "./views/UserView";

const userCollection = User.buildUsersCollection();

userCollection.on('loaded', () => {
    const root = document.getElementById('root');

    if(root) {
        const userView = new UserList(root, userCollection);
        userView.render();
    } else {
        throw new Error('No hay root');
    }
})

userCollection.fetch();