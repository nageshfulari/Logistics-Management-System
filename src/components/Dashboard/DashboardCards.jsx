function DashboardCards({
  icon,
  title,
  value,
  change,
}) {
  return (
    <div
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 10px rgba(0,0,0,.08)";
      }}
      style={{
        flex: "1 1 180px",
        minWidth: "180px",
        maxWidth: "240px",
        background: "#fff",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 4px 10px rgba(0,0,0,.08)",
        transition: ".3s",
        cursor: "pointer",
        border: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          background: "#EFF6FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "26px",
          color: "#2563EB",
          marginBottom: "20px",
        }}
      >
        {icon}
      </div>

      <p
        style={{
          color: "#64748B",
          fontSize: "15px",
          margin: 0,
        }}
      >
        {title}
      </p>

      <h1
        style={{
          margin: "10px 0",
          color: "#1E293B",
          fontSize: "34px",
        }}
      >
        {value}
      </h1>

      <p
        style={{
          color: "#22C55E",
          fontWeight: "600",
          margin: 0,
        }}
      >
        {change}
      </p>
    </div>
  );
}

export default DashboardCards;