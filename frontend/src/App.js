import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

// 🎨 Premium Color System
const COLORS = {
  bg: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
  cardGlass: "rgba(30, 41, 59, 0.6)",
  cardBorder: "rgba(255, 255, 255, 0.1)",
  text: "#ffffff",
  textSecondary: "#cbd5e1",
  easy: "#22c55e",
  medium: "#f59e0b",
  hard: "#ef4444",
  blue: "#3b82f6",
  cyan: "#06b6d4",
  green: "#10b981",
};

// 🎭 Glassmorphism & Premium Styles
const glassCard = {
  background: COLORS.cardGlass,
  backdropFilter: "blur(10px)",
  border: `1px solid ${COLORS.cardBorder}`,
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s ease",
  animation: "fadeIn 0.6s ease-out",
};

const glassCardHover = {
  ...glassCard,
  transform: "translateY(-4px) scale(1.02)",
  boxShadow: "0 16px 40px rgba(6, 182, 212, 0.2)",
  border: `1px solid rgba(6, 182, 212, 0.3)`,
};

// 📱 Container & Layout Styles
const containerStyle = {
  background: COLORS.bg,
  minHeight: "100vh",
  padding: "60px 20px",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const wrapperStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
};

// 🎯 Header Styles
const headerStyle = {
  textAlign: "center",
  marginBottom: "50px",
};

const titleStyle = {
  fontSize: "48px",
  fontWeight: "800",
  background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  margin: "0 0 12px 0",
  animation: "slideDown 0.8s ease-out",
};

const subtitleStyle = {
  fontSize: "16px",
  color: COLORS.textSecondary,
  margin: "0",
};

// 📥 Input Panel Styles
const inputPanelStyle = {
  ...glassCard,
  marginBottom: "50px",
  padding: "32px",
};

const inputContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr auto",
  gap: "16px",
  alignItems: "flex-end",
  flexWrap: "wrap",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: "700",
  color: COLORS.textSecondary,
  marginBottom: "8px",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const inputStyle = {
  padding: "12px 16px",
  background: "rgba(15, 23, 42, 0.8)",
  border: `1px solid ${COLORS.cardBorder}`,
  borderRadius: "10px",
  color: COLORS.text,
  fontSize: "14px",
  transition: "all 0.3s ease",
  outline: "none",
  fontFamily: "inherit",
};

const inputFocusStyle = {
  borderColor: COLORS.cyan,
  boxShadow: `0 0 20px ${COLORS.cyan}40`,
  background: "rgba(15, 23, 42, 0.95)",
};

const buttonStyle = {
  padding: "12px 32px",
  background: `linear-gradient(135deg, ${COLORS.blue} 0%, ${COLORS.cyan} 100%)`,
  color: COLORS.text,
  border: "none",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 0.3s ease",
  textTransform: "uppercase",
  letterSpacing: "1px",
  boxShadow: `0 4px 20px ${COLORS.cyan}40`,
};

const buttonHoverStyle = {
  transform: "translateY(-2px)",
  boxShadow: `0 8px 30px ${COLORS.cyan}60`,
};

// 📊 Stat Card Styles
const statGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const statCardStyle = {
  ...glassCard,
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
};

const accentBarStyle = (color) => ({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "4px",
  background: color,
  boxShadow: `0 0 16px ${color}80`,
});

const statTitleStyle = {
  fontSize: "12px",
  fontWeight: "700",
  color: COLORS.textSecondary,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "12px",
  marginTop: "12px",
};

const statValueStyle = {
  fontSize: "36px",
  fontWeight: "800",
  margin: "0",
  background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

// 🎨 Section Title
const sectionTitleStyle = {
  fontSize: "24px",
  fontWeight: "700",
  color: COLORS.text,
  marginTop: "40px",
  marginBottom: "24px",
  paddingBottom: "12px",
  borderBottom: `2px solid ${COLORS.cyan}40`,
};

// 📈 Chart Container
const chartGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "24px",
  marginBottom: "40px",
};

