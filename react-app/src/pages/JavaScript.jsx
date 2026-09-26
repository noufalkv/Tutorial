import { useState } from 'react';
import Accordion from '../components/Accordion';
import './Pages.css';
import './ScopeClosuresDemo.css';

function JavaScript() {
  const [closureOutput, setClosureOutput] = useState('');

  // Example 1: Global vs Local Scope
  const globalVar = 'I am global';

  const demonstrateScope = () => {
    const localVar = 'I am local';
    setClosureOutput(`Global: ${globalVar}\nLocal: ${localVar}`);
  };

  // Example 2: Closure - Function returns another function
  const createCounter = () => {
    let count = 0;

    return {
      increment: () => {
        count++;
        return count;
      },
      decrement: () => {
        count--;
        return count;
      },
      getCount: () => count
    };
  };

  const [counter1] = useState(createCounter());
  const [counter2] = useState(createCounter());

  const handleIncrement1 = () => {
    setClosureOutput(`Counter 1: ${counter1.increment()}`);
  };

  const handleIncrement2 = () => {
    setClosureOutput(`Counter 2: ${counter2.increment()}`);
  };

  // Example 3: Module Pattern with Closure
  const createUserModule = () => {
    let user = {
      name: 'John',
      email: 'john@example.com'
    };

    return {
      getUserInfo: () => `${user.name} (${user.email})`,
      updateEmail: (newEmail) => {
        user.email = newEmail;
        return `Email updated to: ${user.email}`;
      }
    };
  };

  const [userModule] = useState(createUserModule());
  const [moduleOutput, setModuleOutput] = useState('');

  const handleShowUserInfo = () => {
    setModuleOutput(userModule.getUserInfo());
  };

  const handleUpdateEmail = () => {
    const result = userModule.updateEmail('john.doe@example.com');
    setModuleOutput(result);
  };

  // Scope & Closures Content
  const scopeClosuresContent = (
    <div className="scope-demo">
      {/* Example 1: Scope */}
      <div className="demo-box">
        <h3>1. Variable Scope</h3>
        <p className="description">
          Scope determines where a variable is accessible. There are 3 types:
        </p>
        <ul>
          <li><strong>Global:</strong> Accessible everywhere</li>
          <li><strong>Local:</strong> Only accessible inside the function</li>
          <li><strong>Block:</strong> Only accessible inside the block (let, const)</li>
        </ul>

        <div className="code-example">
          <pre>{`const globalVar = 'Global';  // Accessible everywhere

function myFunction() {
  const localVar = 'Local';   // Only in this function
  {
    const blockVar = 'Block';  // Only in this block
  }
}`}</pre>
        </div>

        <button onClick={demonstrateScope} className="demo-btn">
          Run Scope Example
        </button>
      </div>

      {/* Example 2: Closures */}
      <div className="demo-box">
        <h3>2. Closures</h3>
        <p className="description">
          A closure is a function that "remembers" variables from its outer scope, even after the outer function has finished.
        </p>

        <div className="code-example">
          <pre>{`function createCounter() {
  let count = 0;  // This variable is "closed over"

  return {
    increment: () => ++count,
    getCount: () => count
  };
}`}</pre>
        </div>

        <p className="explanation">
          Each call to <code>createCounter()</code> creates its own isolated <code>count</code> variable.
        </p>

        <div className="buttons-group">
          <div className="counter-demo">
            <p>Counter 1:</p>
            <button onClick={handleIncrement1} className="demo-btn">
              Increment Counter 1
            </button>
          </div>

          <div className="counter-demo">
            <p>Counter 2:</p>
            <button onClick={handleIncrement2} className="demo-btn">
              Increment Counter 2
            </button>
          </div>
        </div>

        <p className="info-note">
          ℹ️ Notice: Each counter has its own independent <code>count</code> variable.
          They don't interfere with each other!
        </p>
      </div>

      {/* Example 3: Module Pattern */}
      <div className="demo-box">
        <h3>3. Module Pattern (Data Privacy)</h3>
        <p className="description">
          The module pattern uses closures to create private variables and public methods. This is a practical pattern for encapsulation.
        </p>

        <div className="code-example">
          <pre>{`function createUserModule() {
  // Private variable
  let user = {
    name: 'John',
    email: 'john@example.com'
  };

  // Public methods (can access private data)
  return {
    getUserInfo: () => user.name + ' (' + user.email + ')',
    updateEmail: (newEmail) => {
      user.email = newEmail;
    }
  };
}

const myUser = createUserModule();
myUser.getUserInfo();     // Works ✓
myUser.user;              // undefined ✗ (private)`}</pre>
        </div>

        <p className="explanation">
          The <code>user</code> object is private and can only be accessed through public methods.
        </p>

        <div className="buttons-group">
          <div className="counter-demo">
            <p>Get User Info:</p>
            <button onClick={handleShowUserInfo} className="demo-btn">
              Show Info
            </button>
          </div>

          <div className="counter-demo">
            <p>Update User:</p>
            <button onClick={handleUpdateEmail} className="demo-btn">
              Update Email
            </button>
          </div>
        </div>

        <p className="info-note">
          ℹ️ The <code>user</code> data is private. You can only access it through the public methods!
        </p>
      </div>

      {/* Output */}
      {closureOutput && (
        <div className="output-box">
          <h4>Output:</h4>
          <pre>{closureOutput}</pre>
        </div>
      )}
      {moduleOutput && (
        <div className="output-box">
          <h4>Module Output:</h4>
          <pre>{moduleOutput}</pre>
        </div>
      )}

      {/* Key Concepts */}
      <div className="key-concepts">
        <h3>Key Concepts</h3>
        <div className="concept-item">
          <h4>🔍 Lexical Scope</h4>
          <p>Inner functions can access variables from outer functions.</p>
        </div>
        <div className="concept-item">
          <h4>📦 Encapsulation</h4>
          <p>Closures allow you to hide private variables from the global scope.</p>
        </div>
        <div className="concept-item">
          <h4>⚙️ Persistent State</h4>
          <p>Closures can maintain state between function calls.</p>
        </div>
      </div>
    </div>
  );

  // Accordion items - easy to add more later
  const accordionItems = [
    {
      title: '📚 Scope & Closures',
      content: scopeClosuresContent
    }
    // Add more topics here:
    // {
    //   title: '🔄 Async & Await',
    //   content: <div>Coming soon...</div>
    // },
    // {
    //   title: '📦 Modules & Imports',
    //   content: <div>Coming soon...</div>
    // }
  ];

  return (
    <div className="page">
      <h1>JavaScript</h1>
      <p>Learn JavaScript concepts with practical examples.</p>

      <div style={{ marginTop: '2rem' }}>
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
}

export default JavaScript;
