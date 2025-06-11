import React from "react";
import AssignBookSearchTable from "../Util/AssignBookSearchTable";

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
        <AssignBookSearchTable />
      </div>
    </>
  );
}

export default StudentDashbaord;
