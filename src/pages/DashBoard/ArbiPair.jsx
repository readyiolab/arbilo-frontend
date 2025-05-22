import React, { useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const ArbiPair = ({ data = [], loading, error }) => {
  const columns = useMemo(
    () => [
      {
        header: "Coin Pair",
        accessorKey: "pair",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            {row.original.pair || "-"}
          </span>
        ),
      },
      {
        header: "Coin 1",
        accessorKey: "coin1",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            {row.original.coin1 || "-"}
          </span>
        ),
      },
      {
        header: "Coin 2",
        accessorKey: "coin2",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            {row.original.coin2 || "-"}
          </span>
        ),
      },
      {
        header: "Exchange A",
        accessorKey: "minExchange",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            {row.original.minExchange || "-"}
          </span>
        ),
      },
      {
        header: () => (
          <div className="flex flex-col">
            <span>Coin 1 Price @</span>
            <span>Exchange A</span>
          </div>
        ),
        accessorKey: "minPrice1",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            ${Number(row.original.minPrice1 || 0).toFixed(2)}
          </span>
        ),
      },
      {
        header: () => (
          <div className="flex flex-col">
            <span>Coin 2 Price @</span>
            <span>Exchange A</span>
          </div>
        ),
        accessorKey: "minPrice2",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            ${Number(row.original.minPrice2 || 0).toFixed(2)}
          </span>
        ),
      },
      {
        header: "Exchange B",
        accessorKey: "maxExchange",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            {row.original.maxExchange || "-"}
          </span>
        ),
      },
      {
        header: () => (
          <div className="flex flex-col">
            <span>Coin 1 Price @</span>
            <span>Exchange B</span>
          </div>
        ),
        accessorKey: "maxPrice1",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            ${Number(row.original.maxPrice1 || 0).toFixed(2)}
          </span>
        ),
      },
      {
        header: () => (
          <div className="flex flex-col">
            <span>Coin 2 Price @</span>
            <span>Exchange B</span>
          </div>
        ),
        accessorKey: "maxPrice2",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            ${Number(row.original.maxPrice2 || 0).toFixed(2)}
          </span>
        ),
      },
      {
        header: "Profit %",
        accessorKey: "profitPercentage",
        cell: ({ row }) => (
          <span className="font-medium text-gray-900">
            {Number(row.original.profitPercentage || 0).toFixed(2)}%
          </span>
        ),
        sortingFn: "alphanumeric",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [{ id: "profitPercentage", desc: true }],
      pagination: { pageSize: 10 },
    },
  });

  const {
    getHeaderGroups,
    getRowModel,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    getPageCount,
    setPageSize,
    getState,
    setPageIndex,
  } = table;

  // Reset pageIndex to 0 when data changes
  useEffect(() => {
    setPageIndex(0);
  }, [data, setPageIndex]);

  return (
    <div className="w-full overflow-x-auto">
      {error && (
        <div className="text-red-500 mb-4 text-center">Error: {error}</div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-bold text-xs sm:text-sm whitespace-nowrap bg-gray-100 text-gray-900"
                  >
                    <button
                      className="flex items-center gap-1"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <ChevronDown
                          className={`h-4 w-4 ${
                            header.column.getIsSorted() === "desc" ? "transform rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading data...
                </TableCell>
              </TableRow>
            ) : getRowModel().rows.length > 0 ? (
              getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-xs sm:text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
       
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={getState().pagination.pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded-md p-1 text-sm"
          >
            {[10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArbiPair;