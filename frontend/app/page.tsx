'use client';

import Header from '@/components/Header/Header';
import ListPayables from '@/components/ListPayables/ListPayables';
import RegisterPayable from '@/components/RegisterPayable/RegisterPayable';
import { useQuery } from '@tanstack/react-query';
import { handleFetchPayables } from '@/utils/fetch';
import { Payable } from '@/utils/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const [payables, setPayables] = useState<Payable[]>([]);
  // const { data } = useQuery({
  //   queryKey: ['payables'],
  //   queryFn: async () => {
  //     const { data } = await handleFetchPayables();
  //     if (data) {
  //       return data as Payable[];
  //     }

  //     return [] as Payable[];
  //   },
  // });

  useEffect(() => {
    const getPayables = async () => {
      const response = await handleFetchPayables();
      if (!response) {
        setPayables([]);
      }

      console.log(response);

      setPayables(response);
    };

    getPayables();
  }, []);

  return (
    <main className="flex flex-col w-full justify-start items-center">
      <Header />
      <section className="flex flex-col w-full justify-center items-center h-[70vh]">
        <RegisterPayable />
      </section>

      <section className="w-[90%] flex flex-col justify-start items-center">
        <h2 className="font-bold text-lg mb-4 w-[70%] text-start">
          Recebíveis
        </h2>

        <div className="w-[80%] grid grid-cols-2 justify-items-center">
          {payables.length > 0 ? (
            payables?.map((payable) => (
              <ListPayables payable={payable} key={payable.id} />
            ))
          ) : (
            <p>Não há recebíveis registrados</p>
          )}
        </div>
      </section>
    </main>
  );
}
