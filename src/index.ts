import { User } from "./models/User";

const user = new User({ name: 'Hector' });

user.attributes.set({ age: 9999});

const age = user.attributes.get('age');

console.log(age);