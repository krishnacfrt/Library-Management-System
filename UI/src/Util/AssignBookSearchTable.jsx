import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const handleCheckboxChange = (rowData) => {
    setSelectedRows((prevSelected) => {
      const exists = prevSelected.some((r) => r.uniqueID === rowData.uniqueID);
      if (exists) {
        return prevSelected.filter((r) => r.uniqueID !== rowData.uniqueID);
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
            (r) => r.uniqueID === row.original.uniqueID
          )}
          onChange={() => handleCheckboxChange(row.original)}
        />
      ),
    },
    columnHelper.accessor("uniqueID", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
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
    columnHelper.accessor("publishDates", {
      header: "Publish Dates",
      cell: (info) => info.getValue(),
    }),
  ];

  const searchableColumnNames = ["name", "uniqueid", "author"];

  const {
    data: tableDataRes,
    isLoading: loading,
    refetch: refetchTableRes,
  } = useBooksQuery({
    page: pagination.pageIndex + 1,
    page_size: pagination.pageSize,
    search_column: columnName,
    search_value: columnValue,
  });

  const handleSearch = () => {
    if (searchableColumnNames.includes(columnName.toLowerCase())) {
      refetchTableRes();
    } else {
      alert("Enter conrrect column name");
    }
  };

  const table = useReactTable({
    data: tableDataRes.books,
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
            placeholder="Search by Book Name, Book Id or Author Name with in table"
            className="search-input"
          />
          <div>
            <p>Search by Book Name, Book Id or Author Name with in database</p>
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
              onClick={() =>
                setPagination((prevPagination) => ({
                  ...prevPagination,
                  pageIndex: prevPagination.pageIndex - 1,
                }))
              }
              disabled={pagination.pageIndex > 0 ? false : true}
            >
              Previous
            </button>
            <span>
              Page{" "}
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <button
              onClick={() =>
                setPagination((prevPagination) => ({
                  ...prevPagination,
                  pageIndex: prevPagination.pageIndex + 1,
                }))
              }
              disabled={
                (pagination.pageIndex + 2) * 10 > tableDataRes.total &&
                (pagination.pageIndex + 2) * 10 - tableDataRes.total >= 10
                  ? true
                  : false
              }
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
