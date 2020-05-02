import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.getIncome();
    const outcome = this.getOutcome();

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }

  private getIncome(): number {
    return this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'income') return sum + transaction.value;
      return sum;
    }, 0);
  }

  private getOutcome(): number {
    return this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'outcome') return sum + transaction.value;
      return sum;
    }, 0);
  }
}

export default TransactionsRepository;
