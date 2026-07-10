import "./Activity.css";
import {
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiXCircle,
} from "react-icons/fi";

const getIcon = (icon) => {
  switch (icon) {
    case "package":
      return <FiPackage />;
    case "edit":
      return <FiTruck />;
    case "delete":
      return <FiXCircle />;
    default:
      return <FiCheckCircle />;
  }
};

function Activity({ activities }) {
  if (activities.length === 0) {
    return (
      <div className="activity-card">
        <h2>📋 Recent Activity</h2>

        <p
          style={{
            color: "#777",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          No recent activity yet.
        </p>
      </div>
    );
  }

  return (
    <div className="activity-card">
      <h2>📋 Recent Activity</h2>

      {activities.map((activity, index) => (
        <div className="activity-item" key={index}>
          <div
            className="activity-icon"
            style={{ color: activity.color }}
          >
            {getIcon(activity.icon)}
          </div>

          <div className="activity-info">
            <h4>{activity.text}</h4>
            <p>{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Activity;