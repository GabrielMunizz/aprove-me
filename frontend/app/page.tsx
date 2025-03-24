'use client';

import Header from '@/components/Header/Header';
import ListPayables from '@/components/ListPayables/ListPayables';
import RegisterPayable from '@/components/RegisterPayable/RegisterPayable';
import { useQuery } from '@tanstack/react-query';
import { handleFetchPayables } from '@/utils/fetch';
import { Payable } from '@/utils/types';
import { useState } from 'react';

export default function Home() {
  const [payables, setPayables] = useState<Payable[]>([]);
  useQuery({
    queryKey: ['payables'],
    queryFn: async () => {
      const response = await handleFetchPayables();

      setPayables(response);
      return response;
    },
  });

  const sortedPayables = payables.sort((a, b) => {
    const cresDate =
      new Date(a.emissionDate).getTime() - new Date(b.emissionDate).getTime();

    return cresDate;
  });

  return (
    <main className="flex flex-col w-full justify-start items-center">
      <Header />
      <section className="flex flex-col w-full justify-center items-center h-[70vh]">
        <RegisterPayable />
      </section>

      <section className="w-[100%] flex flex-col justify-start items-center">
        <div className="w-[1280px]">
          <div className="w-full px-6">
            <h2 className="font-bold text-lg mb-4 text-start">Recebíveis</h2>
          </div>

          <div className="w-full grid grid-cols-2 justify-items-center">
            {sortedPayables.length > 0 ? (
              sortedPayables?.map((payable) => (
                <ListPayables payable={payable} key={payable.id} />
              ))
            ) : (
              <p>Não há recebíveis registrados</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
