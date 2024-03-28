import { Link } from "react-router-dom";
import P_TableData from "../data/P_tableData";
export const Products = () => {
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Product</h1>
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
            <li className="breadcrumb-item active">Product</li>
          </ol>
          <div className="card mb-4">
            <br />
            <P_TableData />
          </div>
        </div>
      </main>
    </div>
  );
};
