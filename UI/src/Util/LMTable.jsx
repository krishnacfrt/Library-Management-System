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
import { useBooks } from "../Css/book";

const defaultData = [
  {
    name: "Alice",
    uniqueID: 25,
    title: "India",
    author: "Tmko puja h tmse mohabbat ki h",
    publishDates: "Chl dk boss dk",
  },
  {
    name: "Bob",
    uniqueID: 30,
    title: "USA",
    author: "Tmko puja h tmse mohabbat ki h",
    publishDates: "Chl dk boss dk",
  },
  {
    name: "Charlie",
    uniqueID: 28,
    title: "UK",
    author: "Tmko puja h tmse mohabbat ki h",
    publishDates: "Chl dk boss dk",
  },
  {
    name: "David",
    uniqueID: 35,
    title: "Canada",
    author: "Tmko puja h tmse mohabbat ki h",
    publishDates: "Chl dk boss dk",
  },
  {
    name: "Eve",
    uniqueID: 22,
    title: "Australia",
    author: "Tmko puja h tmse mohabbat ki h",
    publishDates: "Chl dk boss dk",
  },
];

const columnHelper = createColumnHelper();

const defaultColumns = [
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

function LMTable() {
  const [data, setData] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(true);

    const {data: tableData, fetchNextPage, hasNextPage, isFetchingNextPage, fetchPreviousPage} = useBooks();
    console.log(tableData, 'inside lm table'); // This will log the flattened array of book results
    console.log(hasNextPage); // This will log whether there are more pages to fetch
  // fetchNextPage();
  const goToPreviousPage = () => {
    if (data && data.pageIndex> 1 ) {
      fetchPreviousPage()
    }
  }
  const goToNextPage = () => {
    if (hasNextPage) {
      fetchNextPage();   
    }
  }

  const table = useReactTable({
    data,
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

  const fetchData = async () => {
    try {
      // const response = await axios.get("DUMMY HUN MAI", {
      //   params: { pageIndex: 0, pageSize: 10 },
      // });
      const response = { data: defaultData };
      setData(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ padding: "2px", maxWidth: "1200px", margin: "auto" }}>
          <h2 className="title">Student Borrowing Details</h2>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) =>
              setPagination({
                pageIndex: 0,
                pageSize: Number(e.target.value),
              })
            }
          >
            {[10, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="search-input"
          />
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
              onClick={() => goToPreviousPage}
              disabled={false}
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
              onClick={goToNextPage}
              disabled={!hasNextPage}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LMTable;
