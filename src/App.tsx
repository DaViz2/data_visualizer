'use client'
import React from 'react';
import { Userarea, Showarea, Stage } from './components/components';

import { useState, useEffect } from "react";
import Graph from "./stage/component/Graph/Graph";
import Draggable from "react-draggable";
import DataTable from "./stage/component/Table/Table";
import ArrayTable from "./stage/component/Table/ArrayTable";
import './stage/component/Table/table.css';
import { headers, items } from './stage/component/Table/tablecontents.js';


let dat = [
  [1,2,3,4,5],
  [6,7,8,9,0]
  ]

export default function App() {
  // <main className="flex h-[100vh] flex-row items-center p-5"></main>
  return (
    <main className="flex h-[100vh] flex-row items-center p-5">
      <div className="flex h-[100%] grow-[1] items-center p-5 bg-slate-300">
        <Userarea />
      </div>
      <div className="flex h-[100%] grow-[2] items-center p-5 bg-slate-400">
        <Stage />
      </div>
    </main>
  );
}