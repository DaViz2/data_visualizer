'use client'

import Image from "next/image";
import Circle from "./stage/component/Circle";
import Draggable from "react-draggable";

export default function Home() {
  const nodes = [1, 2, 3].map((val, index)=>
    <Draggable>
      <div>
        <Circle key={index} value={val} />
      </div> 
    </Draggable>
  )
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {nodes}
    </main>
  );
}
