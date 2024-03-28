import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Navbar = () => {
  const [CurBtn, setCurBtn] = useState("");
  const dashboardRef = useRef();
  const orderRef = useRef();
  const productsRef = useRef();
  const stockRef = useRef();
  const warehouseRef = useRef();
  const employeeRef = useRef();
  useEffect(() => {
    dashboardRef.current.click();
  }, []);
  return (
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav" style={{ width: "225px", zIndex: "1038" }}>
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Menu</div>
              <Link to={"/dashboard"}>
                <div
                  className={
                    "nav-link collapsed" +
                    (CurBtn === "dashboard" ? " active" : "")
                  }
                  onClick={() => setCurBtn("dashboard")}
                  ref={dashboardRef}
                  style={{
                    backgroundColor: CurBtn === "dashboard" ? "grey" : "",
                  }}
                >
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-clipboard2-data-fill icon"></i>
                  </div>
                  Dashboard
                </div>
              </Link>
              <Link to={"/order"}>
                <div
                  className={
                    "nav-link collapsed" + (CurBtn === "order" ? " active" : "")
                  }
                  onClick={() => setCurBtn("order")}
                  ref={orderRef}
                  style={{
                    backgroundColor: CurBtn === "order" ? "grey" : "",
                  }}
                >
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-list-ul icon"></i>
                  </div>
                  Order
                </div>
              </Link>

              <Link to={"/products"}>
                <div
                  className={
                    "nav-link collapsed" +
                    (CurBtn === "products" ? " active" : "")
                  }
                  onClick={() => setCurBtn("products")}
                  ref={productsRef}
                  style={{
                    backgroundColor: CurBtn === "products" ? "grey" : "",
                  }}
                >
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-box-seam-fill icon"></i>
                  </div>
                  Products<div className="sb-sidenav-collapse-arrow"></div>
                </div>
              </Link>

              <Link to={"/stock"}>
                <div
                  className={
                    "nav-link collapsed" + (CurBtn === "stock" ? " active" : "")
                  }
                  onClick={() => setCurBtn("stock")}
                  ref={stockRef}
                  style={{
                    backgroundColor: CurBtn === "stock" ? "grey" : "",
                  }}
                >
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-graph-up icon"></i>
                  </div>
                  Stock in<div className="sb-sidenav-collapse-arrow"></div>
                </div>
              </Link>

              <Link to={"/warehouse"}>
                <div
                  className={
                    "nav-link" + (CurBtn === "warehouse" ? " active" : "")
                  }
                  onClick={() => setCurBtn("warehouse")}
                  ref={warehouseRef}
                  style={{
                    backgroundColor: CurBtn === "warehouse" ? "grey" : "",
                  }}
                >
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-boxes icon"></i>
                  </div>
                  Warehouse
                </div>
              </Link>

              <Link to={"/employee"}>
                <div
                  className={
                    "nav-link" + (CurBtn === "employee" ? " active" : "")
                  }
                  onClick={() => setCurBtn("employee")}
                  ref={employeeRef}
                  style={{
                    backgroundColor: CurBtn === "employee" ? "grey" : "",
                  }}
                >
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-person-fill icon"></i>
                  </div>
                  UserAccount
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};
