import { useState } from "react";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

function OrderTable({
  orders,
  fetchOrders,
  setSelectedOrder,
  setEditingOrder,
  addActivity,
}) {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [sortBy, setSortBy] = useState("Newest");
  const ordersPerPage = 5;
  const isDemo = localStorage.getItem("role") === "demo";
  const filters = ["All", "Pending", "In Transit", "Delivered", "Cancelled"];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          backgroundColor: "#FFF3CD",
          color: "#856404",
        };

      case "In Transit":
        return {
          backgroundColor: "#D1ECF1",
          color: "#0C5460",
        };

      case "Delivered":
        return {
          backgroundColor: "#D4EDDA",
          color: "#155724",
        };

      case "Cancelled":
        return {
          backgroundColor: "#F8D7DA",
          color: "#721C24",
        };

      default:
        return {
          backgroundColor: "#EEEEEE",
          color: "#333",
        };
    }
  };
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Normal":
        return {
          backgroundColor: "#D4EDDA",
          color: "#155724",
        };

      case "High":
        return {
          backgroundColor: "#FFF3CD",
          color: "#856404",
        };
      
      case "Urgent":
      
        return {
          backgroundColor: "#F8D7DA",
          color: "#721C24",
        };

      default:
        return {
          backgroundColor: "#EEEEEE",
          color: "#333",
        };
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
        method: "DELETE",
      });

      fetchOrders();
      toast.success("🗑 Shipment Deleted");

      addActivity(
  "Shipment deleted",
  "#EF4444",
  "delete"
);
    } catch (err) {
  toast.error("Failed to delete shipment");
}
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.delivery.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
  const sortedOrders = [...filteredOrders];

switch (sortBy) {
  case "CustomerAZ":
    sortedOrders.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    break;

  case "CustomerZA":
    sortedOrders.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    break;

  case "Priority":
    const priorityOrder = {
      Urgent: 1,
      High: 2,
      Normal: 3,
    };

    sortedOrders.sort(
      (a, b) =>
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
    );
    break;

  case "Status":
    sortedOrders.sort((a, b) =>
      a.status.localeCompare(b.status)
    );
    break;

  case "Oldest":
    sortedOrders.sort(
      (a, b) =>
        new Date(a.createdAt) -
        new Date(b.createdAt)
    );
    break;

  default:
    sortedOrders.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
}
  const lastIndex = currentPage * ordersPerPage;
  const firstIndex = lastIndex - ordersPerPage;

  const currentOrders =
  sortedOrders.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const exportCSV = () => {
  const headers = [
    "Customer",
    "Pickup",
    "Delivery",
    "Priority",
    "Status",
    "Estimated Delivery",
  ];

  const rows = filteredOrders.map((order) => [
    order.name,
    order.pickup,
    order.delivery,
    order.priority,
    order.status,
    order.estimatedDelivery
  ? new Date(order.estimatedDelivery).toLocaleDateString("en-IN")
  : "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "Orders.csv");
};
  return (
    <div>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <div>
    <h2
      style={{
        margin: 0,
        color: "#1E293B",
      }}
    >
      📦 Shipment Management
    </h2>

    <p
      style={{
        color: "#64748B",
        marginTop: "6px",
      }}
    >
      Manage and track all shipments
    </p>
  </div>
</div>

      {/* Search Box */}
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px 0",
    flexWrap: "wrap",
    gap: "15px",
  }}
>
        <input
          type="text"
          placeholder="🔍 Search Orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
style={{
    width:"320px",
    padding:"12px 18px",
    borderRadius:"10px",
    border:"1px solid #E2E8F0",
    outline:"none",
    fontSize:"15px",
}}
        />
        <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  style={{
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minWidth: "180px",
  }}
>
  <option value="Newest">Newest</option>
  <option value="Oldest">Oldest</option>
  <option value="CustomerAZ">Customer (A-Z)</option>
  <option value="CustomerZA">Customer (Z-A)</option>
  <option value="Priority">Priority</option>
  <option value="Status">Status</option>
</select>
        <button
  onClick={exportCSV}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#218838";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow =
      "0 8px 20px rgba(40,167,69,.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#28A745";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  }}
  style={{
    background: "#28A745",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all .3s ease",
  }}
