class Dog {
    name: string;
    age:number

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    bark() {
        console.log(this.name)
    }
}

const dog = new Dog('旺财', 2);
const dog1 = new Dog('旺财1', 2);
const dog2 = new Dog('旺财2', 2);
const dog3 = new Dog('旺财3', 2);
console.log(dog);
console.log(dog1);
console.log(dog2);
console.log(dog3);