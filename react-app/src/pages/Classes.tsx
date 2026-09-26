import { useState, useRef } from 'react';
import Accordion from '../components/Accordion';
import Person from '../classes/Person';
import BankAccount from '../classes/BankAccount';
import { Car, Bike } from '../classes/Vehicle';
import './Pages.css';
import './ScopeClosuresDemo.css';

interface AccordionItem {
  title: string;
  content: JSX.Element;
}

function Classes(): JSX.Element {
  const [output, setOutput] = useState<string>('');

  // Create instances using useRef to persist across re-renders
  const personRef = useRef<Person>(new Person('John', 'Doe', 28));
  const bankRef = useRef<BankAccount>(new BankAccount('Alice Smith', 1000));
  const carRef = useRef<Car>(new Car('Toyota', 'Camry', 2023, 4));
  const bikeRef = useRef<Bike>(new Bike('Honda', 'CB500', 2022, 'Sports'));

  // ========== BASIC CLASS SECTION ==========

  const handlePersonIntro = (): void => {
    setOutput(personRef.current.introduce());
  };

  const handlePersonSetAge = (): void => {
    const result = personRef.current.setAge(30);
    setOutput(`${result}\n${personRef.current.introduce()}`);
  };

  const handlePersonStaticMethod = (): void => {
    try {
      const newPerson = Person.createFromString('Jane,Smith,25');
      setOutput(`Static method created: ${newPerson.introduce()}`);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setOutput(`Error: ${errorMsg}`);
    }
  };

  // ========== BANK ACCOUNT SECTION (Advanced with getters/setters) ==========

  const handleDeposit = (): void => {
    const result = bankRef.current.deposit(500);
    setOutput(result);
  };

  const handleWithdraw = (): void => {
    const result = bankRef.current.withdraw(200);
    setOutput(result);
  };

  const handleBankSummary = (): void => {
    const summary = bankRef.current.getSummary();
    setOutput(`Account: ${summary.accountHolder}\nBalance: $${summary.balance}\nTransactions: ${summary.transactionCount}`);
  };

  const handleTransactionHistory = (): void => {
    const history = bankRef.current.getTransactionHistory();
    const historyText = history.map(t =>
      `${t.type.toUpperCase()}: $${t.amount} - ${t.date}`
    ).join('\n');
    setOutput(`Transaction History:\n${historyText || 'No transactions yet'}`);
  };

  // ========== INHERITANCE SECTION ==========

  const handleCarInfo = (): void => {
    const carInfo = carRef.current.getCarInfo();
    setOutput(
      `Car Info:\n${carRef.current.getInfo()}\n\n${carRef.current.start()}\n\n${carRef.current.honk()}`
    );
  };

  const handleBikeInfo = (): void => {
    const bikeInfo = bikeRef.current.getBikeInfo();
    setOutput(
      `Bike Info:\n${bikeRef.current.getInfo()}\n\n${bikeRef.current.start()}\n\n${bikeRef.current.wheelie()}`
    );
  };

  // ========== CONTENT SECTIONS ==========

  const basicClassContent = (
    <div className="scope-demo">
      <div className="demo-box">
        <h3>Basic Class Structure with TypeScript</h3>
        <p className="description">
          A class is a blueprint for creating objects with typed properties and methods.
        </p>

        <div className="code-example">
          <pre>{`// TypeScript Class Definition
class Person {
  firstName: string;
  lastName: string;
  age: number;

  constructor(firstName: string, lastName: string, age: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  // Method with return type
  getFullName(): string {
    return \`\${this.firstName} \${this.lastName}\`;
  }

  introduce(): string {
    return \`Hello, I'm \${this.getFullName()}, age \${this.age}\`;
  }

  setAge(newAge: number): string {
    if (newAge > 0) {
      this.age = newAge;
      return \`Age updated to \${newAge}\`;
    }
    return 'Invalid age';
  }
}

// Create instance with type checking
const person: Person = new Person('John', 'Doe', 28);
console.log(person.introduce());`}</pre>
        </div>

        <h4>TypeScript Benefits:</h4>
        <ul>
          <li><strong>Type Safety:</strong> Catch errors at compile time</li>
          <li><strong>Clear Intent:</strong> Parameter and return types are explicit</li>
          <li><strong>Better IDE Support:</strong> Autocomplete and error detection</li>
          <li><strong>Self-Documenting:</strong> Types serve as inline documentation</li>
        </ul>

        <div className="buttons-group">
          <button onClick={handlePersonIntro} className="demo-btn">
            Get Person Info
          </button>
          <button onClick={handlePersonSetAge} className="demo-btn">
            Update Age
          </button>
        </div>
      </div>

      <div className="demo-box">
        <h3>Static Methods with TypeScript</h3>
        <p className="description">
          Static methods with proper type annotations for parameters and return values.
        </p>

        <div className="code-example">
          <pre>{`class Person {
  // Static factory method
  static createFromString(str: string): Person {
    const [firstName, lastName, ageStr] = str.split(',');
    const age = parseInt(ageStr, 10);

    if (!firstName || !lastName || isNaN(age)) {
      throw new Error('Invalid format: "firstName,lastName,age"');
    }

    return new Person(firstName, lastName, age);
  }
}

// Call with error handling
try {
  const person = Person.createFromString('Jane,Smith,25');
  console.log(person.introduce());
} catch (error) {
  console.error((error as Error).message);
}`}</pre>
        </div>

        <button onClick={handlePersonStaticMethod} className="demo-btn">
          Create from String
        </button>
      </div>

      {output && (
        <div className="output-box">
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );

  const advancedClassContent = (
    <div className="scope-demo">
      <div className="demo-box">
        <h3>Getters, Setters & Private Fields with TypeScript</h3>
        <p className="description">
          Advanced type-safe patterns for encapsulation and data validation.
        </p>

        <div className="code-example">
          <pre>{`// TypeScript with Interface
interface Transaction {
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
}

class BankAccount {
  accountHolder: string;
  transactions: Transaction[] = [];
  #balance: number; // Private field

  constructor(accountHolder: string, initialBalance: number = 0) {
    if (initialBalance < 0) {
      throw new Error('Initial balance cannot be negative');
    }
    this.accountHolder = accountHolder;
    this.#balance = initialBalance;
  }

  // Getter with return type
  get balance(): number {
    return this.#balance;
  }

  deposit(amount: number): string {
    if (amount <= 0) return 'Invalid amount';

    this.#balance += amount;
    this.transactions.push({
      type: 'deposit',
      amount,
      date: new Date().toLocaleString()
    });
    return \`Deposited \$\${amount}\`;
  }

  getTransactionHistory(): Transaction[] {
    return [...this.transactions];
  }
}

const account: BankAccount = new BankAccount('Alice', 1000);
const balance: number = account.balance; // Type-safe
account.balance = 5000; // ❌ Error! Can't set readonly property`}</pre>
        </div>

        <h4>TypeScript Features:</h4>
        <ul>
          <li><strong>Interfaces:</strong> Define shapes for objects (Transaction)</li>
          <li><strong>Type Unions:</strong> 'deposit' | 'withdrawal' restricts values</li>
          <li><strong>Private Fields:</strong> # ensures true privacy</li>
          <li><strong>Getters/Setters:</strong> Control property access with types</li>
          <li><strong>Readonly:</strong> Prevent modification of properties</li>
        </ul>

        <div className="buttons-group">
          <div className="counter-demo">
            <p>Bank Operations:</p>
            <button onClick={handleDeposit} className="demo-btn">
              Deposit $500
            </button>
            <button onClick={handleWithdraw} className="demo-btn">
              Withdraw $200
            </button>
            <button onClick={handleBankSummary} className="demo-btn">
              Show Summary
            </button>
            <button onClick={handleTransactionHistory} className="demo-btn">
              Transaction History
            </button>
          </div>
        </div>
      </div>

      {output && (
        <div className="output-box">
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );

  const inheritanceContent = (
    <div className="scope-demo">
      <div className="demo-box">
        <h3>Inheritance & TypeScript Generics</h3>
        <p className="description">
          Type-safe inheritance with extends keyword and interface implementations.
        </p>

        <div className="code-example">
          <pre>{`// TypeScript Interfaces
interface VehicleInfo {
  brand: string;
  model: string;
  year: number;
}

interface CarInfo extends VehicleInfo {
  doors: number;
  fuelType: string;
}

// Parent Class
class Vehicle {
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  getInfo(): string {
    return \`\${this.year} \${this.brand} \${this.model}\`;
  }

  start(): string {
    return \`\${this.brand} is starting...\`;
  }
}

// Child Class with Type-Safe Override
class Car extends Vehicle {
  doors: number;
  fuelType: string = 'Petrol';

  constructor(brand: string, model: string, year: number, doors: number) {
    super(brand, model, year);
    this.doors = doors;
  }

  // Override with matching return type
  getInfo(): string {
    return \`\${super.getInfo()} - \${this.doors} doors\`;
  }

  honk(): string {
    return \`Beep! Beep!\`;
  }

  getCarInfo(): CarInfo {
    return {
      brand: this.brand,
      model: this.model,
      year: this.year,
      doors: this.doors,
      fuelType: this.fuelType
    };
  }
}`}</pre>
        </div>

        <h4>TypeScript Inheritance Features:</h4>
        <ul>
          <li><strong>extends:</strong> Create typed child classes</li>
          <li><strong>super():</strong> Call parent constructor with type checking</li>
          <li><strong>super.method():</strong> Type-safe parent method calls</li>
          <li><strong>override:</strong> Explicit override keyword (4.3+)</li>
          <li><strong>Protected:</strong> Access modifier for inheritance</li>
        </ul>

        <div className="buttons-group">
          <div className="counter-demo">
            <p>Vehicle Types:</p>
            <button onClick={handleCarInfo} className="demo-btn">
              Car Info
            </button>
            <button onClick={handleBikeInfo} className="demo-btn">
              Bike Info
            </button>
          </div>
        </div>
      </div>

      {output && (
        <div className="output-box">
          <h4>Output:</h4>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );

  const useRefContent = (
    <div className="scope-demo">
      <div className="demo-box">
        <h3>useRef with TypeScript Classes in React</h3>
        <p className="description">
          Type-safe way to keep persistent references to class instances.
        </p>

        <div className="code-example">
          <pre>{`import { useRef } from 'react';
import Person from './classes/Person';

function MyComponent(): JSX.Element {
  // Type the useRef with generic <Person>
  const personRef = useRef<Person>(
    new Person('John', 'Doe', 28)
  );

  const handleClick = (): void => {
    // Full type checking on personRef.current
    console.log(personRef.current.introduce());
  };

  return (
    <button onClick={handleClick}>
      Show Info
    </button>
  );
}

// Type-safe state update
const [age, setAge] = useState<number>(28);
const updateAge = (newAge: number): void => {
  personRef.current.setAge(newAge);
  setAge(newAge); // Trigger re-render
}

// Benefits:
// ✓ Type-safe access to class methods
// ✓ IntelliSense shows all available methods
// ✓ Compiler catches type errors
// ✓ No runtime errors from typos`}</pre>
        </div>

        <h4>useRef vs useState with Classes:</h4>
        <ul>
          <li><strong>useRef:</strong> Persistent reference, no re-render</li>
          <li><strong>useState:</strong> Triggers re-render on change</li>
          <li><strong>Together:</strong> useRef for instance, useState for UI updates</li>
          <li><strong>Type Generics:</strong> useRef&lt;ClassName&gt;() ensures type safety</li>
        </ul>

        <div className="code-example">
          <pre>{`// Generic Type Syntax
const ref = useRef<Person>(null);        // Can be null
const ref = useRef<Person | null>(null); // Explicitly nullable
const ref = useRef<Person>(new Person(...)); // Initialized

// Function Return Types
const getFullName = (): string => {
  return personRef.current.getFullName();
};

const setNewAge = (age: number): void => {
  personRef.current.setAge(age);
};`}</pre>
        </div>
      </div>
    </div>
  );

  const dataFlowContent = (
    <div className="scope-demo">
      <div className="demo-box">
        <h3>Type-Safe Data Flow in React Components</h3>
        <p className="description">
          Patterns for passing data and functions between classes and React components with full type safety.
        </p>

        <div className="code-example">
          <pre>{`// 1. DEFINE TYPES FOR CLASS DATA
interface PersonData {
  firstName: string;
  lastName: string;
  age: number;
}

// 2. COMPONENT STATE WITH TYPES
function MyComponent(): JSX.Element {
  const personRef = useRef<Person>(new Person('John', 'Doe', 28));
  const [personData, setPersonData] = useState<PersonData>(
    personRef.current.getInfo()
  );

  // 3. TYPE-SAFE EVENT HANDLER
  const handleUpdateAge = (newAge: number): void => {
    personRef.current.setAge(newAge);
    setPersonData(personRef.current.getInfo());
  };

  // 4. TYPE-SAFE RENDERING
  return (
    <div>
      <p>Name: {personData.firstName}</p>
      <p>Age: {personData.age}</p>
      <button onClick={() => handleUpdateAge(30)}>
        Update Age
      </button>
    </div>
  );
}

// TYPE SAFETY CHECKLIST:
// ✓ useRef<ClassName>() - class instance type
// ✓ useState<InterfaceType>() - state type
// ✓ function(): ReturnType - function return type
// ✓ parameter: ParameterType - parameter type
// ✓ onClick = (): void => {} - event handler type`}</pre>
        </div>

        <h4>Data Flow Pattern:</h4>
        <ul>
          <li><strong>useRef&lt;Person&gt;:</strong> Typed class instance</li>
          <li><strong>useState&lt;PersonData&gt;:</strong> Typed UI state</li>
          <li><strong>Methods: () =&gt; void:</strong> Typed event handlers</li>
          <li><strong>Getters: () =&gt; Type:</strong> Return typed data</li>
          <li><strong>JSX: {data}:</strong> Display typed values</li>
        </ul>

        <h4>Common Patterns:</h4>
        <ul>
          <li>Class stores data and logic</li>
          <li>Component stores UI state</li>
          <li>Event handler updates both</li>
          <li>setstate triggers re-render</li>
          <li>useRef doesn't trigger re-render</li>
        </ul>
      </div>
    </div>
  );

  const bestPracticesContent = (
    <div className="scope-demo">
      <div className="demo-box">
        <h3>TypeScript Best Practices for Classes</h3>

        <div className="concept-item">
          <h4>✅ Always Type Constructor Parameters</h4>
          <pre className="code-example">{`// Good
constructor(name: string, age: number) {
  this.name = name;
  this.age = age;
}

// Bad
constructor(name, age) { // No types!
  this.name = name;
  this.age = age;
}`}</pre>
        </div>

        <div className="concept-item">
          <h4>✅ Define Return Types for Methods</h4>
          <pre className="code-example">{`// Good
getName(): string {
  return this.name;
}

getAge(): number {
  return this.age;
}

// Bad
getName() {      // No return type
  return this.name;
}`}</pre>
        </div>

        <div className="concept-item">
          <h4>✅ Use Interfaces for Complex Types</h4>
          <pre className="code-example">{`// Good
interface UserInfo {
  id: number;
  name: string;
  email: string;
}

getUser(): UserInfo {
  return { id: 1, name: 'John', email: 'john@x.com' };
}

// Bad
getUser(): any {  // Loses type safety!
  return { id: 1, name: 'John', email: 'john@x.com' };
}`}</pre>
        </div>

        <div className="concept-item">
          <h4>✅ Use Access Modifiers</h4>
          <pre className="code-example">{`class BankAccount {
  public accountHolder: string;     // Anyone can access
  protected transactionHistory: []; // Subclasses only
  private balance: number;          // Only this class

  constructor(holder: string) {
    this.accountHolder = holder;
  }
}`}</pre>
        </div>

        <div className="concept-item">
          <h4>✅ Use Generics for Reusable Classes</h4>
          <pre className="code-example">{`// Generic class that works with any type
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
stringStack.push('hello');`}</pre>
        </div>
      </div>

      <div className="demo-box">
        <h3>Common TypeScript Mistakes</h3>

        <div className="concept-item">
          <h4>❌ Using 'any' Type</h4>
          <pre className="code-example">{`// Wrong - defeats TypeScript purpose
getName(): any {
  return this.name;
}

// Correct
getName(): string {
  return this.name;
}`}</pre>
        </div>

        <div className="concept-item">
          <h4>❌ Not Using Access Modifiers</h4>
          <pre className="code-example">{`// Wrong - no encapsulation
class User {
  name: string;
  password: string; // Exposed!
}

// Correct
class User {
  name: string;
  private password: string; // Protected
}`}</pre>
        </div>

        <div className="concept-item">
          <h4>❌ Forgetting Generic Types</h4>
          <pre className="code-example">{`// Wrong
const ref = useRef(new Person(...)); // Type is any

// Correct
const ref = useRef<Person>(new Person(...)); // Person type`}</pre>
        </div>

        <div className="concept-item">
          <h4>❌ Not Handling Errors Properly</h4>
          <pre className="code-example">{`// Wrong
const person = Person.createFromString(input);

// Correct
try {
  const person = Person.createFromString(input);
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown';
  console.error(message);
}`}</pre>
        </div>
      </div>

      <div className="key-concepts">
        <h3>TypeScript & Classes Summary</h3>
        <div className="concept-item">
          <h4>🎯 Type Safety</h4>
          <p>Catch errors before runtime with type checking.</p>
        </div>
        <div className="concept-item">
          <h4>🔒 Encapsulation</h4>
          <p>Use private/protected modifiers to control access.</p>
        </div>
        <div className="concept-item">
          <h4>📝 Interfaces</h4>
          <p>Define contracts for class shapes and data structures.</p>
        </div>
        <div className="concept-item">
          <h4>⚛️ React Integration</h4>
          <p>useRef&lt;ClassName&gt; keeps type-safe class instances.</p>
        </div>
        <div className="concept-item">
          <h4>🔧 Generics</h4>
          <p>Write reusable, type-safe classes that work with any type.</p>
        </div>
      </div>
    </div>
  );

  const accordionItems: AccordionItem[] = [
    {
      title: '📚 Basic Classes with TypeScript',
      content: basicClassContent
    },
    {
      title: '🔐 Advanced Classes & Interfaces',
      content: advancedClassContent
    },
    {
      title: '🧬 Type-Safe Inheritance',
      content: inheritanceContent
    },
    {
      title: '⚛️ useRef with TypeScript Classes',
      content: useRefContent
    },
    {
      title: '🔄 Type-Safe Data Flow in React',
      content: dataFlowContent
    },
    {
      title: '✅ TypeScript Best Practices',
      content: bestPracticesContent
    }
  ];

  return (
    <div className="page">
      <h1>Classes in JavaScript & TypeScript</h1>
      <p>Master Object-Oriented Programming with type-safe classes. Learn TypeScript interfaces, inheritance, encapsulation, and React integration.</p>

      <div style={{ marginTop: '2rem' }}>
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
}

export default Classes;
