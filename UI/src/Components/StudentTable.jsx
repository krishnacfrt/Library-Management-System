import React from 'react';
import '../Css/StudentTable.css';

const StudentTable = () => {
  const data = [
    {
      name: 'Alice Johnson',
      id: 'S001',
      bookId: 'B1001',
      borrowDate: '2025-05-01',
      returnDate: '2025-06-01',
    },
    {
      name: 'Bob Smith',
      id: 'S002',
      bookId: 'B1002',
      borrowDate: '2025-05-10',
      returnDate: '2025-06-10',
    },
    {
      name: 'Charlie Brown',
      id: 'S003',
      bookId: 'B1003',
      borrowDate: '2025-05-20',
      returnDate: '2025-06-20',
    },
  ];

  return (
    <div className="student-table-container">
      <h2 className="title">Student Borrowing Details</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>ID</th>
            <th>Borrowed Book ID</th>
            <th>Borrow Date</th>
            <th>Expected Return Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, idx) => (
            <tr key={idx}>
              <td>{student.name}</td>
              <td>{student.id}</td>
              <td>{student.bookId}</td>
              <td>{student.borrowDate}</td>
              <td>{student.returnDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
