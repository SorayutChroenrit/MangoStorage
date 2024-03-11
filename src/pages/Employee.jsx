import { Link } from "react-router-dom";

import E_TableData from "../data/E_tableData";
export const Employee = () => {
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">UserAccount</h1>
          <ol
            className="breadcrumb mb-4"
            style={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <li className="breadcrumb-item">
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">UserAccount</li>
          </ol>
          <div className="card mb-4">
            <br />
            <E_TableData />
          </div>
        </div>
      </main>
    </div>
  );
};