const chartCardStyle = {
  ...glassCard,
  display: "flex",
  flexDirection: "column",
};

const chartTitleStyle = {
  fontSize: "16px",
  fontWeight: "700",
  color: COLORS.text,
  marginBottom: "20px",
  textAlign: "center",
};

const chartWrapperStyle = {
  flex: 1,
  minHeight: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// 📊 Percentage Bar
const percentageContainerStyle = {
  marginTop: "24px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
};

const percentageItemStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const percentageBarBgStyle = {
  width: "100%",
  height: "12px",
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "6px",
  overflow: "hidden",
  border: `1px solid ${COLORS.cardBorder}`,
};

const percentageBarFillStyle = (percentage, color) => ({
  width: `${percentage}%`,
  height: "100%",
  background: `linear-gradient(90deg, ${color}, ${color}dd)`,
  borderRadius: "6px",
  transition: "width 1s ease-out",
  boxShadow: `0 0 12px ${color}60`,
});

const percentageLabelStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "13px",
  fontWeight: "700",
  color: COLORS.text,
};

// 💡 Insights
const insightsCardStyle = {
  ...glassCard,
  marginBottom: "40px",
};

const insightItemStyle = {
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
  marginBottom: "12px",
};

const insightTextStyle = {
  fontSize: "14px",
  color: COLORS.textSecondary,
  lineHeight: "1.6",
};

// 🎥 Error Message
const errorStyle = {
  background: "rgba(239, 68, 68, 0.1)",
  border: `1px solid ${COLORS.hard}`,
  borderRadius: "10px",
  padding: "16px",
  color: "#fca5a5",
  marginBottom: "20px",
  textAlign: "center",
  fontSize: "14px",
};

const loadingStyle = {
  textAlign: "center",
  color: COLORS.textSecondary,
  fontSize: "16px",
  padding: "40px",
  fontWeight: "600",
};

