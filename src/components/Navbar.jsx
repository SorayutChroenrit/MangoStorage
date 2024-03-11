import { useRef } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
export const Navbar = () => {
  const dashboardRef = useRef();
  const orderRef = useRef();
  const productsRef = useRef();
  const stockRef = useRef();
  const warehouseRef = useRef();
  const employeeRef = useRef();
  return (
    <div id="layoutSidenav">
      <div
        id="layoutSidenav_nav"
        style={{ width: "225px", height: "100vh", zIndex: "1038" }}
      >
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Menu</div>

              <Link to={"/dashboard"}>
                <div className="nav-link collapsed" ref={dashboardRef}>
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-clipboard2-data-fill"></i>
                  </div>
                  Dashboard
                </div>
              </Link>
              <Link to={"/order"}>
                <div className="nav-link collapsed" ref={orderRef}>
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-list-ul"></i>
                  </div>
                  Order
                </div>
              </Link>
              <Link to={"/products"}>
                <div className="nav-link collapsed" ref={productsRef}>
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-box-seam-fill"></i>
                  </div>
                  Products<div className="sb-sidenav-collapse-arrow"></div>
                </div>
              </Link>
              <Link to={"/stock"}>
                <div className="nav-link collapsed" ref={stockRef}>
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-boxes"></i>
                  </div>
                  Stock in<div className="sb-sidenav-collapse-arrow"></div>
                </div>
              </Link>
              <Link to={"/warehouse"}>
                <div className="nav-link" ref={warehouseRef}>
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  Warehouse
                </div>
              </Link>
              <Link to={"/employee"}>
                <div className="nav-link" ref={employeeRef}>
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-person-fill"></i>
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
