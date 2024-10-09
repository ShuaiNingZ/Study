var Dog = /** @class */ (function () {
    function Dog(name, age) {
        this.name = name;
        this.age = age;
    }
    Dog.prototype.bark = function () {
        console.log(this.name);
    };
    return Dog;
}());
var dog = new Dog('旺财', 2);
var dog1 = new Dog('旺财1', 2);
var dog2 = new Dog('旺财2', 2);
var dog3 = new Dog('旺财3', 2);
console.log(dog);
console.log(dog1);
console.log(dog2);
console.log(dog3);
