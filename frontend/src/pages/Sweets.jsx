import React, { useEffect, useState } from "react";
import axios from "axios";

function Sweets() {
  // All sweets list
  const [sweets, setSweets] = useState([]);

  // Form state
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  // Search text
  const [search, setSearch] = useState("");

  // Load sweets from backend
  const loadSweets = () => {
    axios
      .get("http://localhost:3000/sweets")
      .then((res) => setSweets(res.data));
  };

  // On page load
  useEffect(() => {
    loadSweets();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add sweet
  const addSweet = () => {
    axios
      .post("http://localhost:3000/sweets", {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      })
      .then(() => {
        setForm({ name: "", category: "", price: "", quantity: "" });
        loadSweets();
      });
  };

  // Delete sweet
  const deleteSweet = (id) => {
    axios
      .delete(`http://localhost:3000/sweets/${id}`)
      .then(() => loadSweets());
  };

  // Purchase sweet
  const purchaseSweet = (id) => {
    axios
      .post(`http://localhost:3000/sweets/${id}/purchase`)
      .then(() => loadSweets());
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🍬 Sweet Shop</h2>

      {/* Add Sweet Form */}
      <h3>Add Sweet</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
      <br /><br />
      <button onClick={addSweet}>Add Sweet</button>

      <hr />

      {/* Search */}
      <input
        placeholder="Search sweet..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <hr />

      {/* Sweet List */}
      {sweets.length === 0 && <p>No sweets available</p>}

      {sweets
        .filter((s) =>
          s.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((s) => (
          <div key={s.id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
            <p><b>{s.name}</b> ({s.category})</p>
            <p>₹{s.price} | Qty: {s.quantity}</p>

            <button
              disabled={s.quantity === 0}
              onClick={() => purchaseSweet(s.id)}
            >
              Purchase
            </button>

            <button onClick={() => deleteSweet(s.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
}

export default Sweets;
