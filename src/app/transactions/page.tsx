'use client';

import { useState } from "react";
import { Card } from "@/layout/card";
import { useAccountStore, Transaction } from "@/store/accountStore";
import Link from "next/link";
import { Button } from "@/components/button";
import { Modal } from "@/components/modal";
import { TransactionForm } from "@/components/transaction-form";

export default function Transactions() {
  const { transactions, removeTransaction } = useAccountStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleView = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleDelete = (transaction: Transaction) => {
    if (confirm(`Tem certeza que deseja excluir a transação "${transaction.description}"?`)) {
      removeTransaction(transaction.id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <main className="w-2/3 mx-auto mt-5">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">Todas as Transações</h1>
          <Link href="/" className="text-primary font-medium hover:underline">
            Voltar
          </Link>
        </div>
        {transactions.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p>Nenhuma transação encontrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Descrição</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tipo</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Valor</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Ações</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-gray-700">{transaction.description}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'} font-medium text-right block`}>
                        {transaction.type === 'expense' && '- '}
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(transaction.amount)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => handleView(transaction)}
                          className="text-xs px-2 py-1"
                        >
                          Ver
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleEdit(transaction)}
                          className="text-xs px-2 py-1"
                        >
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleDelete(transaction)}
                          className="text-xs px-2 py-1 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                        >
                          Deletar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal de edição */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Editar Transação
        </h2>
        <TransactionForm onSuccess={handleCloseModal} transactionToEdit={editingTransaction} />
      </Modal>

      {/* Modal de visualização */}
      <Modal 
        isOpen={!!selectedTransaction} 
        onClose={() => setSelectedTransaction(null)}
      >
        {selectedTransaction && (
          <>
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Detalhes da Transação
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <p className="mt-1 text-gray-900">{selectedTransaction.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <p className="mt-1">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    selectedTransaction.type === 'income' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {selectedTransaction.type === 'income' ? 'Receita' : 'Despesa'}
                  </span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valor</label>
                <p className={`mt-1 text-xl font-bold ${selectedTransaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedTransaction.type === 'expense' && '- '}
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(selectedTransaction.amount)}
                </p>
              </div>
              <div className="pt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingTransaction(selectedTransaction);
                    setSelectedTransaction(null);
                    setIsModalOpen(true);
                  }}
                  className="flex-1"
                >
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (confirm(`Tem certeza que deseja excluir a transação "${selectedTransaction.description}"?`)) {
                      removeTransaction(selectedTransaction.id);
                      setSelectedTransaction(null);
                    }
                  }}
                  className="flex-1 text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                >
                  Deletar
                </Button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </main>
  );
}


