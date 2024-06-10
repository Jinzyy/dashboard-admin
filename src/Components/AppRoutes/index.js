import { Routes, Route } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Customers from "../../Pages/Customers";
import Supplier from "../../Pages/Supplier";
import AddProduct from "../../Pages/AddProduct";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/supplier" element={<Supplier />}></Route>
      <Route path="/tambah" element={<AddProduct />}></Route>
    </Routes>
  );
}

export default AppRoutes;
