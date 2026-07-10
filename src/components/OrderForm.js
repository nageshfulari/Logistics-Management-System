import { useState } from "react";
import { toast } from "react-toastify";


function OrderForm({ fetchOrders,addActivity }) {
  const [formData, setFormData] = useState({
  name: "",
  pickup: "",
  delivery: "",
  priority: "Normal",
  status: "Pending",
  estimatedDelivery: "",
});

  const [errors, setErrors] = useState({});
  const handleSubmit = async () => {
    const newErrors = {};

if (!formData.name.trim()) {
  newErrors.name = "Customer Name is required";
}

if (!formData.pickup.trim()) {
  newErrors.pickup = "Pickup Location is required";
}

if (!formData.delivery.trim()) {
  newErrors.delivery = "Delivery Location is required";
}

if (!formData.estimatedDelivery) {
  newErrors.estimatedDelivery = "Select Estimated Delivery Date";
}

setErrors(newErrors);

if (Object.keys(newErrors).length > 0) {
  return;
}
    
    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

     await res.json();
      

      fetchOrders();
      toast.success("✅ Shipment Created Successfully");
      addActivity(
  `Shipment created - ${formData.name}`,
  "#3B82F6",
  "package"
);

     setFormData({
  name: "",
  pickup: "",
  delivery: "",
  priority: "Normal",
  status: "Pending",
  estimatedDelivery: "",
});
    } catch (err) {
       toast.error("Failed to create shipment");

    }
  };

  return (
    <div
      style={{
        width:"100%",
    maxWidth:"500px",
        margin: "20px auto",
        padding: "25px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
     <h2
  style={{
    marginBottom: "20px",
    textAlign: "center",
    color: "#1E293B",
  }}
>
  📦 Create Shipment
</h2>
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontWeight: "bold",
        }}
      >
        Customer Name
      </label>

      <input
        type="text"
        placeholder="Customer Name"
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
          marginBottom: "18px",
         border: errors.name
  ? "2px solid red"
  : "1px solid #ccc",
          borderRadius: "6px",
          boxSizing: "border-box",
        }}
      />
{errors.name && (
  <p
    style={{
      color: "red",
      fontSize: "13px",
      marginTop: "-12px",
      marginBottom: "15px",
    }}
  >
    {errors.name}
  </p>
)}
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontWeight: "bold",
          
        }}
      >
        Pickup Location
      </label>

      <input
        type="text"
        placeholder="Pickup Location"
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
          marginBottom: "18px",
          border: errors.pickup
  ? "2px solid red"
  : "1px solid #ccc",
          borderRadius: "6px",
          boxSizing: "border-box",
        }}
      />
{errors.pickup && (
  <p
    style={{
      color: "red",
      fontSize: "13px",
      marginTop: "-12px",
      marginBottom: "15px",
    }}
  >
    {errors.pickup}
  </p>
)}
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontWeight: "bold",
        }}
      >
        Delivery Location
      </label>

      <input
        type="text"
        placeholder="Delivery Location"
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
          marginBottom: "18px",
          border: errors.delivery
  ? "2px solid red"
  : "1px solid #ccc",
          borderRadius: "6px",
          boxSizing: "border-box",
        }}
      />
{errors.delivery && (
  <p
    style={{
      color: "red",
      fontSize: "13px",
      marginTop: "-12px",
      marginBottom: "15px",
    }}
  >
    {errors.delivery}
  </p>
)}

<label
  style={{
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
  }}
>
  Priority
</label>

<select
  value={formData.priority}
  onChange={(e) =>
    setFormData({
      ...formData,
      priority: e.target.value,
    })
  }
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "18px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
  }}
>
  <option value="Normal">Normal</option>
  <option value="High">High</option>
  <option value="Urgent">Urgent</option>
</select>

      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontWeight: "bold",
        }}
      >
        Status
      </label>

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
          marginBottom: "18px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          boxSizing: "border-box",
        }}
      >
        <option value="Pending">Pending</option>
        <option value="In Transit">In Transit</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <label
  style={{
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
  }}
>
  Estimated Delivery
</label>

<input
  type="date"
  value={formData.estimatedDelivery}
  onChange={(e) =>
    setFormData({
      ...formData,
      estimatedDelivery: e.target.value,
    })
  }
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "18px",
   border: errors.estimatedDelivery
  ? "2px solid red"
  : "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box",
  }}
/>
{errors.estimatedDelivery && (
  <p
    style={{
      color: "red",
      fontSize: "13px",
      marginTop: "-12px",
      marginBottom: "15px",
    }}
  >
    {errors.estimatedDelivery}
  </p>
)}
      <button
  onClick={handleSubmit}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#0056D2";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow =
      "0 8px 20px rgba(37,99,235,.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#007BFF";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  }}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all .3s ease",
  }}
>
  Create Shipment
</button>
    </div>
  );
}

export default OrderForm;