// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import RestaurantDashboard from "./components/RestaurantDashboard";
import CompleteProfile from "./components/CompleteProfile";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/customer-dashboard" element={<CustomerDashboard />} />
<Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
<Route path="/restaurant-complete-profile" element={<CompleteProfile />} />
    </Routes>
  );
}

export default App;
