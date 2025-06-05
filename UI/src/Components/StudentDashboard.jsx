import React from "react";
import StudentTable from "./StudentTable";

function StudentDashbaord() {
  const headingStyle = {
    textAlign: "center",
    marginTop: "60px",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    animation: "fadeIn 1s ease-in-out",
  };

  const containerStyle = {
    animation: "fadeIn 1s ease-in-out",
  };
  
  return (
    <>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Welcome to Student Page</h1>
      </div>
      <div>
        <StudentTable />
      </div>
    </>
  );
}

export default StudentDashbaord;
