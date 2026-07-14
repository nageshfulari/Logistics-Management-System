import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import DashboardCards from "./components/Dashboard/DashboardCards";
import OrderTable from "./components/Orders/OrderTable";
import OrderForm from "./components/OrderForm";
import OrderDetails from "./components/OrderDetails";
import UpdateOrderModal from "./components/UpdateOrderModal";
import Login from "./components/Login";
import Analytics from "./components/Analytics/Analytics";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Activity from "./components/Activity/Activity";
import { TailSpin } from "react-loader-spinner";
import {
  FiPackage,
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

function App() {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [activities, setActivities] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 const role = localStorage.getItem("role");
const isDemo = role === "demo";

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
const res = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();

      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  const totalOrders = orders.length;

  const pendingOrders = orders.filter((o) => o.status === "Pending").length;

  const transitOrders = orders.filter((o) => o.status === "In Transit").length;

  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;

  const pendingPercent = totalOrders
    ? Math.round((pendingOrders / totalOrders) * 100)
    : 0;

  const transitPercent = totalOrders
    ? Math.round((transitOrders / totalOrders) * 100)
    : 0;

  const deliveredPercent = totalOrders
    ? Math.round((deliveredOrders / totalOrders) * 100)
    : 0;

  const addActivity = (text, color, icon) => {
    const newActivity = {
      text,
      color,
      icon,
      time: "Just now",
    };

    setActivities((prev) => [newActivity, ...prev].slice(0, 5));
  };

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        style={{
          marginLeft: window.innerWidth > 768 ? "240px" : "0",

          transition: ".3s",
          padding: "30px",
          background: "linear-gradient(to bottom,#F8FAFC,#EEF2FF)",
          minHeight: "100vh",
        }}
      >
        {/* Navbar */}
        
          <Navbar handleLogout={handleLogout} setSidebarOpen={setSidebarOpen} />

          {isDemo && (
  <div
    style={{
      background: "#FEF3C7",
      color: "#92400E",
      padding: "12px",
      borderRadius: "8px",
      marginTop: "20px",
      textAlign: "center",
      fontWeight: "600",
    }}
  >
    🚀 Demo Mode — You have view-only access.
    Creating, editing and deleting shipments is disabled.
  </div>
)}
        

        {/* Welcome Card */}
        <div id="dashboard"
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            marginTop: "25px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <div>
  <h2
    style={{
      margin: 0,
    }}
  >
    Welcome Back 👋
  </h2>

  <p
    style={{
      color: "#666",
      marginTop: "10px",
      marginBottom: 0,
    }}
  >
    Manage your logistics operations efficiently.
  </p>
</div>
          

          <div
            style={{
              display: "flex",
              gap: "50px",
              marginTop: "20px",
            }}
          >
            <div>
              <h4>Today's Orders</h4>
              <h2>{orders.length}</h2>
            </div>

            <div>
              <h4>Pending Shipments</h4>
              <h2>{pendingOrders}</h2>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div
          id="orders"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "40px",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
        >
          <DashboardCards
            icon={<FiPackage />}
            title="Total Orders"
            value={totalOrders}
            change={`${totalOrders} Shipments`}
          />

          <DashboardCards
            icon={<FiClock />}
            title="Pending Orders"
            value={pendingOrders}
            change={`${pendingPercent}% Pending`}
          />

          <DashboardCards
            icon={<FiTruck />}
            title="In Transit"
            value={transitOrders}
            change={`${transitPercent}% In Transit`}
          />

          <DashboardCards
            icon={<FiCheckCircle />}
            title="Delivered Orders"
           value={deliveredOrders}
            change={`${deliveredPercent}% Completed`}
          />
          <DashboardCards
            icon={<FiXCircle />}
            title="Cancelled Orders"
            value={cancelledOrders}
            change={`${cancelledOrders} Cancelled`}
          />
        </div>
        <div id="analytics">
          <Analytics orders={orders} />
        </div>

        <Activity activities={activities} />
        {/* Add Order */}
        <div id="customers">
          <div style={{ marginTop: "40px" }}>
            {!isDemo && (
    <OrderForm
        fetchOrders={fetchOrders}
        addActivity={addActivity}
        isDemo={isDemo}
    />
)}
          </div>
        </div>

        {/* Loading */}

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <TailSpin
              height="60"
              width="60"
              color="#2563EB"
              ariaLabel="loading"
            />
          </div>
        )}

        {/* Error */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Orders Table */}
        <div id="shipments">
          {!loading && !error && (
            <div style={{ marginTop: "40px" }}>
              <OrderTable
                orders={orders}
                fetchOrders={fetchOrders}
                setSelectedOrder={setSelectedOrder}
                setEditingOrder={setEditingOrder}
                addActivity={addActivity}
              />
            </div>
          )}
        </div>

        {/* Order Details */}
        {selectedOrder && (
          <div style={{ marginTop: "40px" }}>
            <OrderDetails
              order={selectedOrder}
              setSelectedOrder={setSelectedOrder}
            />
          </div>
        )}

        {/* Update Modal */}
        {editingOrder && (
          <UpdateOrderModal
            editingOrder={editingOrder}
            setEditingOrder={setEditingOrder}
            fetchOrders={fetchOrders}
            addActivity={addActivity}
            isDemo={isDemo}
          />
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: "#64748B",
          fontSize: "14px",
          padding: "20px 0",
          borderTop: "1px solid #E5E7EB",
        }}
      >
       LogiTrack v1.0
Developed by Nagesh Fulari
2026
      </div>
    </>
  );
}

export default App;
