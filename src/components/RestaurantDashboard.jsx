import { useUser } from "../context/UserContext"; // ✅ also works

import { useNavigate } from "react-router-dom";

function RestaurantDashboard() {
  const user = useUser();
  const navigate = useNavigate();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Hello, {user.email}</h2>
      <p className="text-warning">Please complete your profile first.</p>
      <button
        className="btn btn-primary"
        onClick={() =>
          navigate("/restaurant-complete-profile", {
            state: { userId: user.userId }
          })
        }
      >
        Complete Profile
      </button>
    </div>
  );
}

export default RestaurantDashboard;
