import { useMemo } from 'react';
import Draggable from 'react-draggable';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

// show3
function createColumnsFromData(data: object[]): ColumnDef<any>[] {
  if (data.length === 0) {
    return [];
  }

  const sample = data[0]; // 데이터의 첫 번째 객체로부터 필드 추출
  const keys = Object.keys(sample); // 모든 필드 이름을 추출

  return keys.map((key) => ({
    header: key.charAt(0).toUpperCase() + key.slice(1), // 헤더 이름을 대문자로 시작
    accessorKey: key,
  }));
}

function Table({ data }: { data: object[] }) {
  const memoizedData = useMemo(() => data, []); // 데이터 메모이제이션
  const memoizedColumns = useMemo(() => createColumnsFromData(data), [data]); // 컬럼 자동 생성
  // useReactTable 훅에 getCoreRowModel 옵션 추가
  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(), // 필수 행 모델 지정
  });

  return (
    <div className="h-full w-full overflow-hidden box-border bg-[#CADCA0] border-[#3D3D3D] flex justify-center">
      <Draggable positionOffset={{ x: 0, y: '100%' }}>
        <table className="h-fit">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-x divide-gray-200 divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getAllCells().map((cell) => (
                  <td key={cell.id}>
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

export default Table;
