import {Userarea, Stage} from "./components/components";


export default function Home() {
  return (
    <main className="flex h-[100vh] flex-row items-center p-5">
      <div className="flex h-[100%] grow-[1] items-center p-5 bg-slate-300">
        <Userarea/>
      </div>
      <div className="flex h-[100%] grow-[2] items-center p-5 bg-slate-400">
        <Stage/>
      </div>
    </main>
  );
}