>
  📥 Export CSV
</button>
      </div>

      {/* Filter Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              backgroundColor: statusFilter === filter ? "#007BFF" : "#F1F3F5",
              color: statusFilter === filter ? "white" : "black",
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* No Orders Found */}
      {filteredOrders.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#666",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          📦

No Shipments Found

Try another search or create a shipment.
        </p>
      ) : (
        <div
  style={{
    background: "#fff",
    padding: "18px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
    
  }}
>
  <div
  style={{
    overflowX: "auto",
  }}
>

        <table
          style={{
            width: "100%",
            marginTop: "10px",
            borderCollapse: "collapse",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                background:"#1E293B",
                color: "white",
              }}
            >
              <th style={{ padding: "14px" }}>Customer</th>
              <th style={{ padding: "14px" }}>Pickup</th>
              <th style={{ padding: "14px" }}>Delivery</th>
              <th style={{ padding: "14px" }}>Priority</th>
              <th style={{ padding: "14px" }}>Status</th>
              <th style={{ padding: "14px" }}>Estimated Delivery</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.map((order,index) => (
              <tr
                key={order._id}
                style={{
    textAlign:"center",
    background:
        index % 2 === 0
            ? "#fff"
            : "#F8FAFC",
}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#F5F9FF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                }}
              >
                <td style={{ padding: "14px" }}>{order.name}</td>
                <td style={{ padding: "14px" }}>{order.pickup}</td>
                <td style={{ padding: "14px" }}>{order.delivery}</td>
                <td
                  style={{
                    padding: "14px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      ...getPriorityStyle(order.priority),
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      display: "inline-block",
                      minWidth: "80px",
                      textAlign: "center",
                    }}
                  >
                    {order.priority}
                  </span>
                </td>
                <td
                  style={{
                    padding: "14px",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      ...getStatusStyle(order.status),
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      display: "inline-block",
                      minWidth: "90px",
                      textAlign: "center",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: "14px" }}>
                  {new Date(order.estimatedDelivery).toLocaleDateString(
                    "en-IN",
                  )}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{
                        backgroundColor: "#28A745",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "8px 16px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        minWidth: "80px",
                      }}
                    >
                      View
                    </button>
                      {!isDemo && (
                    <button
                      onClick={() => {
                       
                        setEditingOrder(order);
                      }}
                      style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "8px 16px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        minWidth: "80px",
                      }}
                    >
                      Update
                    </button>
                      )}
                      {!isDemo && (
                    <button
                      onClick={() => setDeleteId(order._id)}
                      style={{
                        backgroundColor: "#DC3545",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "8px 16px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        minWidth: "80px",
                      }}
                    >
                      Delete
                    </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
</div>
        
      )}
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "25px",
  }}
>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
  >
    ← Previous
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      style={{
        background:
          currentPage === index + 1 ? "#007BFF" : "#F1F3F5",
        color:
          currentPage === index + 1 ? "white" : "black",
        border: "none",
        padding: "8px 14px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
  >
    Next →
  </button>
</div>
{deleteId && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    }}
  >
    <div
      style={{
        background: "#fff",
        width: "420px",
        padding: "30px",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <h2>⚠ Delete Shipment</h2>

      <p>
        Are you sure you want to delete this shipment?
      </p>

      <p
        style={{
          color: "#777",
          fontSize: "14px",
        }}
      >
        This action cannot be undone.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <button
          onClick={() => setDeleteId(null)}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            background: "#6C757D",
            color: "white",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        <button
          onClick={() => {
            handleDelete(deleteId);
            setDeleteId(null);
          }}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "6px",
            background: "#DC3545",
            color: "white",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default OrderTable;
