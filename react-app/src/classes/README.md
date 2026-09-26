# Classes with TypeScript

This directory contains TypeScript implementations of JavaScript classes with comprehensive examples.

## 📁 Files Structure

### Class Files (TypeScript)
- **Person.ts** - Basic class with properties, methods, static methods, and interfaces
- **BankAccount.ts** - Advanced class with private fields, getters, type-safe transactions
- **Vehicle.ts** - Inheritance example with parent and child classes (Car, Bike)

### Documentation
- **TYPESCRIPT_GUIDE.md** - Complete TypeScript reference guide
- **README.md** - This file

## 🚀 Quick Start

### Person Class
```typescript
import Person from './classes/Person';

// Create instance with type checking
const person = new Person('John', 'Doe', 28);

// Access typed methods
console.log(person.introduce()); // Hello, I'm John Doe and I'm 28 years old.
console.log(person.getFullName()); // John Doe

// Update age with validation
person.setAge(30); // Age updated to 30

// Use static factory method
const newPerson = Person.createFromString('Jane,Smith,25');
```

### BankAccount Class
```typescript
import BankAccount from './classes/BankAccount';

// Create account with initial balance
const account = new BankAccount('Alice Smith', 1000);

// Access balance via getter (read-only)
console.log(account.balance); // 1000

// Perform transactions
account.deposit(500);     // Deposited $500
account.withdraw(200);    // Withdrawn $200

// Get transaction history
const transactions = account.getTransactionHistory();

// Get account summary
const summary = account.getSummary();
// { accountHolder: 'Alice Smith', balance: 1300, transactionCount: 2 }
```

### Vehicle Classes (Inheritance)
```typescript
import { Vehicle, Car, Bike } from './classes/Vehicle';

// Create car instance
const car = new Car('Toyota', 'Camry', 2023, 4);
console.log(car.getInfo()); // 2023 Toyota Camry - 4 doors, Petrol
console.log(car.honk()); // Toyota car honks: Beep! Beep!

// Create bike instance
const bike = new Bike('Honda', 'CB500', 2022, 'Sports');
console.log(bike.getInfo()); // 2022 Honda CB500 - Sports
console.log(bike.wheelie()); // Honda CB500 is doing a wheelie!
```

## ⚛️ Using with React

### Basic Setup with useRef
```typescript
import { useRef, useState } from 'react';
import Person from '../classes/Person';

function MyComponent(): JSX.Element {
  // Type the useRef with generic <Person>
  const personRef = useRef<Person>(new Person('John', 'Doe', 28));
  const [name, setName] = useState<string>('John Doe');

  const handleClick = (): void => {
    // Full type safety when accessing class methods
    setName(personRef.current.introduce());
  };

  return (
    <div>
      <p>{name}</p>
      <button onClick={handleClick}>Show Info</button>
    </div>
  );
}

export default MyComponent;
```

### Type-Safe State Updates
```typescript
interface PersonData {
  firstName: string;
  lastName: string;
  age: number;
}

function PersonComponent(): JSX.Element {
  const personRef = useRef<Person>(new Person('John', 'Doe', 28));
  const [personData, setPersonData] = useState<PersonData>(
    personRef.current.getInfo()
  );

  const handleSetAge = (newAge: number): void => {
    personRef.current.setAge(newAge);
    setPersonData(personRef.current.getInfo()); // Update UI
  };

  return (
    <div>
      <p>Name: {personData.firstName} {personData.lastName}</p>
      <p>Age: {personData.age}</p>
      <button onClick={() => handleSetAge(30)}>Update Age</button>
    </div>
  );
}
```

### Bank Account Component
```typescript
import { useRef, useState } from 'react';
import BankAccount, { Transaction } from '../classes/BankAccount';

function BankComponent(): JSX.Element {
  const accountRef = useRef<BankAccount>(new BankAccount('Alice', 1000));
  const [balance, setBalance] = useState<number>(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleDeposit = (amount: number): void => {
    accountRef.current.deposit(amount);
    setBalance(accountRef.current.balance);
    setTransactions(accountRef.current.getTransactionHistory());
  };

  return (
    <div>
      <p>Balance: ${balance}</p>
      <button onClick={() => handleDeposit(500)}>Deposit $500</button>
      <ul>
        {transactions.map((t, i) => (
          <li key={i}>{t.type}: ${t.amount}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 🎓 TypeScript Features Used

### 1. Type Annotations
```typescript
class Person {
  firstName: string;
  lastName: string;
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    // ...
  }
}
```

### 2. Interfaces
```typescript
interface PersonInfo {
  firstName: string;
  lastName: string;
  age: number;
}

// Method returns interface type
getInfo(): PersonInfo {
  return { firstName: this.firstName, lastName: this.lastName, age: this.age };
}
```

### 3. Private Fields
```typescript
class BankAccount {
  #balance: number; // Private - only accessible within class

