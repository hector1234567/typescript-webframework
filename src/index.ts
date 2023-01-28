import { User } from "./models/User";

const user = new User({id: 1});

user.set({ name: 'Hecttor', age: 999 });

user.save();

const user2 = new User({name: 'Nuevo', age: 88});

user2.save();