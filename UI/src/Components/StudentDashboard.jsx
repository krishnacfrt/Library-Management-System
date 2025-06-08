import React from "react";
import LMTable from "../Util/LMTable";

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
        <LMTable />
      </div>
    </>
  );
}

export default StudentDashbaord;
