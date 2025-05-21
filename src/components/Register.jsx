import { useState } from "react";
import "../css/Login.css"; // reuse the same CSS for glassmorphism

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    passwordHash: "",
    restaurantName: "",
    city: "",
    licenseId: "",
    contactNumber: ""
  });

  const handleCustomerRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "CUSTOMER" }),
      });
      if (res.ok) {
        alert("Customer registered successfully! Now login.");
        setTimeout(() => navigate("/"), 100);
      } else {
        alert("Customer registration failed.");
      }
    } catch {
      alert("Something went wrong.");
    }
  };

 const handleRestaurantRegister = async (e) => {
  e.preventDefault();

  // Basic validation to avoid empty submissions
  const requiredFields = [
    "email", "passwordHash", "restaurantName",
    "city", "licenseId", "contactNumber"
  ];

  for (let field of requiredFields) {
    if (!form[field]) {
      alert("Please fill all the fields.");
      return;
    }
  }

  try {
    const res = await fetch("http://localhost:8081/api/auth/restaurant-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        passwordHash: form.passwordHash, // ✅ correct field name
        restaurantName: form.restaurantName,
        city: form.city,
        licenseId: form.licenseId,
        contactNumber: form.contactNumber
      }),
    });

    if (res.ok) {
      alert("Restaurant registered! Awaiting admin approval.");
    } else {
      const msg = await res.text();
      alert("Restaurant registration failed: " + msg);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong while registering.");
  }
};

  return (
    <div className="glass-login-page">
      <div className="glass-card">
        <h2>{isRestaurant ? "Restaurant Registration" : "Customer Registration"}</h2>

        {isRestaurant ? (
          step === 1 ? (
            <>
              <input
                type="email"
                placeholder="Work Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={form.passwordHash}
                onChange={(e) => setForm({ ...form, passwordHash: e.target.value })}
                required
              />
              <button onClick={() => setStep(2)}>Next</button>
            </>
          ) : (
            <form onSubmit={handleRestaurantRegister}>
              <input
                placeholder="Restaurant Name"
                value={form.restaurantName}
                onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
                required
              />
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
              <input
                placeholder="License ID"
                value={form.licenseId}
                onChange={(e) => setForm({ ...form, licenseId: e.target.value })}
                required
              />
              <input
                placeholder="Contact Number"
                value={form.contactNumber}
                onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                required
              />
              <button type="submit">Submit</button>
            </form>
          )
        ) : (
          <form onSubmit={handleCustomerRegister}>
            <input
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.passwordHash}
              onChange={(e) => setForm({ ...form, passwordHash: e.target.value })}
              required
            />
            <button type="submit">Register</button>
          </form>
        )}

        <p className="register-link">
          {isRestaurant ? (
            <>
              Want to register as a regular user?{" "}
              <span onClick={() => { setIsRestaurant(false); setStep(1); }}>Click here</span>
            </>
          ) : (
            <>
              Are you a restaurant owner?{" "}
              <span onClick={() => { setIsRestaurant(true); setStep(1); }}>Click here</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Register;
