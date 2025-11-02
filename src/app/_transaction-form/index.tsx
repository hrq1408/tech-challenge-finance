'use client';

import { useState, useEffect } from "react";
import { useAccountStore, Transaction } from "@/store/accountStore";
import { Button } from "@/components/button";

interface TransactionFormProps {
    onSuccess: () => void;
    transactionToEdit?: Transaction | null;
}

export function TransactionForm({ onSuccess, transactionToEdit }: TransactionFormProps) {
    const { addTransaction, editTransaction } = useAccountStore();
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');

    useEffect(() => {
        if (transactionToEdit) {
            setDescription(transactionToEdit.description);
            setAmount(transactionToEdit.amount.toString());
            setType(transactionToEdit.type);
        } else {
            setDescription('');
            setAmount('');
            setType('expense');
        }
    }, [transactionToEdit]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const numericAmount = parseFloat(amount);
        if (!description || isNaN(numericAmount) || numericAmount <= 0) {
            alert('Por favor, preencha todos os campos corretamente.'); 
            return;
        }

        if (transactionToEdit) {
            editTransaction({
                ...transactionToEdit,
                description,
                amount: numericAmount,
                type,
            });
        } else {
            addTransaction({
                id: Date.now().toString(), 
                description,
                amount: numericAmount,
                type,
            });
        }

        onSuccess(); 
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Valor</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    placeholder="0,00"
                    step="0.01"
                    min="0.01"
                    required
                />
            </div>
            <div className="flex gap-4">
                <label className="flex items-center">
                    <input type="radio" name="type" value="expense" checked={type === 'expense'} onChange={() => setType('expense')} className="focus:ring-primary h-4 w-4 text-primary border-gray-300" />
                    <span className="ml-2 text-sm text-gray-700">Despesa</span>
                </label>
                <label className="flex items-center">
                    <input type="radio" name="type" value="income" checked={type === 'income'} onChange={() => setType('income')} className="focus:ring-primary h-4 w-4 text-primary border-gray-300" />
                    <span className="ml-2 text-sm text-gray-700">Receita</span>
                </label>
            </div>
            <Button type="submit" className="w-full">
                {transactionToEdit ? 'Salvar Alterações' : 'Adicionar'}
            </Button>
        </form>
    );
}