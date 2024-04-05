'use client'
import React from 'react';
import Image from "next/image";
import { Userarea, Showarea } from './components/components';

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
