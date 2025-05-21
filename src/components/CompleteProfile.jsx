import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function CompleteProfile() {
 
const location = useLocation();
// const userId = location.state?.userId;
const token = localStorage.getItem("token");
const decoded = jwtDecode(token);
const userId = decoded.userId; // ✅ will now work

console.log("Decoded token →", decoded); // 👈 ADD THIS


  const [form, setForm] = useState({
    description: "",
    address: "",
    licenseFile: null,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, licenseFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User ID not found.");
      return;
    }

    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("licenseFile", form.licenseFile);
    data.append("description", form.description);
    data.append("address", form.address);

    try {
      const res = await axios.post(
        `http://localhost:8081/api/restaurant/complete-profile/${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Profile completed successfully!");
    } catch (err) {
      console.error("Profile update failed", err);
      setMessage("Failed to complete profile.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Complete Your Profile</h2>
      {message && <p className="alert alert-info">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>License PDF:</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

export default CompleteProfile;
