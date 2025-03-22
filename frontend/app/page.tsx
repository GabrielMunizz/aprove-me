import Header from '@/components/Header/Header';
import RegisterPayable from '@/components/RegisterPayable/RegisterPayable';

export default function Home() {
  return (
    <main className="flex flex-col w-full justify-start items-center">
      <Header />
      <section className="flex flex-col w-full justify-center items-center h-[70vh]">
        <RegisterPayable />
      </section>
    </main>
  );
}
