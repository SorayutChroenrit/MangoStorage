import { Link } from "react-router-dom";
import S_TableData from "../data/S_table";
export const Stock = () => {
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Stock</h1>
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
            <li className="breadcrumb-item active">Stock</li>
          </ol>
          <div className="card mb-4">
            <br />
            <S_TableData />
          </div>
        </div>
      </main>
    </div>
  );
};
