/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import Draggable from 'react-draggable';
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

// show2
// 프로퍼티 타입 정의
interface TableFromMultiArrayProps {
  data: number[][]; // 다차원 배열 형태의 데이터
}

// 컬럼 자동 생성 함수
function createColumnsFromArray(data: number[][]): ColumnDef<number[]>[] {
  if (data.length === 0) {
    return [];
  }

  const columnCount = data[0].length; // 첫 번째 행의 길이로 컬럼 수 결정
  const columns = [];

  for (let i = 0; i < columnCount; i += 1) {
    columns.push({
      header: `Column ${i + 1}`, // 컬럼 헤더 이름 설정
      accessorFn: (row: any) => row[i], // 각 행의 i번째 요소를 가져오는 함수
    });
  }

  return columns;
}

// TableFromMultiArray 컴포넌트
function ArrayTable({ data }: TableFromMultiArrayProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const fgRef = useRef<any>(null);

  // 데이터와 컬럼 메모이제이션
  const memoizedColumns = useMemo(() => createColumnsFromArray(data), [data]);
  const memoizedData = useMemo(() => data, [data]);

  // 테이블 생성
  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(), // 행 모델 지정
  });

  return (
    <div className="h-full w-full overflow-hidden box-border bg-white border-2 border-black">
      <Draggable>
        <table>
          <tbody className="bg-white divide-x divide-gray-200 divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getAllCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-center hover:bg-gray-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Draggable>
    </div>
  );
}

export default ArrayTable;
