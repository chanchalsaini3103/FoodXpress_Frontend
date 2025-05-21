import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import "../css/Login.css"; // Link to external CSS
import { getRoleFromToken } from "../utils/tokenUtils";

function Login() {
  const [form, setForm] = useState({ email: "", passwordHash: "" });
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await login(form);
    const token = res.data;
     localStorage.setItem("token", token);


    const role = getRoleFromToken(token);

    if (role === "ADMIN") navigate("/admin-dashboard");
    else if (role === "CUSTOMER") navigate("/customer-dashboard");
    else if (role === "RESTAURANT") navigate("/restaurant-dashboard");
    else navigate("/");

  } catch (err) {
    alert("Login failed");
  }
};

  return (
    <div className="glass-login-page">
      <div className="glass-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={form.passwordHash}
            onChange={(e) => setForm({ ...form, passwordHash: e.target.value })}
            required
          />
          

          <button type="submit">Log In</button>
        </form>
        
        <p className="register-link">
          <a href="#" className="text-decoration-none text-muted">
    Forgot password?
  </a>
  <br></br>
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
