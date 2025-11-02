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
    set((state) => {
      const newTransactions = state.transactions.filter(
        (transaction) => transaction.id !== id,
      );
      return {
        transactions: newTransactions,
        balance: calculateBalance(newTransactions),
      };
    }),

  editTransaction: (updatedTransaction) =>
    set((state) => {
      return {
        transactions: state.transactions.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t
        ),
      };
    }),
}));
