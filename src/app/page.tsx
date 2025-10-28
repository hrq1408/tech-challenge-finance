'use client';

import { useState } from "react";
import { Card } from "@/layout/card";
import { Transaction, useAccountStore } from "@/store/accountStore";
import Link from "next/link";
import { Modal } from "@/components/modal";
import { TransactionForm } from "@/components/transaction-form";
import { Button } from "@/components/button";

export default function Home() {
  const { balance, transactions } = useAccountStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const formattedBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(balance);

  return (
    <main className="w-2/3 mx-auto mt-5">
      <Card className="bg-primary text-white">
        <div className="flex justify-between items-center h-20">
          <h1 className="text-2xl">Bem Vindo, João!</h1>
          <div>
            <p className="text-2xl">Saldo: {formattedBalance}</p>
          </div>
        </div>
      </Card>

      <Card className="mt-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-700">Últimas Transações</h2>
            <Link href="/transactions" className="text-primary font-medium hover:underline text-sm">
              Ver todas
            </Link>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            Nova Transação
          </Button>
        </div>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center py-3 border-b last:border-b-0 gap-4">
              <div className="flex-1">
                <span className="text-gray-600">{transaction.description}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'} font-medium w-32 text-right`}>
                  {transaction.type === 'expense' && '- '}
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.amount)}
                </span>
                <Button variant="outline" onClick={() => handleEdit(transaction)}>
                  Editar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        setEditingTransaction(null);
      }}>
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          {editingTransaction ? 'Editar Transação' : 'Adicionar Nova Transação'}
        </h2>
        <TransactionForm onSuccess={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }} transactionToEdit={editingTransaction} />
      </Modal>
    </main>
  );
}