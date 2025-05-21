import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MenuDashboard from "./MenuDashboard";

function RestaurantDashboard() {
  const user = useUser();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);

  // Fetch restaurant by token
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/restaurant/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        });
        setRestaurant(res.data);
      } catch (err) {
        console.error("Failed to fetch restaurant info", err);
      }
    };

    if (user) fetchRestaurant();
  }, [user]);

  if (!user || !restaurant) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Hello, {restaurant.restaurantName || user.email}</h2>

      {restaurant.profileComplete ? (
        
        <MenuDashboard restaurantId={restaurant.id} />
      ) : (
        <>
          <p className="text-warning">Please complete your profile first.</p>
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/restaurant-complete-profile", {
                state: { userId: user.userId },
              })
            }
          >
            Complete Profile
          </button>
        </>
      )}
    </div>
  );
}

export default RestaurantDashboard;
