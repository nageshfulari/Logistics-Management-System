import "./Analytics.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Analytics({ orders })  {

 const orderStatus = [
    {
        name:"Pending",
        value:orders.filter(
            o=>o.status==="Pending"
        ).length
    },
    {
        name:"In Transit",
        value:orders.filter(
            o=>o.status==="In Transit"
        ).length
    },
    {
        name:"Delivered",
        value:orders.filter(
            o=>o.status==="Delivered"
        ).length
    },
    {
        name:"Cancelled",
        value:orders.filter(
            o=>o.status==="Cancelled"
        ).length
    }
];

  
  const COLORS = [
  "#FFB703",
  "#3B82F6",
  "#22C55E",
  "#EF4444",
];



const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const weeklyOrders = weekDays.map(day => ({
    day,
    orders: 0
}));

orders.forEach(order => {
    const date = new Date(order.createdAt);
    const day = weekDays[date.getDay()];

    const index = weeklyOrders.findIndex(
        item => item.day === day
    );

    if(index !== -1){
        weeklyOrders[index].orders++;
    }
});
 return (
  <div className="analytics">

    <h2>Analytics Dashboard</h2>

    <div className="chart-container">

      {/* Bar Chart */}

      <div className="chart-card">

        <h3>Orders This Week</h3>

        <ResponsiveContainer width="100%" height={300}>
  <BarChart data={weeklyOrders}>

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="orders"
              fill="#3B82F6"
            />

        </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}

      <div className="chart-card">

        <h3>Order Status</h3>

        <ResponsiveContainer width="100%" height={300}>
  <PieChart>

         

            <Pie
              data={orderStatus}
              dataKey="value"
              outerRadius={100}
              label
            >
              {orderStatus.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  </div>
);
}

export default Analytics;