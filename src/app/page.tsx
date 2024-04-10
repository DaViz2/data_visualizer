'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Draggable from 'react-draggable';
import { Userarea, Showarea, Stage } from './components/components';

import Graph from './stage/component/Graph/Graph';
import DataTable from './stage/component/Table/Table';
import ArrayTable from './stage/component/Table/ArrayTable';
import './stage/component/Table/table.css';
import { headers, items } from './stage/component/Table/tablecontents.js';

import testJson from '../data/testgraph.json';
import testJson2 from '../data/testtable.json';

const dat = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 0],
];
export default function Home() {
  // <main className="flex h-[100vh] flex-row items-center p-5"></main>
  return (
    <main className="flex h-[100vh] flex-row items-center p-5">
      <div
        className="flex h-[100%] grow-[1] items-center p-5 bg-slate-300"
        style={{ maxWidth: '40%', minWidth: '40%' }}
      >
        <Userarea />
      </div>
      <div
        className="flex h-[100%] grow-[2] items-center p-5 bg-slate-400"
        style={{ maxWidth: '60%', minWidth: '60%' }}
      >
        <Showarea />
      </div>
    </main>
  );
}
