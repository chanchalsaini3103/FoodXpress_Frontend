import { useEffect, useState } from "react";
import { getUsersWithRestaurants } from "../services/adminService";
import axios from "axios";

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersWithRestaurants()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      });
  }, []);

 const handleApprove = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `http://localhost:8081/api/auth/admin/approve/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Restaurant approved!");
    window.location.reload();
  } catch (err) {
    console.error("Approval error:", err);  // ✅ log it
    alert("Failed to approve.");
  }
};



  const customers = users.filter((u) => u.role === "CUSTOMER");
  const restaurants = users.filter((u) => u.role === "RESTAURANT");

  return (
    <div className="container mt-4">
      <h2>Customer List</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password Hash</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((c) => (
              <tr key={c.userId}>
                <td>{c.fullName}</td>
                <td>{c.email}</td>
                <td>{c.passwordHash}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No customers found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="mt-5">Restaurant List</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Restaurant Name</th>
            <th>Owner Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>License ID</th>
            <th>Status</th>
            <th>Button</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length > 0 ? (
            restaurants.map((r) => (
              <tr key={r.userId}>
                <td>{r.restaurant?.restaurantName || "—"}</td>
                <td>{r.fullName}</td>
                <td>{r.restaurant?.email || r.email}</td>
                <td>{r.restaurant?.contactNumber || "—"}</td>
                <td>{r.restaurant?.licenseId || "—"}</td>
                <td>{r.restaurant?.status || "—"}</td>
                <td>
  {r.restaurant?.status === "INACTIVE" ? (
    <button
      className="btn btn-success btn-sm"
      onClick={() => handleApprove(r.userId)}
    >
      Approve
    </button>
  ) : (
    r.restaurant?.status || "—"
  )}
</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No restaurants found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
