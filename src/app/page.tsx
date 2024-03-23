'use client'

import Image from "next/image";
import Circle from "./stage/component/Circle";
import Draggable from "react-draggable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Draggable>
        <Circle />
      </Draggable>
    </main>
  );
}
