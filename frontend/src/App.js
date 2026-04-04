import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const chartData = data ? {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [{
      data: [data.easy, data.medium, data.hard],
      backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
      borderWidth: 1,
    }],
  } : null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>DSA Dashboard</h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="Enter LeetCode username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', fontSize: '16px', width: '250px' }}
          />
          <button 
            onClick={fetchStats} 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px', 
              backgroundColor: loading ? '#ccc' : '#007BFF', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: loading ? 'not-allowed' : 'pointer' 
            }}
          >
            {loading ? 'Loading...' : 'Fetch Stats'}
          </button>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>Error: {error}</p>}

        {data && (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Stats for {data.username}</h2>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', textAlign: 'center', minWidth: '120px' }}>
                <h3>Total Solved</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{data.totalSolved}</p>
              </div>
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', textAlign: 'center', minWidth: '120px' }}>
                <h3>Easy</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>{data.easy}</p>
              </div>
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', textAlign: 'center', minWidth: '120px' }}>
                <h3>Medium</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF9800' }}>{data.medium}</p>
              </div>
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', textAlign: 'center', minWidth: '120px' }}>
                <h3>Hard</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#F44336' }}>{data.hard}</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '400px', height: '400px' }}>
                <Pie data={chartData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;