import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(`http://localhost:8082/leetcode/${username}`);
      if (!response.ok) {
        throw new Error("Failed to fetch stats");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>DSA Dashboard</h1>
      <input
        type="text"
        placeholder="Enter LeetCode username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchStats}>Fetch Stats</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h2>Stats for {data.username}</h2>
          <p>Total Solved: {data.totalSolved}</p>
          <p>Easy: {data.easy}</p>
          <p>Medium: {data.medium}</p>
          <p>Hard: {data.hard}</p>
        </div>
      )}
    </div>
  );
}

export default App;