'use client';

import { useState } from "react";
import { Card } from "@/layout/card";
import { Transaction, useAccountStore } from "@/store/accountStore";
import Link from "next/link";
import { Modal } from "@/layout/modal";
import { TransactionForm } from "@/app/_transaction-form";
import { Button } from "@/components/button";

export default function Home() {
  const { balance, transactions, removeTransaction } = useAccountStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [transactionToRemove, setTransactionToRemove] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [viewingTransaction, setViewingTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setViewingTransaction(transaction);
    setIsDetailsModalOpen(true);
  };

  const handleRemove = (transactionId: string) => {
    setTransactionToRemove(transactionId);
    setIsConfirmModalOpen(true);
  };

  const confirmRemove = () => {
    if (transactionToRemove) {
      removeTransaction(transactionToRemove);
      setTransactionToRemove(null);
      setIsConfirmModalOpen(false);
    }
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
                <span className="text-sm text-gray-500">
                  {new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.date))}
                </span>
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
                <Button variant="outline" onClick={() => handleViewDetails(transaction)}>
                  Detalhes
                </Button>
                <Button variant="outline" onClick={() => handleEdit(transaction)}>
                  Editar
                </Button>
                <Button variant="error" onClick={() => handleRemove(transaction.id)}>
                  Remover
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

      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)}>
        <h2 className="text-xl font-bold text-gray-700 mb-4">Confirmar Remoção</h2>
        <p className="text-gray-600 mb-6">Tem certeza que deseja remover esta transação?</p>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="error" onClick={confirmRemove}>
            Confirmar
          </Button>
        </div>
      </Modal>

      <Modal isOpen={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)}>
        {viewingTransaction && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Detalhes da Transação</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Descrição:</strong> {viewingTransaction.description}</p>
              <p><strong>Valor:</strong>
                <span className={`font-semibold ${viewingTransaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(viewingTransaction.amount)}
                </span>
              </p>
              <p><strong>Tipo:</strong> {viewingTransaction.type === 'income' ? 'Receita' : 'Despesa'}</p>
              <p><strong>Data:</strong> {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(viewingTransaction.date))}</p>
            </div>
            <div className="flex justify-end mt-8">
              <Button onClick={() => setIsDetailsModalOpen(false)}>
                Fechar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}