/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Draggable from 'react-draggable';

interface ArrayTableProps {
  data: (number | string)[] | (number | string)[][];
}

// TableFromMultiArray 컴포넌트
function ArrayTable({ data }: ArrayTableProps) {
  const convertedArray = Array.isArray(data[0])
    ? (data as (number | string)[][])
    : [data as (number | string)[]];
  const maxColumns = Math.max(...convertedArray.map((row) => row.length));

  const tArray = Array.from({ length: maxColumns }, (_, colIndex) =>
    convertedArray.map((row) => row[colIndex]),
  );

  return (
    <div className="h-full w-full overflow-hidden box-border bg-[#CADCA0] border-2 border-[#3D3D3D] flex justify-center">
      <Draggable>
        <div className="inline-block bg-gray-200 rounded-md px-0.5 h-fit m-auto">
          <div className="grid grid-flow-col auto-cols-max">
            {tArray.map((row) => (
              <div className="row">
                {row.map((item) => (
                  <div className="flex items-center justify-center rounded-md bg-gray-100 p-4 hover:bg-gray-300 transition-colors duration-300 h-12 mx-0.5 my-1 font-mono text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default ArrayTable;
