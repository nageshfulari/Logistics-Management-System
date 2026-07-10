import { FiMenu } from "react-icons/fi";

function Navbar({ handleLogout, setSidebarOpen }) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const username = localStorage.getItem("user");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
      }}
    >
      <button
        onClick={() => setSidebarOpen((prev) => !prev)}
        style={{
          border: "none",
          background: "transparent",
          fontSize: "28px",
          cursor: "pointer",
          display: window.innerWidth <= 768 ? "block" : "none",
        }}
      >
        <FiMenu />
      </button>

      <div>
        <h2
          style={{
            margin: 0,
            color: "#1E293B",
          }}
        >
          Dashboard
        </h2>

        <p
          style={{
            marginTop: "5px",
            color: "#64748B",
            fontSize: "14px",
          }}
        >
          {today}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            textAlign: "right",
          }}
        >
          <strong>{username}</strong>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#64748B",
            }}
          >
            Administrator
          </p>
        </div>

        <button
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#DC2626";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(220,38,38,.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#EF4444";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          style={{
            background: "#EF4444",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "all .3s ease",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;