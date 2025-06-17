import React, { useEffect, useState } from "react";
import "./LMTable.css";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useBooksQuery } from "../Css/book";

const columnHelper = createColumnHelper();

function AssignBookSearchTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnName, setColumnName] = useState("");
  const [columnValue, setColumnValue] = useState("");

  // Checkbox logic
  const handleCheckboxChange = (rowData) => {
    setSelectedRows((prevSelected) => {
      const exists = prevSelected.some((r) => r.bookid === rowData.bookid);
      if (exists) {
        return prevSelected.filter((r) => r.bookid !== rowData.bookid);
      } else {
        return [...prevSelected, rowData];
      }
    });
  };

  const defaultColumns = [
    {
      id: "select",
      header: "",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedRows.some(
            (r) => r.bookid === row.original.bookid
          )}
          onChange={() => handleCheckboxChange(row.original)}
        />
      ),
    },
    columnHelper.accessor("bookid", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("author", {
      header: "Author",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("published_date", {
      header: "Publish Date",
      cell: (info) => info.getValue(),
    }),
  ];

  const searchableColumnNames = ["name", "uniqueid", "author"];

  // Fetch data
  const {
    data: tableDataRes = {},
    isLoading: loading,
    refetch: refetchTableRes,
  } = useBooksQuery({
    page: pagination.pageIndex + 1,
    page_size: pagination.pageSize,
    search_column: columnName,
    search_value: columnValue,
  });

  // Calculate total pages correctly
  const totalRows = tableDataRes.total || 0;
  const totalPages = Math.ceil(totalRows / pagination.pageSize);

  // Fix: update pageIndex if totalPages changes and current page is out of range
  useEffect(() => {
    if (pagination.pageIndex > 0 && pagination.pageIndex >= totalPages) {
      setPagination((prev) => ({
        ...prev,
        pageIndex: totalPages > 0 ? totalPages - 1 : 0,
      }));
    }
  }, [totalPages, pagination.pageIndex]);

  const handleSearch = () => {
    if (searchableColumnNames.includes(columnName.toLowerCase())) {
      refetchTableRes();
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    } else {
      alert("Enter correct column name");
    }
  };

  const table = useReactTable({
    data: tableDataRes?.books || [],
    columns: defaultColumns,
    state: {
      globalFilter,
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ padding: "2px", maxWidth: "1200px", margin: "auto" }}>
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search by Book Name, Book Id or Author Name within table"
            className="search-input"
          />
          {/* <div>
            <p>Search by Book Name, Book Id or Author Name within database</p>
            <div>
              <input
                type="text"
                value={columnName}
                onChange={(e) => setColumnName(e.target.value)}
                placeholder="Enter column name"
                className="search-input"
              />
              <input
                type="text"
                value={columnValue}
                onChange={(e) => setColumnValue(e.target.value)}
                placeholder="Enter column value"
                className="search-input"
              />
              <button
                type="button" // <-- This prevents form submission/page reload
                onClick={handleSearch}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  marginLeft: "95%",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </div>
          </div> */} 
          {/* todo   */}
          <table className="lm-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc"
                        ? "    \u2191"
                        : ""}
                      {header.column.getIsSorted() === "desc"
                        ? "    \u2193"
                        : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination-container">
            <button
              type="button"
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.max(prev.pageIndex - 1, 0),
                }))
              }
              disabled={pagination.pageIndex === 0}
            >
              Previous
            </button>
            <span>
              Page{" "}
              <strong>
                {pagination.pageIndex + 1} of {totalPages}
              </strong>
            </span>
            <button
              type="button"
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.min(prev.pageIndex + 1, totalPages - 1),
                }))
              }
              disabled={pagination.pageIndex + 1 >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignBookSearchTable;