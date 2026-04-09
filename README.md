# 🚀 Unified DSA Dashboard

A full-stack web application that aggregates coding statistics from multiple platforms into a single, clean dashboard.

Track your progress across platforms like **LeetCode** and **GeeksforGeeks** in one place with visual insights and combined analytics.

---

## 🔗 Live Demo

* 🌐 Frontend: https://unified-dsa-dashboard.vercel.app/
* ⚙️ Backend API: https://unified-dsa-dashboard.onrender.com/dashboard?leetcode=leetcode_username&gfg=gfg_username

Example:

```
https://unified-dsa-dashboard.onrender.com/dashboard?leetcode=neetcode&gfg=pavana26
```

---

## ✨ Features

* 📊 Aggregated stats from multiple platforms
* 🧠 Difficulty-wise breakdown (Easy / Medium / Hard)
* 📈 Combined analytics across platforms
* ⚡ Fast API responses with clean JSON structure
* 🎨 Modern UI with charts and insights
* 🔌 Real-time data fetching

---

## 🏗️ Tech Stack

### 🔹 Frontend

* React.js
* Chart.js
* CSS (custom styling)

### 🔹 Backend

* Java (Spring Boot)
* REST APIs
* Maven

### 🔹 Deployment

* Backend: Railway
* Frontend: Vercel

---

## 📡 API Endpoints

### 🔸 Get Combined Dashboard Stats

```
GET /dashboard?leetcode={username}&gfg={username}
```

### 🔹 Example Request

```
/dashboard?leetcode=neetcode&gfg=pavana26
```

### 🔹 Example Response

```json
{
  "gfg": {
    "username": "pavana26",
    "totalSolved": 634,
    "easy": 282,
    "medium": 139,
    "hard": 32
  },
  "leetcode": {
    "username": "neetcode",
    "totalSolved": 205,
    "easy": 103,
    "medium": 98,
    "hard": 4
  },
  "combined": {
    "total": 839,
    "easy": 385,
    "medium": 237,
    "hard": 36
  }
}
```

---

## ⚙️ Setup Instructions

### 🔹 Clone the repository

```
git clone https://github.com/pavana-namburi/unified-dsa-dashboard
cd unified-dsa-dashboard
```

---

### 🔹 Backend Setup

```
cd Backend
mvn clean install
mvn spring-boot:run
```

Make sure your `application.properties` contains:

```
server.port=${PORT:8080}
```

---

### 🔹 Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 🚧 Challenges Faced

* ❌ No official GeeksforGeeks API
* 🔍 Reverse engineering data sources
* ⚠️ CORS and deployment issues
* 🌐 Handling multi-platform data consistency

---

## 💡 Future Improvements

* Add more platforms (Codeforces, CodeChef, etc.)
* User authentication & saved profiles
* Leaderboards and comparisons
* Advanced analytics (streaks, trends)
* Dark/Light theme toggle

---

## 🙌 Credits

* LeetCode (public data)
* GeeksforGeeks Stats API by
  👉 https://github.com/nikhilpal2705/GeeksForGeeks-Stats-Card

---

## ⚠️ Disclaimer

This project uses publicly available data and unofficial APIs.
It is intended for educational and personal use only.

---

## 📬 Contact

* LinkedIn: https://www.linkedin.com/in/pavana-namburi
* GitHub: https://github.com/pavana-namburi

---

## ⭐ Show your support

If you like this project, give it a ⭐ on GitHub!
