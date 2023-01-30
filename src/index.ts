import { User } from "./models/User";

const user = User.buildUser({ name: 'Hector' });

user.on('change', () => {
    console.log('change', user);
})

user.on('save', () => {
    console.log('save', user);
})

user.set({ age: 9999});

const age = user.get('age');

console.log(age);

user.set({ id: 1});

user.fetch()

user.set({name: 'Nuevo'});

user.save();

const collection = User.buildUsersCollection();

collection.on('loaded', () => {
    console.log('loaded', collection)
})

collection.fetch();
