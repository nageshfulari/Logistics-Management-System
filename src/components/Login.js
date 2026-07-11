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
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;