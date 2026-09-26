# TypeScript Classes Guide

This guide explains TypeScript features used in the classes section.

## 1. Basic Type Annotations

```typescript
// Function parameters must have types
function add(a: number, b: number): number {
  return a + b;
}

// Class properties must have types
class Person {
  firstName: string;
  lastName: string;
  age: number;
}
```

## 2. Interfaces

An interface defines the shape of an object:

```typescript
// Define what a Person should look like
interface PersonInfo {
  firstName: string;
  lastName: string;
  age: number;
}

// Class implements the interface
class Person implements PersonInfo {
  firstName: string;
  lastName: string;
  age: number;
}

// Function returns PersonInfo type
function getPerson(): PersonInfo {
  return {
    firstName: 'John',
    lastName: 'Doe',
    age: 28
  };
}
```

## 3. Class Properties

```typescript
class BankAccount {
  accountHolder: string;
  transactions: Transaction[] = []; // Array type
  #balance: number;                  // Private field

  constructor(holder: string, balance: number) {
    this.accountHolder = holder;
    this.#balance = balance;
  }
}
```

## 4. Method Return Types

```typescript
class Person {
  getName(): string {
    return this.firstName + this.lastName;
  }

  getAge(): number {
    return this.age;
  }

  introduce(): string {
    return `Hello, I'm ${this.getName()}`;
  }

  // void means the method returns nothing
  logInfo(): void {
    console.log(this.introduce());
  }
}
```

## 5. Union Types

Use `|` to specify multiple possible types:

```typescript
interface Transaction {
  type: 'deposit' | 'withdrawal'; // Only these two values allowed
  amount: number;
}

// Function that accepts multiple types
function process(value: string | number): void {
  if (typeof value === 'string') {
    console.log('String:', value);
  } else {
    console.log('Number:', value);
  }
}
```

## 6. Generics

Generics allow you to write reusable code for any type:

```typescript
// Generic class
class Stack<T> {
  items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

// Usage
const numberStack = new Stack<number>();
numberStack.push(42);

const stringStack = new Stack<string>();
stringStack.push('hello');
```

## 7. Access Modifiers

Control who can access class members:

```typescript
class User {
  public name: string;          // Anyone can access
  protected email: string;       // Only subclasses can access
  private password: string;      // Only this class can access
  readonly id: number;           // Can read, but not modify

  constructor(name: string, email: string, password: string, id: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  protected getEmail(): string {
    return this.email;
  }

  private verifyPassword(pwd: string): boolean {
    return this.password === pwd;
  }
}

class Admin extends User {
  // Can access protected email
  displayAdminEmail(): string {
    return this.email; // ✓ Works
  }

  // Cannot access private password
  // return this.password; // ❌ Error!
}
```

## 8. Inheritance with Types

```typescript
class Vehicle {
  brand: string;

  constructor(brand: string) {
    this.brand = brand;
  }

  start(): string {
    return `${this.brand} is starting`;
  }
}

class Car extends Vehicle {
  doors: number;

  constructor(brand: string, doors: number) {
    super(brand);
    this.doors = doors;
  }

  // Override with same return type
  start(): string {
    return super.start() + ' with 4 doors';
  }
}
```

## 9. Optional Properties

Use `?` to make properties optional:

```typescript
interface Config {
  apiUrl: string;      // Required
  timeout?: number;    // Optional
  retries?: number;    // Optional
}

const config: Config = {
  apiUrl: 'https://api.example.com'
  // timeout and retries are optional
};

// Function with optional parameters
function createUser(name: string, email?: string): void {
  if (email) {
    console.log(`User: ${name}, Email: ${email}`);
  } else {
    console.log(`User: ${name}`);
  }
}
```

## 10. Null and Undefined Handling

```typescript
// Strict null checks (recommended)
let name: string = 'John';
// name = null; // ❌ Error!

// Allow null
let name: string | null = 'John';
name = null; // ✓ OK

// Allow undefined
let name: string | undefined = 'John';
name = undefined; // ✓ OK

// Allow both
let name: string | null | undefined = 'John';
```

## 11. Type Assertions (as keyword)

```typescript
// Tell TypeScript you know the type
let value: any = 'hello';
let length: number = (value as string).length;

// Or use angle bracket syntax
let length: number = (<string>value).length;
```

## 12. Utility Types

```typescript
// Partial - all properties optional
type PartialPerson = Partial<Person>;

// Required - all properties required
type RequiredPerson = Required<Person>;

// Readonly - properties cannot be modified
type ReadonlyPerson = Readonly<Person>;

// Record - object with specific keys and value type
type Status = 'active' | 'inactive' | 'pending';
type UserStatus = Record<Status, number>;
// { active: 0, inactive: 0, pending: 0 }

// Pick - select specific properties
type PersonPreview = Pick<Person, 'firstName' | 'lastName'>;

// Omit - exclude specific properties
type PersonWithoutAge = Omit<Person, 'age'>;
```

## 13. React with TypeScript

```typescript
import { useState, useRef } from 'react';
import Person from './classes/Person';

// Function component with JSX.Element return type
function MyComponent(): JSX.Element {
  // Typed state
  const [name, setName] = useState<string>('John');
  const [age, setAge] = useState<number>(28);

  // Typed ref
  const personRef = useRef<Person>(new Person('John', 'Doe', 28));

  // Typed event handler
  const handleClick = (): void => {
    console.log(personRef.current.introduce());
  };

  // Typed form input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  return (
    <div>
      <input onChange={handleChange} value={name} />
      <button onClick={handleClick}>Show Info</button>
    </div>
  );
}

export default MyComponent;
```

## 14. Error Handling with Types

```typescript
// Create custom error type
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Type-safe error handling
try {
  // ... code that might throw
  throw new ValidationError('Invalid input');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
  } else if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## 15. Enums

```typescript
// String enum
enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

// Usage
let userStatus: Status = Status.Active;

// Numeric enum
enum Direction {
  Up = 1,
  Down = 2,
  Left = 3,
  Right = 4
}
```

## Benefits of TypeScript

✅ **Catch errors early** - Compile-time type checking
✅ **Better IDE support** - Autocomplete and refactoring
✅ **Self-documenting** - Types serve as inline docs
✅ **Safer refactoring** - Know when you break something
✅ **Better tooling** - Navigation and find references
✅ **Team communication** - Clear contracts between functions

## Common TypeScript Settings (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [DefinitelyTyped](https://definitelytyped.org/) - Type definitions for libraries
