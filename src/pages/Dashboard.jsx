import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SimpleBarChart from "../data/bar-chart";
import SimplePieChart from "../data/pie-chart";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift().trim();
    }
  };

  useEffect(() => {
    const token = getCookie("jwt");

    if (!token) {
      console.log("No token found, redirecting to login page");
      navigate("/Login");
      return;
    }

    fetch("http://localhost:3001/Authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status !== "ok") {
          throw new Error("Authentication failed");
        }
        // Authentication successful
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Authentication failed");
        navigate("/Login");
      });
  }, [navigate]);

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
                    1
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
