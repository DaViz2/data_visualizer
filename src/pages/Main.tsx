import React from 'react';
import { Showarea, Userarea } from '../component/components';

export default function Home() {
  return (
    <main className="flex h-[100vh] flex-row items-center p-5">
      <div className="flex h-[100%] w-[40%] items-center p-5 bg-slate-300">
        <Userarea />
      </div>
      <div className="flex h-[100%] w-[60%] items-center p-5 bg-slate-400">
        <Showarea />
      </div>
    </main>
  );
}
