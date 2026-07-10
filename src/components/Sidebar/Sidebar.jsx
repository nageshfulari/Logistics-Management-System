import { useState } from "react";
import "./Sidebar.css";
import {
  MdDashboard,
  MdInventory,
  MdLocalShipping,
  MdPeople,
  MdAnalytics,
} from "react-icons/md";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const scrollToSection = (id) => {
    setActiveMenu(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div
      className="sidebar"
      style={{
        width: "240px",
        height: "100vh",
        background: "#1E293B",
        color: "white",
        padding: "20px",
        position: "fixed",
        left:
          window.innerWidth > 768
            ? 0
            : sidebarOpen
            ? 0
            : "-260px",
        top: 0,
        boxSizing: "border-box",
        transition: ".3s",
        zIndex: 1000,
      }}
    >
      <h2
        className="logo"
        style={{
          marginBottom: "40px",
        }}
      >
        🚚 LogiTrack
        <p>Management System</p>
      </h2>

      <div
        className={`menu-item ${
          activeMenu === "dashboard" ? "active" : ""
        }`}
        onClick={() => scrollToSection("dashboard")}
      >
        <MdDashboard />
        Dashboard
      </div>

      <div
        className={`menu-item ${
          activeMenu === "orders" ? "active" : ""
        }`}
        onClick={() => scrollToSection("orders")}
      >
        <MdInventory />
        Orders
      </div>

      <div
        className={`menu-item ${
          activeMenu === "analytics" ? "active" : ""
        }`}
        onClick={() => scrollToSection("analytics")}
      >
        <MdAnalytics />
        Analytics
      </div>

      <div
        className={`menu-item ${
          activeMenu === "customers" ? "active" : ""
        }`}
        onClick={() => scrollToSection("customers")}
      >
        <MdPeople />
        Customers
      </div>

      <div
        className={`menu-item ${
          activeMenu === "shipments" ? "active" : ""
        }`}
        onClick={() => scrollToSection("shipments")}
      >
        <MdLocalShipping />
        Shipments
      </div>
    </div>
  );
}

export default Sidebar;