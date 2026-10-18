// BankAccount Class - TypeScript with private fields and getters

interface Transaction {
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
}

interface AccountSummary {
  accountHolder: string;
  balance: number;
  transactionCount: number;
}

class BankAccount {
  accountHolder: string;
  transactions: Transaction[] = [];
  #balance: number;

  constructor(accountHolder: string, initialBalance: number = 0) {
    if (initialBalance < 0) {
      throw new Error('Initial balance cannot be negative');
    }
    this.accountHolder = accountHolder;
    this.#balance = initialBalance;
  }

  // Getter for balance (read-only access)
  get balance(): number {
    return this.#balance;
  }

  deposit(amount: number): string {
    if (amount <= 0) {
      return 'Deposit amount must be positive';
    }

    this.#balance += amount;
    this.transactions.push({
      type: 'deposit',
      amount,
      date: new Date().toLocaleString()
    });

    return `Deposited $${amount}. New balance: $${this.#balance}`;
  }

  withdraw(amount: number): string {
    if (amount <= 0) {
      return 'Withdrawal amount must be positive';
    }

    if (amount > this.#balance) {
      return `Insufficient balance. Current balance: $${this.#balance}`;
    }

    this.#balance -= amount;
    this.transactions.push({
      type: 'withdrawal',
      amount,
      date: new Date().toLocaleString()
    });

    return `Withdrawn $${amount}. New balance: $${this.#balance}`;
  }

  getSummary(): AccountSummary {
    return {
      accountHolder: this.accountHolder,
      balance: this.#balance,
      transactionCount: this.transactions.length
    };
  }

  getTransactionHistory(): Transaction[] {
    return [...this.transactions]; // Return copy to prevent external modification
  }

  // Reset balance (dangerous operation)
  private resetBalance(amount: number): void {
    this.#balance = amount;
  }
}

export default BankAccount;
export type { Transaction, AccountSummary };
