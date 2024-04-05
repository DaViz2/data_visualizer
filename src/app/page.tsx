'use client'
import React from 'react';
import Image from "next/image";
import Draggable from "react-draggable";
import Graph from "./stage/component/graph/Graph";

import testJson from "../data/testgraph.json";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Graph nodes={testJson.nodes} edges={testJson.edges}  />
    </main>
  );
}
