import { create } from 'zustand';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense'; 
}

interface AccountState {
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: number) => void;
  editTransaction: (transaction: Transaction) => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  balance: 1050.00,
  transactions: [
    { id: 1, description: 'Salário', amount: 1500, type: 'income' },
    { id: 2, description: 'Aluguel', amount: 500, type: 'expense' },
  ],

  addTransaction: (transaction: Transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),

  removeTransaction: (id: number) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id,
      ),
    })),

  editTransaction: (updatedTransaction: Transaction) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction,
      ),
    })),
}));