  get balance(): number {
    return this.#balance; // Getter provides read-only access
  }
}
```

### 4. Getters and Setters
```typescript
class BankAccount {
  get balance(): number {
    return this.#balance;
  }

  // Setter with validation
  setAge(newAge: number): void {
    if (newAge > 0) {
      this.age = newAge;
    }
  }
}
```

### 5. Inheritance
```typescript
class Vehicle {
  brand: string;
  constructor(brand: string) { this.brand = brand; }
}

class Car extends Vehicle {
  doors: number;
  constructor(brand: string, doors: number) {
    super(brand);
    this.doors = doors;
  }
}
```

### 6. Union Types
```typescript
interface Transaction {
  type: 'deposit' | 'withdrawal'; // Only these two values allowed
  amount: number;
  date: string;
}
```

### 7. Generic Types (useRef)
```typescript
// Generic type parameter specifies the class type
const personRef = useRef<Person>(new Person('John', 'Doe', 28));
const accountRef = useRef<BankAccount>(new BankAccount('Alice', 1000));
```

### 8. Access Modifiers
```typescript
class User {
  public name: string;      // Can be accessed from anywhere
  protected email: string;  // Can be accessed by subclasses
  private password: string; // Only accessible within this class
  readonly id: number;      // Can be read but not modified
}
```

### 9. Static Methods
```typescript
class Person {
  static createFromString(str: string): Person {
    // Static method belongs to class, not instance
    const [firstName, lastName, age] = str.split(',');
    return new Person(firstName, lastName, parseInt(age));
  }
}

// Call on class, not instance
const person = Person.createFromString('John,Doe,28');
```

### 10. Method Return Types
```typescript
class Person {
  introduce(): string { /* ... */ }
  getAge(): number { /* ... */ }
  setAge(age: number): void { /* ... */ } // void = returns nothing
}
```

## ✅ Best Practices

### 1. Always Type Everything
```typescript
// ✓ Good
constructor(name: string, age: number) { }

// ✗ Bad
constructor(name, age) { } // No types!
```

### 2. Use Interfaces for Complex Types
```typescript
// ✓ Good
interface PersonInfo {
  firstName: string;
  lastName: string;
  age: number;
}

getInfo(): PersonInfo { /* ... */ }

// ✗ Bad
getInfo(): any { /* ... */ } // Loses type safety!
```

### 3. Encapsulate with Access Modifiers
```typescript
// ✓ Good - private balance
class BankAccount {
  private #balance: number;
  get balance(): number { return this.#balance; }
}

// ✗ Bad - exposed balance
class BankAccount {
  balance: number; // Can be changed directly!
}
```

### 4. Handle Errors Properly
```typescript
// ✓ Good
try {
  const person = Person.createFromString(input);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}

// ✗ Bad
const person = Person.createFromString(input); // No error handling!
```

### 5. Use Generics for Reusable Code
```typescript
// ✓ Good - works with any type
class Stack<T> {
  items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
}

// Use with different types
const numberStack = new Stack<number>();
const stringStack = new Stack<string>();
```

## 🔧 Troubleshooting

### Type Error: Property doesn't exist
Make sure you're using the correct class instance and property exists:
```typescript
const person = new Person('John', 'Doe', 28);
console.log(person.firstName); // ✓ OK
console.log(person.firstName); // ✓ OK (public property)
console.log(person.#balance); // ✗ Error (private field)
```

### Error: Cannot set readonly property
Readonly properties can only be set in constructor:
```typescript
class User {
  readonly id: number;
  
  constructor(id: number) {
    this.id = id; // ✓ OK in constructor
  }

  setId(newId: number): void {
    this.id = newId; // ✗ Error! Readonly
  }
}
```

### useRef Type Errors
Always specify the generic type:
```typescript
// ✓ Good
const ref = useRef<Person>(new Person('John', 'Doe', 28));

// ✗ Bad
const ref = useRef(new Person('John', 'Doe', 28)); // Type is unknown!
```

## 📚 Resources

- **TYPESCRIPT_GUIDE.md** - Comprehensive TypeScript reference
- **Classes.tsx** - React component with interactive examples
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## 🎯 Next Steps

1. Review the [Classes.tsx](../pages/Classes.tsx) page for interactive examples
2. Read [TYPESCRIPT_GUIDE.md](./TYPESCRIPT_GUIDE.md) for comprehensive reference
3. Try modifying the classes to add your own methods
4. Create new classes following these patterns
5. Check the React component examples for best practices

## 📝 File Summary

| File | Purpose | Features |
|------|---------|----------|
| Person.ts | Basic class | Constructor, methods, static methods, interfaces |
| BankAccount.ts | Advanced class | Private fields, getters, type-safe transactions |
| Vehicle.ts | Inheritance | Parent class, child classes, method overriding |
| Classes.tsx | React component | Interactive demos, useRef, type-safe state |
| TYPESCRIPT_GUIDE.md | Reference | Complete TypeScript feature guide |
| README.md | This file | Overview and examples |
