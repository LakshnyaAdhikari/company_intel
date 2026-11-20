import {
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnFiltersState,
  type SortingState,
  useReactTable,
  type ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { getCompanies } from "@/services/api";
import type { CompanySummary } from "@/types/api";

export function Companies() {
  const [companies, setCompanies] = useState<CompanySummary[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCompanies()
      .then(setCompanies)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Unable to load companies");
      });
  }, []);

  useEffect(() => {
    setColumnFilters(
      industryFilter ? [{ id: "industry", value: industryFilter }] : []
    );
  }, [industryFilter]);

  const industries = useMemo(
    () =>
      Array.from(
        new Set(companies.map((company) => company.industry).filter(Boolean))
      ),
    [companies]
  );

  const columns = useMemo<ColumnDef<CompanySummary>[]>(
    () => [
      {
        accessorKey: "company",
        header: ({ column }) => (
          <SortableHeader label="Company" onClick={() => column.toggleSorting()} />
        ),
        cell: ({ row }) => (
          <Link
            className="font-medium text-primary hover:underline"
            to={`/company/${row.original.company}`}
          >
            {row.original.company}
          </Link>
        )
      },
      {
        accessorKey: "industry",
        header: ({ column }) => (
          <SortableHeader label="Industry" onClick={() => column.toggleSorting()} />
        )
      },
      {
        accessorKey: "ceo",
        header: ({ column }) => (
          <SortableHeader label="CEO" onClick={() => column.toggleSorting()} />
        )
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <Button asChild size="sm" variant="outline">
            <Link to={`/company/${row.original.company}`}>Open</Link>
          </Button>
        )
      }
    ],
    []
  );

  const table = useReactTable({
    data: companies,
    columns,
    state: {
      globalFilter,
      sorting,
      columnFilters
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel()
    ,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Companies</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Search, filter, sort, and open stored company profiles.
        </p>
      </div>

      {error ? (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <section className="rounded-md border bg-card">
        <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm"
              placeholder="Search companies..."
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
            />
          </label>
          <select
            className="rounded-md border bg-background px-3 py-2 text-sm"
            value={industryFilter}
            onChange={(event) => setIndustryFilter(event.target.value)}
          >
            <option value="">All industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 align-top">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-8 text-center text-muted-foreground" colSpan={4}>
                    No companies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-3 border-t p-4 text-sm">
          <span className="text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || 1}
          </span>
          <div className="flex gap-2">
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              size="sm"
              variant="outline"
            >
              Previous
            </Button>
            <Button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              size="sm"
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SortableHeader({
  label,
  onClick
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button className="inline-flex items-center gap-2" onClick={onClick}>
      {label}
      <ArrowUpDown className="h-3.5 w-3.5" />
    </button>
  );
}
