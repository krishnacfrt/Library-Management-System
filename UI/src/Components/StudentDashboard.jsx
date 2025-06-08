import React from "react";
import StudentTable from "./StudentTable";

function StudentDashbaord() {
  const headingStyle = {
    textAlign: "center",
    marginTop: "60px",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
    fontFamily: "Roboto",
  };
  
  return (
    <>
      <div>
        <h1 style={headingStyle}>Welcome to Student Page</h1>
      </div>
      <div>
        <StudentTable />
      </div>
    </>
  );
}

export default StudentDashbaord;
