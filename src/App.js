import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/orders");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
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

 return (
  <div style={{ padding: "20px" }}>
    <Navbar />

    <div style={{ marginTop: "20px" }}>
      <OrderForm fetchOrders={fetchOrders} />
    </div>

    {loading && <p>Loading orders...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}

    {!loading && !error && (
      <div style={{ marginTop: "30px" }}>
        <OrderList orders={orders} fetchOrders={fetchOrders} />
      </div>
    )}
  </div>
);
}

export default App;
