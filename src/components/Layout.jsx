import { Navbar } from "./Navbar";
import { useState, useEffect } from "react";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  useEffect(() => {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    
    const handleClick = event => {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    };

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', handleClick);
    }

    return () => {
      // Cleanup function to remove event listener when the component unmounts
      if (sidebarToggle) {
        sidebarToggle.removeEventListener('click', handleClick);
      }
    };
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    
    <div>
      <div>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark ">
          {/* <!-- Navbar Brand--> */}
          <div
            className="navbar-brand ps-3"
            style={{ backgroundColor: "#212529"  }}
          >
            Mango Storage
          </div>
          {/* <!-- Sidebar Toggle--> */}
          <button
            className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
          >
            <i className="bi bi-justify"></i>
          </button>
          {/* <!-- Navbar Search--> */}

          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                placeholder="Search for..."
                aria-label="Search for..."
                aria-describedby="btnNavbarSearch"
              />

              <button
                className="btn btn-primary"
                id="btnNavbarSearch"
                type="button"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
          {/* <!-- Navbar--> */}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                onClick={toggleDropdown}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={dropdownOpen ? "true" : "false"}
              >
                <i className="bi bi-person-circle"></i>
              </div>
              <ul
                className={`dropdown-menu ${dropdownOpen ? "show" : ""} custom-dropdown-menu`}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <div className="dropdown-item" >
                    Settings
                  </div>
                </li>
                <li>
                  <div className="dropdown-item" >
                    Activity Log
                  </div>
                </li>
                <div className="dropdown-divider"></div>
                <li>
                  <div
                    className="dropdown-item"
                  >
                    Logout
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2021</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
  );
};

export const Layout = () => {
  return (
    <div>
      <Header />
      <Navbar />   
      <Footer />
    </div>
  );
};
