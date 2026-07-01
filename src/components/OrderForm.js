import { useState } from "react";

function OrderForm({ fetchOrders }) {
  const [formData, setFormData] = useState({
    name: "",
    pickup: "",
    delivery: "",
    status: "Pending"
  });

  const handleSubmit = async () => {
    console.log("Sending to backend:", formData);

    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    console.log("Response from backend:", data);

    // 🔄 refresh from DB
    fetchOrders();

    // 🔁 reset form
    setFormData({
      name: "",
      pickup: "",
      delivery: ""
    });
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px" }}>
      <h2>Add Order</h2>

      <input
        placeholder="Customer Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />
      <br />

      <input
        placeholder="Pickup Location"
        value={formData.pickup}
        onChange={(e) =>
          setFormData({ ...formData, pickup: e.target.value })
        }
      />
      <br />

      <input
        placeholder="Delivery Location"
        value={formData.delivery}
        onChange={(e) =>
          setFormData({ ...formData, delivery: e.target.value })
        }
      />
      <br />

      <button onClick={handleSubmit}>Add Order</button>
    </div>
  );
}

export default OrderForm;