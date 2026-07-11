import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UpdateOrderModal({
  editingOrder,
  setEditingOrder,
  fetchOrders,
  addActivity,
}){

    const [formData, setFormData] = useState({
  name: "",
  pickup: "",
  delivery: "",
  status: "Pending",
});

useEffect(() => {
  if (editingOrder) {
    setFormData({
      name: editingOrder.name,
      pickup: editingOrder.pickup,
      delivery: editingOrder.delivery,
      status: editingOrder.status,
    });
  }
}, [editingOrder]);


const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/orders/${editingOrder._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    await res.json();

    await fetchOrders();

    toast.success("✏ Shipment Updated");

    addActivity(
      `Shipment updated - ${formData.name}`,
      "#F59E0B",
      "edit"
    );

    setEditingOrder(null);

  } catch (err) {
    toast.error("Failed to update shipment");
  }
};
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "450px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Update Order
        </h2>

      <div>
  <label>Customer Name</label>

  <input
    type="text"
    value={formData.name}
    onChange={(e) =>
      setFormData({
        ...formData,
        name: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
    }}
  />

  <label>Pickup</label>

  <input
    type="text"
    value={formData.pickup}
    onChange={(e) =>
      setFormData({
        ...formData,
        pickup: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
    }}
  />

  <label>Delivery</label>

  <input
    type="text"
    value={formData.delivery}
    onChange={(e) =>
      setFormData({
        ...formData,
        delivery: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
    }}
  />

  <label>Status</label>

  <select
    value={formData.status}
    onChange={(e) =>
      setFormData({
        ...formData,
        status: e.target.value,
      })
    }
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "20px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
    }}
  >
    <option value="Pending">Pending</option>
    <option value="In Transit">In Transit</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</div>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  }}
>
  <button
    onClick={() => setEditingOrder(null)}
    style={{
      padding: "10px 20px",
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Cancel
  </button>

  <button
  onClick={handleUpdate}
  style={{
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Update Order
</button>
</div>
      </div>
    </div>
  );
}

export default UpdateOrderModal;