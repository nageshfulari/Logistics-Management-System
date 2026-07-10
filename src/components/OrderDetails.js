function OrderDetails({ order, setSelectedOrder }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>Order Details</h2>

      <p>
        <strong>Customer Name:</strong> {order.name}
      </p>

      <p>
        <strong>Pickup:</strong> {order.pickup}
      </p>

      <p>
        <strong>Delivery:</strong> {order.delivery}
      </p>

      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <p>
        <strong>Order ID:</strong> {order._id}
      </p>

      {order.createdAt && (
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>
      )}

      <button
        onClick={() => setSelectedOrder(null)}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#DC3545",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "0.3s ease",
        }}
      >
        Close
      </button>
    </div>
  );
}

export default OrderDetails;