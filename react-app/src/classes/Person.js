// Person Class - Basic class implementation
class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  // Instance method
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // Instance method
  getAge() {
    return this.age;
  }

  // Instance method with parameter
  setAge(newAge) {
    if (newAge > 0) {
      this.age = newAge;
      return `Age updated to ${newAge}`;
    }
    return 'Invalid age';
  }

  // Instance method
  introduce() {
    return `Hello, I'm ${this.getFullName()} and I'm ${this.age} years old.`;
  }

  // Static method (belongs to class, not instance)
  static createFromString(str) {
    const [firstName, lastName, age] = str.split(',');
    return new Person(firstName, lastName, parseInt(age));
  }
}

export default Person;
