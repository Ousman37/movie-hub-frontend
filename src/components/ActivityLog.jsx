import React from "react";

const ActivityLog = ({ activities }) => {
  return (
    <div className="text-center mb-4">
      <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
      <ul className="list-disc list-inside text-left">
        {activities.map((activity, index) => (
          <li key={index} className="mb-2">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
