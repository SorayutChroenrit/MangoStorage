import { Link } from "react-router-dom";

import O_TableData from "../data/O_tableData";
export const Order = () => {
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Order</h1>
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
            <li className="breadcrumb-item active">Order</li>
          </ol>
          <div className="card mb-4">
            <br />
            <O_TableData />
          </div>
        </div>
      </main>
    </div>
  );
};
