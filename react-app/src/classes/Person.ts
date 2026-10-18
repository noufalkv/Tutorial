// Person Class - TypeScript implementation
interface PersonInfo {
  firstName: string;
  lastName: string;
  age: number;
}

class Person {
  firstName: string;
  lastName: string;
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getAge(): number {
    return this.age;
  }

  setAge(newAge: number): string {
    if (newAge > 0) {
      this.age = newAge;
      return `Age updated to ${newAge}`;
    }
    return 'Invalid age';
  }

  introduce(): string {
    return `Hello, I'm ${this.getFullName()} and I'm ${this.age} years old.`;
  }

  // Method to get person info as object
  getInfo(): PersonInfo {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      age: this.age
    };
  }

  static createFromString(str: string): Person {
    const [firstName, lastName, ageStr] = str.split(',');
    const age = parseInt(ageStr, 10);

    if (!firstName || !lastName || isNaN(age)) {
      throw new Error('Invalid format. Expected: "firstName,lastName,age"');
    }

    return new Person(firstName, lastName, age);
  }
}

export default Person;
export type { PersonInfo };
