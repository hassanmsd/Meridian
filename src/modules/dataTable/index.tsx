import * as React from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useData } from "@/contexts/JSONDataContext";

import type { DataRow } from "@/types/global";

const DataTable = () => {
  const { tableData } = useData();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data: tableData,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true, // All rows can expand
    state: {
      columnFilters,
      expanded,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter prompts..."
          value={(table.getColumn("prompt")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("prompt")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          placeholder="Filter by location..."
          value={
            (table.getColumn("location")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("location")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected()}
                    className="cursor-pointer"
                    onClick={() => row.toggleExpanded()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="w-8 py-4">
                      {row.getIsExpanded() ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                  </TableRow>

                  {row.getIsExpanded() && (
                    <TableRow>
                      <TableCell colSpan={columns.length + 1} className="p-0">
                        <div className="px-6 py-4 bg-gray-50 border-t">
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-gray-700">
                              Response:
                            </h4>
                            <div className="text-sm text-gray-900 bg-white p-3 rounded border whitespace-pre-wrap break-words">
                              {row.original.response}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center py-4"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;

const columns: ColumnDef<DataRow>[] = [
  {
    accessorKey: "prompt",
    header: "Prompt",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("prompt")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div>{row.getValue("location")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
];
