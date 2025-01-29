import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/record") // Call the backend API
      .then((response) => {
        console.log("API Response:", response.data); // 🔍 Debug API response
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet /> {/* This is where other pages will be rendered */}

      <h1>MongoDB Records</h1>
      <ul>
        {records.map((record) => (
          <li key={record._id}>{record.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
