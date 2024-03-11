import { Link } from "react-router-dom";
import ApexChart from "../data/heatmap";
export const Warehouse = () => {
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Warehouse</h1>
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
            <li className="breadcrumb-item active">Warehouse</li>
          </ol>
        </div>
        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-body">
              <ApexChart />
            </div>
            <div></div>
          </div>
        </div>
      </main>
    </div>
  );
};
