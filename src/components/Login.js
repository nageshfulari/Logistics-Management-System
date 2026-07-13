import { useState } from "react";
import { toast } from "react-toastify";

function Login({ setIsLoggedIn })  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      localStorage.setItem("role", data.role);

      toast.success("✅ Login Successful");

      setIsLoggedIn(true);
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    toast.error("Server Error. Please try again.");
  }
};
  return (
    <div
      style={{
        width: "350px",
        margin: "60px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Logistics Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      <button
  onClick={handleLogin}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#1D4ED8";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow =
      "0 10px 25px rgba(37,99,235,.35)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#2563EB";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  }}
  style={{
    width: "100%",
    padding: "13px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all .3s ease",
  }}
>
  Login
</button>
      <div
  style={{
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    backgroundColor: "#F8FAFC",
    textAlign: "center",
  }}
>
  <h4
    style={{
      margin: "0 0 10px",
      color: "#2563EB",
    }}
  >
    🚀 Demo Account
  </h4>

  <p
    style={{
      margin: "5px 0",
      color: "#555",
      fontSize: "14px",
    }}
  >
    Explore the application with view-only access.
  </p>

  <p
    style={{
      margin: "10px 0",
      fontSize: "14px",
    }}
  >
    <strong>Email:</strong> demo@logitrack.com
    <br />
    <strong>Password:</strong> demo123
  </p>

  <button
    onClick={() => {
      setEmail("demo@logitrack.com");
      setPassword("demo123");
    }}
    onMouseEnter={(e) => {
    e.currentTarget.style.background = "#F8FAFC";
    e.currentTarget.style.transform = "translateY(-2px)";
    e.currentTarget.style.boxShadow =
      "0 8px 20px rgba(0,0,0,.10)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#fff";
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  }}
  style={{
    width: "100%",
    marginTop: "12px",
    padding: "12px",
    background: "#fff",
    color: "#2563EB",
    border: "2px solid #2563EB",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all .3s ease",
  }}
>
  👀 Use Demo Account
</button>
</div>
    </div>
  );
}

export default Login;