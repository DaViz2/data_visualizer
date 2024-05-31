import React, { useEffect, useState } from 'react';
import { StructData } from '../../reducer/structdata';
import { useAppSelector } from '../../hooks';
import Graph from './Graph/Graph';
import { VarData } from '../../reducer/vardata';
import { LinkData, NodeData } from '../../assets/testData/testDataType';
import ArrayTable from './Table/ArrayTable';

// Props type definition for ShowComponent
interface ShowComponentProp {
  struct: StructData;
  active: boolean;
}

// Function to create node data from compVardata
const makeNode = (compVardata: { [key: string]: VarData }): NodeData[] => {
  if (!compVardata.Node && !compVardata.Edge) {
    return [];
  }

  if (compVardata.Node) {
    const nodes: number[] = compVardata.Node.value;
    return nodes.map((value) => {
      return { id: value, name: String(value) };
    });
  }

  const edges = compVardata.Edge.value as number[][];
  const nodes: number[] = Array.from(
    new Set(
      edges.reduce((acc, curr, idx) => {
        if (curr.length !== 0) {
          return acc.concat(curr).concat([idx]);
        }
        return acc.concat(curr);
      }, []),
    ),
  );

  return nodes.map((value) => {
    return { id: value, name: String(value) };
  });
};

// Function to create edge data from compVardata
const makeEdge = (compVardata: { [key: string]: VarData }): LinkData[] => {
  if (!compVardata.Edge) {
    return [];
  }
  const edges = compVardata.Edge.value as number[][];
  const retEdges: LinkData[] = [];
  edges.forEach((value, index) => {
    value.forEach((val) => {
      retEdges.push({ source: index, target: val });
    });
  });
  return retEdges;
};

export default function ShowComponent({ struct, active }: ShowComponentProp) {
  // Select vardata and structdata from the Redux store
  const vardata = useAppSelector((state: any) => state.vardata.data);

  // Local state to store computed VarData
  const [compVardata, setCompVardata] = useState<{ [key: string]: VarData }>(
    {},
  );

  // Destructure structType and adj from struct prop
  const { structType, adj } = struct;

  // Effect to update compVardata whenever vardata or adj changes
  useEffect(() => {
    const newCompVarData: { [key: string]: VarData } = {};
    Object.keys(adj).forEach((key) => {
      const value = adj[key];
      vardata.forEach((item: VarData) => {
        if (
          item.name === value.varName &&
          item.functionSpace === value.functionSpace
        ) {
          newCompVarData[key] = item;
        }
      });
    });
    setCompVardata(newCompVarData);
  }, [vardata, adj]);

  // Render different components based on structType
  switch (structType) {
    case 'Graph':
      return (
        <Graph
          nodes={makeNode(compVardata)}
          links={makeEdge(compVardata)}
          active={active}
        />
      );
    case 'Table':
      return (
        <ArrayTable
          data={
            compVardata.General
              ? (compVardata.General.value as number[][])
              : [[]]
          }
        />
      );
    default:
      return <div>error!</div>;
  }
}
