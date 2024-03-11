import SimpleBarChart from "../data/bar-chart";
import SimplePieChart from "../data/pie-chart";
import { Link } from "react-router-dom";
export const Dashboard = () => {
  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Dashboard</h1>
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
          </ol>
          <div
            className="row"
            style={{ marginBottom: "30px", marginLeft: "0px" }}
          >
            <div
              className="card  col-xl-3 col-md-6 md-4"
              style={{ marginRight: "30px", width: "22%", borderRadius: "5px" }}
            >
              <div className="card-body d-flex flex-row align-items-center flex-0 border-bottom">
                <div className="d-block">
                  <div className="h6 fw-normal text-gray mb-2">Order Today</div>
                  <h2 className="h3">100</h2>
                </div>
              </div>
            </div>
            <div
              className="card col-xl-3 col-md-6 md-4"
              style={{ marginRight: "30px", width: "22%", borderRadius: "5px" }}
            >
              <div className="card-body d-flex flex-row align-items-center flex-0 border-bottom">
                <div className="d-block">
                  <div className="h6 fw-normal text-gray mb-2">Total Order</div>
                  <h2 className="h3">300</h2>
                </div>
              </div>
            </div>
            <div
              className="card  col-xl-3  col-md-6 md-4"
              style={{ marginRight: "30px", width: "22%", borderRadius: "5px" }}
            >
              <div className="card-body d-flex flex-row align-items-center flex-0 border-bottom">
                <div className="d-block">
                  <div
                    className="h6 fw-normal text-gray mb-2"
                    style={{ color: "green" }}
                  >
                    Completed Order
                  </div>
                  <h2 className="h3" style={{ color: "green" }}>
                    2
                  </h2>
                </div>
              </div>
            </div>
            <div
              className="card  col-xl-3  col-md-6 md-4"
              style={{ marginRight: "30px", width: "22%", borderRadius: "5px" }}
            >
              <div className="card-body d-flex flex-row align-items-center flex-0 border-bottom">
                <div className="d-block">
                  <div
                    className="h6 fw-normal text-gray mb-2"
                    style={{ color: "orange" }}
                  >
                    Waiting Order
                  </div>
                  <h3 className="h3" style={{ color: "orange" }}>
                    1
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-chart-area me-1"></i>
                  Order
                </div>
                <div className="card-body">
                  <SimpleBarChart />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-chart-bar me-1"></i>
                  Inventory
                </div>
                <div className="card-body">
                  <SimplePieChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
