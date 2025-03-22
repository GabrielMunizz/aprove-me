import Header from '@/components/Header/Header';
import RegisterPayable from '@/components/RegisterPayable/RegisterPayable';

export default function Home() {
  return (
    <main className="flex flex-col w-full justify-start">
      <Header />
      <RegisterPayable />
    </main>
  );
}