function App() {
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [gfgUsername, setGfgUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  const fetchData = async () => {
    if (!leetcodeUsername.trim() && !gfgUsername.trim()) {
      setError("Please enter at least one username");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const leetParam = leetcodeUsername.trim() || "";
      const gfgParam = gfgUsername.trim() || "";
      const res = await fetch(
  `https://unified-dsa-dashboard.onrender.com/dashboard?leetcode=${leetParam}&gfg=${gfgParam}`
);
      if (!res.ok) throw new Error("Failed to fetch data from server");
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to fetch data. Check your usernames and try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Extract data safely with optional chaining
  const leetcode = data?.leetcode || {};
  const gfg = data?.gfg || {};
  const combined = data?.combined || {};

  const leetcodeTotal = leetcode?.totalSolved || 0;
  const lcEasy = leetcode?.easy || 0;
  const lcMedium = leetcode?.medium || 0;
  const lcHard = leetcode?.hard || 0;

  const gfgTotal = gfg?.totalSolved || 0;
  const gfgEasy = gfg?.easy || 0;
  const gfgMedium = gfg?.medium || 0;
  const gfgHard = gfg?.hard || 0;

  const combinedTotal = combined?.total || 0;
  const combinedEasy = combined?.easy || 0;
  const combinedMedium = combined?.medium || 0;
  const combinedHard = combined?.hard || 0;

  const getPercentage = (value, total) =>
    total ? ((value / total) * 100).toFixed(1) : 0;

  const leetcodePercentage = getPercentage(leetcodeTotal, combinedTotal);
  const gfgPercentage = getPercentage(gfgTotal, combinedTotal);

  // 🔥 Insights
  const generateInsights = () => {
    let insights = [];

    if (gfgTotal > leetcodeTotal) {
      insights.push(
        `🎯 You solved ${gfgTotal - leetcodeTotal} more problems on GFG than LeetCode`
      );
    } else if (leetcodeTotal > gfgTotal) {
      insights.push(
        `⚡ You solved ${leetcodeTotal - gfgTotal} more problems on LeetCode than GFG`
      );
    }

    if (combinedMedium > combinedEasy && combinedMedium > combinedHard) {
      insights.push("💪 Strong focus on medium difficulty problems");
    }

    if (combinedHard > 0 && combinedHard > combinedEasy) {
      insights.push("🔥 Impressive hard problem-solving skills");
    }

    return insights;
  };

  const insights = generateInsights();

  // 🔥 Charts
  const pieData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [combinedEasy, combinedMedium, combinedHard],
        backgroundColor: [COLORS.easy, COLORS.medium, COLORS.hard],
        borderColor: COLORS.bg,
        borderWidth: 2,
      }
    ]
  };

  const barData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "LeetCode",
        data: [lcEasy, lcMedium, lcHard],
        backgroundColor: COLORS.blue,
        borderRadius: 8,
      },
      {
        label: "GFG",
        data: [gfgEasy, gfgMedium, gfgHard],
        backgroundColor: COLORS.green,
        borderRadius: 8,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: COLORS.text,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: COLORS.text,
        bodyColor: COLORS.text,
      },
    },
    scales: {
      x: {
        ticks: { color: COLORS.text },
        grid: { color: "rgba(255, 255, 255, 0.05)" },
      },
      y: {
        ticks: { color: COLORS.text },
        grid: { color: "rgba(255, 255, 255, 0.05)" },
      },
    },
  };

  // Add CSS for animations
  const styleSheet = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
    }
  `;

  return (
    <>
      <style>{styleSheet}</style>
      <div style={containerStyle}>
        <div style={wrapperStyle}>
          {/* 🎯 HEADER */}
          <div style={headerStyle}>
            <h1 style={titleStyle}>Unified DSA Dashboard</h1>
            <p style={subtitleStyle}>
              Track your coding progress across platforms
            </p>
          </div>

          {/* 📥 INPUT PANEL */}
          <div style={inputPanelStyle}>
            <div style={inputContainerStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>LeetCode Username</label>
                <input
                  type="text"
                  placeholder="e.g., neetcode"
                  value={leetcodeUsername}
                  onChange={(e) => setLeetcodeUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchData()}
                  onFocus={() => setFocusedInput("leetcode")}
                  onBlur={() => setFocusedInput("")}
                  style={{
                    ...inputStyle,
                    ...(focusedInput === "leetcode" ? inputFocusStyle : {}),
                  }}
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>GFG Username</label>
                <input
                  type="text"
                  placeholder="e.g., user_geeksforgeeks"
                  value={gfgUsername}
                  onChange={(e) => setGfgUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && fetchData()}
                  onFocus={() => setFocusedInput("gfg")}
                  onBlur={() => setFocusedInput("")}
                  style={{
                    ...inputStyle,
                    ...(focusedInput === "gfg" ? inputFocusStyle : {}),
                  }}
                />
              </div>

              <button
                onClick={fetchData}
                disabled={loading}
                onMouseEnter={(e) =>
                  !loading && (e.target.style.boxShadow = buttonHoverStyle.boxShadow)
                }
                onMouseLeave={(e) =>
                  (e.target.style.boxShadow = buttonStyle.boxShadow)
                }
                style={{
                  ...buttonStyle,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "⏳ Loading..." : "Fetch"}
              </button>
            </div>
          </div>

          {/* ❌ ERROR MESSAGE */}
          {error && <div style={errorStyle}>❌ {error}</div>}

          {/* ⏳ LOADING STATE */}
          {loading && <div style={loadingStyle}>Fetching your dashboard...</div>}

          {/* 📊 DASHBOARD */}
          {data && !loading && (
            <>
              {/* 📈 LEETCODE STATS */}
              <h2 style={sectionTitleStyle}>📊 LeetCode Stats</h2>
              <div style={statGridStyle}>
                {[
                  { title: "Total", value: leetcodeTotal, color: COLORS.blue },
                  { title: "Easy", value: lcEasy, color: COLORS.easy },
                  { title: "Medium", value: lcMedium, color: COLORS.medium },
                  { title: "Hard", value: lcHard, color: COLORS.hard },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={statCardStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, glassCardHover)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, statCardStyle)}
                  >
                    <div style={accentBarStyle(stat.color)} />
                    <div style={statTitleStyle}>{stat.title}</div>
                    <p style={{ ...statValueStyle, color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* 🎯 GFG STATS */}
              <h2 style={sectionTitleStyle}>🎯 GFG Stats</h2>
              <div style={statGridStyle}>
                {[
                  { title: "Total", value: gfgTotal, color: COLORS.green },
                  { title: "Easy", value: gfgEasy, color: COLORS.easy },
                  { title: "Medium", value: gfgMedium, color: COLORS.medium },
                  { title: "Hard", value: gfgHard, color: COLORS.hard },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={statCardStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, glassCardHover)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, statCardStyle)}
                  >
                    <div style={accentBarStyle(stat.color)} />
                    <div style={statTitleStyle}>{stat.title}</div>
                    <p style={{ ...statValueStyle, color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* 🏆 COMBINED STATS */}
              <h2 style={sectionTitleStyle}>🏆 Combined Stats</h2>
              <div style={statGridStyle}>
                {[
                  { title: "Total", value: combinedTotal, color: COLORS.cyan },
                  { title: "Easy", value: combinedEasy, color: COLORS.easy },
                  { title: "Medium", value: combinedMedium, color: COLORS.medium },
                  { title: "Hard", value: combinedHard, color: COLORS.hard },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...statCardStyle,
                      background: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(6, 182, 212, 0.15) 100%)`,
                    }}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, glassCardHover)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, { ...statCardStyle, background: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(6, 182, 212, 0.15) 100%)` })}
                  >
                    <div style={accentBarStyle(stat.color)} />
                    <div style={statTitleStyle}>{stat.title}</div>
                    <p style={{ ...statValueStyle, color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* 📊 Platform Contribution */}
              <h2 style={sectionTitleStyle}>📊 Platform Contribution</h2>
              <div
                style={{
                  ...glassCard,
                  background: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(6, 182, 212, 0.15) 100%)`,
                  border: `2px solid ${COLORS.cyan}40`,
                }}
              >
                <div style={accentBarStyle(COLORS.cyan)} />
                <div style={percentageContainerStyle}>
                  <div style={percentageItemStyle}>
                    <div style={percentageLabelStyle}>
                      <span>LeetCode</span>
                      <span>{leetcodePercentage}%</span>
                    </div>
                    <div style={percentageBarBgStyle}>
                      <div
                        style={percentageBarFillStyle(
                          leetcodePercentage,
                          COLORS.blue
                        )}
                      />
                    </div>
                  </div>

                  <div style={percentageItemStyle}>
                    <div style={percentageLabelStyle}>
                      <span>GFG</span>
                      <span>{gfgPercentage}%</span>
                    </div>
                    <div style={percentageBarBgStyle}>
                      <div
                        style={percentageBarFillStyle(
                          gfgPercentage,
                          COLORS.green
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 📈 CHARTS */}
              <h2 style={sectionTitleStyle}>📈 Analytics</h2>
              <div style={chartGridStyle}>
                <div style={chartCardStyle}>
                  <div style={chartTitleStyle}>Combined Difficulty Distribution</div>
                  <div style={chartWrapperStyle}>
                    <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: COLORS.text } } } }} />
                  </div>
                </div>

                <div style={chartCardStyle}>
                  <div style={chartTitleStyle}>LeetCode vs GFG by Difficulty</div>
                  <div style={chartWrapperStyle}>
                    <Bar data={barData} options={chartOptions} />
                  </div>
                </div>
              </div>

              {/* 💡 INSIGHTS */}
              {insights.length > 0 && (
                <>
                  <h2 style={sectionTitleStyle}>💡 Insights</h2>
                  <div style={insightsCardStyle}>
                    {insights.map((insight, idx) => (
                      <div key={idx} style={insightItemStyle}>
                        <span style={{ fontSize: "20px", minWidth: "24px" }}>
                          {insight.charAt(0)}
                        </span>
                        <p style={insightTextStyle}>{insight.slice(2)}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;