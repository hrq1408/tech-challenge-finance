'use client';

import { Card } from "@/layout/card";
import { useAccountStore } from "@/store/accountStore";

export default function Home() {
  // Usamos o hook para acessar o estado global
  const { balance } = useAccountStore();

  // Formatamos o saldo para a moeda local (Real)
  const formattedBalance = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(balance);

  return (
    <Card className="w-2/3 mx-auto mt-5 bg-primary text-white">
      <div className=" flex justify-between items-center h-20">
        <h1 className="text-2xl">Bem Vindo, João!</h1>
        <div>
          <p className="text-2xl">Saldo: {formattedBalance}</p>
        </div>
      </div>
    </Card>
  );
}