'use client';

import { Card } from "@/layout/card";
import { useAccountStore } from "@/store/accountStore";
import Link from "next/link";

export default function Transactions() {
  const { transactions } = useAccountStore();

  return (
    <main className="w-2/3 mx-auto mt-5">
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">Todas as Transações</h1>
          <Link href="/" className="text-primary font-medium hover:underline">
            Voltar
          </Link>
        </div>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
              <span className="text-gray-600">{transaction.description}</span>
              <span className={`${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'} font-medium`}>
                {transaction.type === 'expense' && '- '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </main>
  );
}