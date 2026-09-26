// BankAccount Class - Advanced class with getters, setters, and private fields
class BankAccount {
  #balance; // Private field (cannot be accessed from outside)

  constructor(accountHolder, initialBalance = 0) {
    this.accountHolder = accountHolder;
    this.#balance = initialBalance;
    this.transactions = [];
  }

  // Getter - allows access like bankAccount.balance (read-only)
  get balance() {
    return this.#balance;
  }

  // Method to deposit money
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      this.transactions.push({
        type: 'deposit',
        amount,
        date: new Date().toLocaleString()
      });
      return `Deposited $${amount}. New balance: $${this.#balance}`;
    }
    return 'Invalid deposit amount';
  }

  // Method to withdraw money
  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      this.transactions.push({
        type: 'withdrawal',
        amount,
        date: new Date().toLocaleString()
      });
      return `Withdrawn $${amount}. New balance: $${this.#balance}`;
    }
    return 'Invalid withdrawal amount or insufficient balance';
  }

  // Method to get account summary
  getSummary() {
    return `Account: ${this.accountHolder}\nBalance: $${this.#balance}\nTransactions: ${this.transactions.length}`;
  }

  // Method to get transaction history
  getTransactionHistory() {
    return this.transactions;
  }
}

export default BankAccount;
