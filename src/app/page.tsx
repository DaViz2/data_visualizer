'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import Circle from "./stage/component/Circle";
import Draggable from "react-draggable";
import DataTable from "./stage/component/Table/Table";
import './stage/component/Table/table.css';
import {headers,items} from './stage/component/Table/tablecontents.js';



export default function Home() {
  const nodes = [1, 2, 3].map((val, index)=>
    <Draggable>
      <div>
        <Circle key={index} value={val} />
      </div> 
    </Draggable>
  )
  
  const [selection, setSelection] = useState([]);
  useEffect(() => {
    console.log(selection);
  }, [selection]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {nodes}
      
      <Draggable>
        <div>
          <DataTable
            headers={headers}
            items={items}
            selectable={true}
            updateSelection={setSelection} />
        </div>
      </Draggable>
    </main>

  );
}
