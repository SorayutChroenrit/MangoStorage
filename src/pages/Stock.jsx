import { Link } from "react-router-dom"
export const Stock = () => {
    return (
        <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Stock in</h1>
          <ol
            className="breadcrumb mb-4"
            style={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <li className="breadcrumb-item">
            <Link to={"/dashboard"}>
              Dashboard
              </Link>
            </li>
            <li className="breadcrumb-item active">Stock in</li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1"></i>
              Stock
            </div>
          </div>
        </div>
      </main>
    </div>
    )
}