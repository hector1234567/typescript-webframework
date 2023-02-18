import { User } from "./models/User";
import { UserList } from "./views/UserList";

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