// components/StatusDropdown.jsx
import React, { useEffect, useState } from "react";

export default function StatusDropdown({ value, onChange }) {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    // Haal de statussen op vanuit de backend
    fetch("http://localhost:3000/statuses")
      .then((res) => res.json())
      .then((data) => setStatuses(data))
      .catch((err) => console.error("Fout bij ophalen statussen:", err));
  }, []);

  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>
        Kies status
      </option>
      {statuses.map((status) => (
        <option key={status.ID} value={status.StatusTitle}>
          {status.StatusTitle}
        </option>
      ))}
    </select>
  );
}
