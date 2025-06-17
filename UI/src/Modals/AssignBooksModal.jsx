import React, { useState, useMemo, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Css/AssignBooksModal.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import axios from "axios";

const fetchBooks = async (search) => {
  const params = search
    ? { page: 1, page_size: 50, search }
    : { page: 1, page_size: 50 };
  const res = await axios.get("/books", { params });
  return res.data.books || [];
};

const fetchUser = async (userId) => {
  const res = await axios.get(`/users/${userId}`);
  return res.data;
};

const assignBooks = async ({ userId, books }) => {
  return axios.post("/transaction", { userId, books });
};

const columnHelper = createColumnHelper();

const AssignBooksModal = ({ show, handleClose }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  // Fetch books with search
  const {
    data: books = [],
    isLoading: loadingBooks,
    isError: errorBooks,
    refetch: refetchBooks,
  } = useQuery({
    queryKey: ["books", search],
    queryFn: () => fetchBooks(search),
    enabled: show,
  });

  // Fetch user details
  const { mutate: fetchUserDetails, isLoading: loadingUser } = useMutation({
    mutationFn: fetchUser,
    onSuccess: (data) => {
      setUserDetails(data.user);
      toast.success("User details fetched!");
    },
    onError: (err) => {
      setUserDetails(null);
      toast.error(
        err.response?.data?.detail ||
          "User not found or error fetching details."
      );
    },
  });

  // Assign books mutation
  const { mutate: assignBooksToUser, isLoading: assigning } = useMutation({
    mutationFn: assignBooks,
    onSuccess: () => {
      toast.success("Books assigned successfully!");
      setShowCheckout(false);
      handleClose();
      queryClient.invalidateQueries(["books"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.detail || "Error assigning books.");
    },
  });

  // Reset modal state on open/close
  useEffect(() => {
    if (show) {
      setSelectedBooks([]);
      setShowCheckout(false);
      setUserId("");
      setUserDetails(null);
      setSearch("");
      refetchBooks();
    }
    // eslint-disable-next-line
  }, [show]);

  const handleBookSelect = (book) => {
    setSelectedBooks((prev) =>
      prev.some((b) => b.bookid === book.bookid)
        ? prev.filter((b) => b.bookid !== book.bookid)
        : [...prev, book]
    );
  };

  const handleCheckout = () => {
    if (selectedBooks.length === 0) {
      toast.error("Please select at least one book.");
      return;
    }
    setShowCheckout(true);
  };

  const handleFetchUser = (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Please enter a User ID.");
      return;
    }
    fetchUserDetails(userId);
  };

  const handleAssignBooks = () => {
    if (!userDetails) {
      toast.error("Fetch user details first.");
      return;
    }
    assignBooksToUser({
      userId,
      books: selectedBooks.map((b) => b.bookid),
    });
  };

  // Table columns (dynamically from first book)
  const columns = useMemo(() => {
    if (!books[0]) return [];
    const keys = Object.keys(books[0]).filter((key) => key !== "bookid");
    return [
      {
        id: "select",
        header: "Select",
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedBooks.some(
              (b) => b.bookid === row.original.bookid
            )}
            onChange={() => handleBookSelect(row.original)}
          />
        ),
      },
      columnHelper.accessor("bookid", {
        header: "Book ID",
        cell: (info) => info.getValue(),
      }),
      ...keys.map((key) =>
        columnHelper.accessor(key, {
          header: key.charAt(0).toUpperCase() + key.slice(1),
          cell: (info) => info.getValue(),
        })
      ),
    ];
  }, [books, selectedBooks]);

  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    refetchBooks();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="assign-custom-modal"
      centered
      backdrop="static"
    >
      <Modal.Header className="abm-modal-header">
        <div className="abm-title-center">
          <Modal.Title>Assign Books</Modal.Title>
        </div>
        <button type="button" className="close-btn" onClick={handleClose}>
          &times;
        </button>
      </Modal.Header>
      <Modal.Body>
        <div className="abm-modal-content">
          {!showCheckout ? (
            <>
              <h5>Select and search books to assign:</h5>
              <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <label htmlFor="searchBook" style={{ minWidth: "80px" }}>
                    Search:
                  </label>
                  <input
                    id="searchBook"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Book name, author, etc."
                    className="search-input"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ minWidth: "100px" }}
                  >
                    Search
                  </Button>
                </div>
              </form>
              {loadingBooks ? (
                <div className="abm-center">
                  <Spinner animation="border" />
                </div>
              ) : errorBooks ? (
                <div className="abm-center">Failed to load books.</div>
              ) : (
                <div className="abm-table-wrapper">
                  <table className="abm-table">
                    <thead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th key={header.id} style={{ minWidth: 120 }}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row, idx) => (
                        <tr
                          key={row.id}
                          className={idx % 2 === 0 ? "abm-row-even" : "abm-row-odd"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} style={{ minWidth: 120 }}>
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
                </div>
              )}
              <div className="abm-cart-summary">
                <span>
                  <strong>Selected Books:</strong> {selectedBooks.length}
                </span>
                <Button
                  variant="success"
                  className="abm-cart-btn"
                  onClick={handleCheckout}
                  disabled={selectedBooks.length === 0}
                >
                  Go to Checkout
                </Button>
              </div>
            </>
          ) : (
            <>
              <h5>Checkout</h5>
              <Form onSubmit={handleFetchUser}>
                <Form.Group>
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter User ID"
                    disabled={loadingUser || assigning}
                  />
                  <Button
                    variant="info"
                    className="abm-fetch-user-btn"
                    type="submit"
                    disabled={!userId || loadingUser}
                    style={{ marginTop: "10px" }}
                  >
                    {loadingUser ? "Fetching..." : "Fetch User"}
                  </Button>
                </Form.Group>
              </Form>
              {userDetails && (
                <div className="abm-user-details">
                  <h6>User Details</h6>
                  <p>
                    <strong>Name:</strong> {userDetails.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userDetails.email}
                  </p>
                  {/* Add more user fields as needed */}
                </div>
              )}
              <div className="abm-cart-books">
                <h6>Books to Assign:</h6>
                <ul>
                  {selectedBooks.map((b) => (
                    <li key={b.bookid}>
                      {b.title} (ID: {b.bookid})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="abm-checkout-actions">
                <Button
                  variant="secondary"
                  onClick={() => setShowCheckout(false)}
                  disabled={assigning}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAssignBooks}
                  disabled={!userDetails || assigning}
                  style={{ marginLeft: "10px" }}
                >
                  {assigning ? "Assigning..." : "Assign Books"}
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AssignBooksModal;