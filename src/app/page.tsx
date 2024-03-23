import Image from "next/image";
import Circle from "./stage/component/Circle";
import DraggableWrapper from "./stage/component/DraggableWrapper";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DraggableWrapper>
        <Circle />
      </DraggableWrapper>
    </main>
  );
}
