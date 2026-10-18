import { useState, useRef } from 'react';
import Accordion from '../components/Accordion';
import Person from '../classes/Person';
import BankAccount from '../classes/BankAccount';
import { Car, Bike } from '../classes/Vehicle';
import './Pages.css';
import './ScopeClosuresDemo.css';

function Classes() {
  const [output, setOutput] = useState('');

  // Create instances using useRef to persist across re-renders
  const personRef = useRef(new Person('John', 'Doe', 28));
  const bankRef = useRef(new BankAccount('Alice Smith', 1000));
  const carRef = useRef(new Car('Toyota', 'Camry', 2023, 4));
  const bikeRef = useRef(new Bike('Honda', 'CB500', 2022, 'Sports'));

  // ========== BASIC CLASS SECTION ==========

  const handlePersonIntro = () => {
    setOutput(personRef.current.introduce());
  };

  const handlePersonSetAge = () => {
    const result = personRef.current.setAge(30);
    setOutput(`${result}\n${personRef.current.introduce()}`);
  };

  const handlePersonStaticMethod = () => {
    const newPerson = Person.createFromString('Jane,Smith,25');
    setOutput(`Static method created: ${newPerson.introduce()}`);
  };

  // ========== BANK ACCOUNT SECTION (Advanced with getters/setters) ==========

  const handleDeposit = () => {
    const result = bankRef.current.deposit(500);
    setOutput(result);
  };

  const handleWithdraw = () => {
    const result = bankRef.current.withdraw(200);
    setOutput(result);
  };

  const handleBankSummary = () => {
    setOutput(bankRef.current.getSummary());
  };

  const handleTransactionHistory = () => {
    const history = bankRef.current.getTransactionHistory();
    const historyText = history.map(t =>
      `${t.type.toUpperCase()}: $${t.amount} - ${t.date}`
    ).join('\n');
    setOutput(`Transaction History:\n${historyText || 'No transactions yet'}`);
  };

  // ========== INHERITANCE SECTION ==========

  const handleCarInfo = () => {
    setOutput(`Car Info:\n${carRef.current.getInfo()}\n\n${carRef.current.start()}\n\n${carRef.current.honk()}`);
  };

  const handleBikeInfo = () => {
    setOutput(`Bike Info:\n${bikeRef.current.getInfo()}\n\n${bikeRef.current.start()}\n\n${bikeRef.current.wheelie()}`);
  };

  // ========== CONTENT SECTIONS ==========

  const basicClassContent = (
    <div className="scope-demo">
      <div className="demo-box">
        <h3>Basic Class Structure</h3>
        <p className="description">
          A class is a blueprint for creating objects with properties (data) and methods (functions).
        </p>

        <div className="code-example">
          <pre>{`class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  getFullName() {
    return \`\${this.firstName} \${this.lastName}\`;
  }

  introduce() {
    return \`Hello, I'm \${this.getFullName()}, age \${this.age}\`;
  }
}

// Creating instances
const person1 = new Person('John', 'Doe', 28);
console.log(person1.introduce()); // Hello, I'm John Doe, age 28`}</pre>
        </div>

        <h4>Key Points:</h4>
        <ul>
          <li><strong>constructor():</strong> Runs when creating a new instance</li>
          <li><strong>this:</strong> Refers to the current object instance</li>
          <li><strong>Methods:</strong> Functions defined in the class</li>
          <li><strong>Properties:</strong> Data stored in this</li>
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
        <h3>Static Methods</h3>
        <p className="description">
          Static methods belong to the class itself, not to instances.
        </p>

        <div className="code-example">
          <pre>{`class Person {
  static createFromString(str) {
    const [firstName, lastName, age] = str.split(',');
    return new Person(firstName, lastName, parseInt(age));
  }
}

// Call static method on the class
const person = Person.createFromString('Jane,Smith,25');`}</pre>
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
        <h3>Getters, Setters & Private Fields</h3>
        <p className="description">
          Private fields (#) and getters/setters control access to data for better encapsulation.
        </p>

        <div className="code-example">
          <pre>{`class BankAccount {
  #balance; // Private field (# symbol)

  constructor(holder, balance) {
    this.accountHolder = holder;
    this.#balance = balance; // Private
  }

  get balance() {
    return this.#balance; // Read-only access
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return \`Deposited $\${amount}\`;
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return \`Withdrawn $\${amount}\`;
    }
  }
}

const account = new BankAccount('Alice', 1000);
console.log(account.balance);    // 1000 (via getter)
console.log(account.#balance);   // ❌ Error (private)`}</pre>
        </div>

        <h4>Benefits:</h4>
        <ul>
          <li><strong>Encapsulation:</strong> Hide internal details</li>
          <li><strong>Validation:</strong> Control data changes</li>
          <li><strong>Privacy:</strong> Prevent direct access to critical data</li>
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
        <h3>Inheritance (extends)</h3>
        <p className="description">
          A class can inherit properties and methods from a parent class using extends.
        </p>

        <div className="code-example">
          <pre>{`class Vehicle {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }
  start() {
    return \`\${this.brand} is starting...\`;
  }
}

class Car extends Vehicle {
  constructor(brand, model, doors) {
    super(brand, model); // Call parent constructor
    this.doors = doors;
  }

  // New method
  honk() {
    return \`\${this.brand} honks!\`;
  }
}

const car = new Car('Toyota', 'Camry', 4);
console.log(car.start());  // Inherited
console.log(car.honk());   // New method`}</pre>
        </div>

        <h4>Key Concepts:</h4>
        <ul>
          <li><strong>extends:</strong> Create a child class</li>
          <li><strong>super():</strong> Call parent's constructor</li>
          <li><strong>super.method():</strong> Call parent's method</li>
          <li><strong>override:</strong> Replace parent's method</li>
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
        <h3>Using useRef with Classes in React</h3>
        <p className="description">
          useRef keeps a persistent reference to class instances across component re-renders.
        </p>

        <div className="code-example">
          <pre>{`import { useRef } from 'react';
import Person from './classes/Person';

function MyComponent() {
  // Create class instance once, persist across re-renders
  const personRef = useRef(new Person('John', 'Doe', 28));

  const handleClick = () => {
    // Access instance methods via personRef.current
    console.log(personRef.current.introduce());
  };

  return <button onClick={handleClick}>Show Info</button>;
}

// Why useRef and not useState?
// - useState causes re-render on every change
// - useRef keeps the same instance without re-renders
// - Perfect for class instances that shouldn't trigger renders`}</pre>
        </div>

        <h4>When to use useRef:</h4>
        <ul>
          <li>Storing class instances</li>
          <li>Managing focus/selection in inputs</li>
          <li>Triggering animations</li>
          <li>Integrating with third-party libraries</li>
        </ul>

        <h4>When NOT to use useRef:</h4>
        <ul>
          <li>Data that should trigger a re-render (use useState)</li>
          <li>Props that change frequently</li>
          <li>State that affects the UI</li>
        </ul>
      </div>
    </div>
  );

  const dataFlowContent = (
    <div className="scope-demo">
      <div className="demo-box">
        <h3>Data & Functions Between Class and Component</h3>
        <p className="description">
          How to pass data and call methods between classes and React components.
        </p>

        <div className="code-example">
          <pre>{`// 1. PASSING DATA FROM CLASS TO COMPONENT
const bankRef = useRef(new BankAccount('Alice', 1000));
const [balance, setBalance] = useState(bankRef.current.balance);

// 2. CALLING CLASS METHODS & UPDATING COMPONENT
const handleDeposit = () => {
  const message = bankRef.current.deposit(500);
  setBalance(bankRef.current.balance); // Update UI
};

// 3. PASSING PARAMETERS TO CLASS METHOD
const withdraw = (amount) => {
  bankRef.current.withdraw(amount);
  setBalance(bankRef.current.balance);
};

// 4. RENDERING CLASS DATA IN JSX
return (
  <div>
    <p>Balance: \${balance}</p>
    <button onClick={() => handleDeposit()}>
      Deposit
    </button>
  </div>
);`}</pre>
        </div>

        <h4>Data Flow Pattern:</h4>
        <ul>
          <li><strong>Class Instance (useRef):</strong> Stores the object</li>
          <li><strong>Component State (useState):</strong> Triggers UI updates</li>
          <li><strong>Methods:</strong> Modify class data & state</li>
          <li><strong>JSX:</strong> Displays state values</li>
        </ul>

        <h4>Important Notes:</h4>
        <ul>
          <li>Always call <code>setBalance(bankRef.current.balance)</code> after modifying</li>
          <li>useRef doesn't trigger re-render, so update state too</li>
          <li>Methods in class handle business logic</li>
          <li>Component handles UI/state updates</li>
        </ul>
      </div>
    </div>
  );

  const bestPracticesContent = (
    <div className="scope-demo">
      <div className="demo-box">
        <h3>Best Practices</h3>

        <div className="concept-item">
          <h4>✅ Single Responsibility</h4>
          <p>Each class should do one thing well.</p>
          <pre className="code-example">{`// Good
class BankAccount { /* only banking logic */ }
class EmailNotifier { /* only email logic */ }

// Bad
class BankAccount {
  // handling banking, email, logging, etc.
}`}</pre>
        </div>

        <div className="concept-item">
          <h4>✅ Use Encapsulation</h4>
          <p>Hide internal details with private fields.</p>
          <pre className="code-example">{`class User {
  #password; // Private

  setPassword(newPassword) {
    if (newPassword.length >= 8) {
      this.#password = newPassword;
    }
  }
}`}</pre>
        </div>

        <div className="concept-item">
          <h4>✅ Meaningful Names</h4>
          <p>Use clear, descriptive names for classes and methods.</p>
          <pre className="code-example">{`// Good
class ShoppingCart
method: addProduct()
method: removeProduct()

// Bad
class Cart
method: add()
method: rm()`}</pre>
        </div>

        <div className="concept-item">
          <h4>✅ Keep It Simple</h4>
          <p>Avoid over-engineering; start simple, refactor later.</p>
          <pre className="code-example">{`// Good - simple and clear
class Calculator {
  add(a, b) { return a + b; }
}

// Unnecessary complexity
class AdvancedCalculator {
  add(a, b, options) { /* 100 lines */ }
}`}</pre>
        </div>
      </div>

      <div className="demo-box">
        <h3>Common Mistakes</h3>

        <div className="concept-item">
          <h4>❌ Forgetting 'new' keyword</h4>
          <pre className="code-example">{`const person = Person('John', 'Doe');  // ❌ Error
const person = new Person('John', 'Doe');  // ✅ Correct`}</pre>
        </div>

        <div className="concept-item">
          <h4>❌ Not calling super()</h4>
          <pre className="code-example">{`class Car extends Vehicle {
  constructor(brand, model, doors) {
    // ❌ Error: must call super() first
    this.doors = doors;
  }
}`}</pre>
        </div>

        <div className="concept-item">
          <h4>❌ Mixing useState and useRef poorly</h4>
          <pre className="code-example">{`// ❌ Wrong - won't update UI
const personRef = useRef(new Person());
personRef.current.setAge(30); // No re-render!

// ✅ Correct
const personRef = useRef(new Person());
const [age, setAge] = useState(personRef.current.age);
personRef.current.setAge(30);
setAge(personRef.current.age);`}</pre>
        </div>
      </div>

      <div className="key-concepts">
        <h3>Summary</h3>
        <div className="concept-item">
          <h4>🎯 What is a Class?</h4>
          <p>A template for creating objects with properties and methods.</p>
        </div>
        <div className="concept-item">
          <h4>🔒 Encapsulation</h4>
          <p>Hide private data, expose public methods for controlled access.</p>
        </div>
        <div className="concept-item">
          <h4>🧬 Inheritance</h4>
          <p>Create child classes that inherit from parent classes using extends.</p>
        </div>
        <div className="concept-item">
          <h4>⚛️ React Integration</h4>
          <p>Use useRef for class instances, useState for UI updates.</p>
        </div>
      </div>
    </div>
  );

  const accordionItems = [
    {
      title: '📚 Basic Classes',
      content: basicClassContent
    },
    {
      title: '🔐 Advanced Classes (Getters, Setters, Private)',
      content: advancedClassContent
    },
    {
      title: '🧬 Inheritance (extends & super)',
      content: inheritanceContent
    },
    {
      title: '⚛️ useRef with Classes',
      content: useRefContent
    },
    {
      title: '🔄 Data & Function Passing',
      content: dataFlowContent
    },
    {
      title: '✅ Best Practices & Common Mistakes',
      content: bestPracticesContent
    }
  ];

  return (
    <div className="page">
      <h1>Classes in JavaScript</h1>
      <p>Master Object-Oriented Programming with Classes. Learn constructors, methods, inheritance, and React integration.</p>

      <div style={{ marginTop: '2rem' }}>
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
}

export default Classes;
