'use client'
import React from 'react';
import Image from "next/image";

import { useState, useEffect } from "react";
import Graph from "./stage/component/Graph/Graph";
import Draggable from "react-draggable";
import DataTable from "./stage/component/Table/Table";
import ArrayTable from "./stage/component/Table/ArrayTable";
import './stage/component/Table/table.css';
import { headers, items } from './stage/component/Table/tablecontents.js';

import testJson from "../data/testgraph.json";
import testJson2 from "../data/testtable.json";


let dat = [
  [1,2,3,4,5],
  [6,7,8,9,0]
  ]
export default function Home() {

  const [selection, setSelection] = useState([]);
  useEffect(() => {
    console.log(selection);
  }, [selection]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Graph nodes={testJson.nodes} edges={testJson.edges} />
      <Draggable>
        <div>
          <DataTable
            headers={headers}
            items={items}
            selectable={true}
            updateSelection={setSelection} />
        </div>
      </Draggable>
      <Draggable>
        <div>
          <ArrayTable
            board={testJson2}
            />
        </div>
        </Draggable>
    </main >

  );
}
