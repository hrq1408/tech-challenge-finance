import { create } from "zustand";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: Date;
}

interface AccountState {
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  editTransaction: (transaction: Transaction) => void;
}

const initialTransactions: Transaction[] = [
  { id: '1', description: "Salário", amount: 1500, type: "income", date:  new Date('2025-10-05T00:10:00') },
  { id: '2', description: "Aluguel", amount: 500, type: "expense", date: new Date('2025-10-10T00:10:00') },
];

const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);
};

export const useAccountStore = create<AccountState>((set) => ({
  balance: calculateBalance(initialTransactions),
  transactions: initialTransactions,

  addTransaction: (transaction: Transaction) =>
    set((state) => {
      const newTransactions = [...state.transactions, transaction];
      return {
        transactions: newTransactions,
        balance: calculateBalance(newTransactions),
      };
    }),

  removeTransaction: (id: string) =>
    set((state) => {
      const transactionToRemove = state.transactions.find(
        (transaction) => transaction.id === id
      );
      if (!transactionToRemove) return state;

      const newBalance =
        transactionToRemove.type === "income"
          ? state.balance - transactionToRemove.amount
          : state.balance + transactionToRemove.amount;

      return {
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== id
        ),
        balance: newBalance,
      };
    }),

  editTransaction: (updatedTransaction) =>
    set((state) => {
      const newTransactions = state.transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      );
      return {
        transactions: newTransactions,
        balance: calculateBalance(newTransactions),
      };
    }),
}));
