'use client';

import Header from '@/components/Header/Header';
import ListPayables from '@/components/ListPayables/ListPayables';
import RegisterPayable from '@/components/RegisterPayable/RegisterPayable';
import { useQuery } from '@tanstack/react-query';
import { handleFetchPayables } from '@/utils/fetch';
import { Payable } from '@/utils/types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TailSpin } from 'react-loader-spinner';

export default function Home() {
  const router = useRouter();
  const [payables, setPayables] = useState<Payable[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useQuery({
    queryKey: ['payables'],
    queryFn: async () => {
      const { data } = await handleFetchPayables();

      setPayables(data);
      return payables;
    },
  });

  const sortedPayables = payables.sort((a, b) => {
    const cresDate =
      new Date(a.emissionDate).getTime() - new Date(b.emissionDate).getTime();

    return cresDate;
  });

  console.log(sortedPayables);

  useEffect(() => {
    const token = localStorage.getItem('token') ?? undefined;
    if (!token) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, []);

  return !isLoading ? (
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
            {sortedPayables?.map((payable) => (
              <ListPayables payable={payable} key={payable.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  ) : (
    <main className="w-full h-[50vh] flex justify-center items-center">
      <TailSpin width={30} color="blue" />
    </main>
  );
}
