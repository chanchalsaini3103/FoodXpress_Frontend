import { useEffect, useState } from "react";
import axios from "axios";

function MenuDashboard({ restaurantId }) {
    const token = localStorage.getItem("token");
  const [menuItems, setMenuItems] = useState([]);
  const [form, setForm] = useState({
  dishName: "",
  description: "",
  price: "",
  available: true,
  image: null,
});


  const fetchMenu = async () => {
    try {
      const res = await axios.get(`http://localhost:8081/api/menu/restaurant/${restaurantId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});
      setMenuItems(res.data);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("dishName", form.dishName);
  formData.append("description", form.description);
  formData.append("price", form.price);
  formData.append("available", form.available);
  formData.append("image", form.image);

  try {
    await axios.post(
      `http://localhost:8081/api/menu/add/${restaurantId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    setForm({ dishName: "", description: "", price: "", available: true, image: null });
    fetchMenu();
  } catch (err) {
    console.error("Add menu failed", err);
  }
};


  const handleDelete = async (id) => {
    try {
     await axios.delete(`http://localhost:8081/api/menu/delete/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

      fetchMenu();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div>
      <h4 className="mt-4">Your Menu</h4>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Dish Name"
              className="form-control"
              value={form.dishName}
              onChange={(e) => setForm({ ...form, dishName: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              placeholder="Price"
              className="form-control"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
            />
          </div>
          <input
  type="file"
  accept="image/*"
  className="form-control"
  onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
  required
/>

          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">
              Add Dish
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Dish</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.dishName}</td>
              <td>{item.description}</td>
              <td>₹{item.price}</td>
              <td>
  {item.imagePath ? (
    <img
  src={`http://localhost:8081/menu-images/${item.imagePath}`}
  alt="Dish"
  width="200"
/>

  ) : (
    "No image"
  )}
</td>


              <td>{item.available ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuDashboard;
