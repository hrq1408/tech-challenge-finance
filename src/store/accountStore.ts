import { create } from "zustand";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
}

interface AccountState {
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  editTransaction: (transaction: Transaction) => void;
}

const initialTransactions: Transaction[] = [
  { id: '1', description: "Salário", amount: 1500, type: "income" },
  { id: '2', description: "Aluguel", amount: 500, type: "expense" },
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
    set((state) => ({
      transactions: [...state.transactions, transaction],
      balance:
        transaction.type === "income"
          ? state.balance + transaction.amount
          : state.balance - transaction.amount,
    })),

  removeTransaction: (id: string) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id,
      ),
    })),

  editTransaction: (updatedTransaction) =>
    set((state) => {
      const oldTransaction = state.transactions.find(
        (t) => t.id === updatedTransaction.id
      );
      if (!oldTransaction) return state; 

      let newBalance = state.balance;
      newBalance =
        oldTransaction.type === "income"
          ? newBalance - oldTransaction.amount
          : newBalance + oldTransaction.amount;
      newBalance =
        updatedTransaction.type === "income"
          ? newBalance + updatedTransaction.amount
          : newBalance - updatedTransaction.amount;

      return {
        transactions: state.transactions.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t
        ),
        balance: newBalance,
      };
    }),
}));
