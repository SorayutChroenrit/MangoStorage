import { Layout } from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";

import { Warehouse } from "./pages/Warehouse";
import { Dashboard } from "./pages/Dashboard";
import { Employee } from "./pages/Employee";
import { Order } from "./pages/Order";
import { Products } from "./pages/Products";
import { Stock } from "./pages/Stock";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order" element={<Order />} />
            <Route path="/products" element={<Products />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/employee" element={<Employee />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
