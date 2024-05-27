import React from 'react';
import { StructData } from '../../reducer/structdata';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Graph from './Graph/Graph';
import Table from './Table/Table';

interface ShowComponentProp {
  struct: StructData;
}

export default function ShowComponent({ struct }: ShowComponentProp) {
  const vars = useAppSelector((state) => state.vardata.data);
  const dispatch = useAppDispatch();
  const { structId, structType, adj } = struct;

  adj.map((value) => {
    const vardata = vars.find((varValue) => value.varName === varValue.name);
    return vardata.value;
  });
  switch (structType) {
    case 'Graph':
      return <Graph />;
    case 'Table':
      return <Table />;
    default:
      return <div>error!</div>;
  }
}
