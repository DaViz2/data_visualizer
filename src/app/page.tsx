import { Userarea, Showarea } from './components/components';

export default function Home() {
  // <main className="flex h-[100vh] flex-row items-center p-5"></main>
  return (
    <main className="flex h-full flex-row items-center p-5 bg-gray">
      <div
        className="flex h-full items-center p-5 bg-slate-300"
        style={{ maxWidth: '40%', minWidth: '40%' }}
      >
        <Userarea />
      </div>
      <div
        className="flex h-full items-center p-5 bg-slate-100"
        style={{ maxWidth: '60%', minWidth: '60%' }}
      >
        <Showarea />
      </div>
    </main>
  );
}
