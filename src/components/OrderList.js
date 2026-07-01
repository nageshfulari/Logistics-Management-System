function OrderList({ orders = [], fetchOrders }) {

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE"
      });

      fetchOrders(); // refresh list

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.pickup}</td>
                <td>{order.delivery}</td>
                <td>{order.status || "Pending"}</td>
                <td>
                  <button onClick={() => handleDelete(order._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderList;