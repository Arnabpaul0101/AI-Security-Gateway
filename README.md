# 🔐 AI Secure Data Intelligence Platform

An AI-powered security analysis platform that detects sensitive data leaks, identifies security risks, and generates actionable insights from logs and text inputs.

---

## 🚀 Overview

Modern applications generate large volumes of logs that often contain sensitive information such as passwords, API keys, tokens, and user data. If exposed, this can lead to serious security vulnerabilities and data breaches.

This project provides an **automated, intelligent solution** to analyze logs, detect sensitive data, classify risks, and generate AI-driven security insights.

---

## ✨ Features

### 🔍 Sensitive Data Detection

* Emails
* Passwords
* API Keys
* Phone Numbers
* Tokens (JWT & generic tokens)

### 🛡️ Security Analysis

* Error log detection
* Stack trace detection
* Authentication failure detection
* Suspicious pattern identification

### 🤖 AI-Powered Insights

* Log summary
* Risk identification
* Actionable recommendations

### ⚙️ Risk Engine

* Risk scoring system
* Risk levels: Low, Medium, High, Critical
* Policy-based actions (Mask / Block / Allow)

### 🔒 Data Protection

* Automatic masking of sensitive data
* Safe log visualization

### 🖥️ Interactive Frontend

* Text input + File upload (.log, .txt)
* Highlighted risky lines
* Risk breakdown dashboard
* AI insights panel

---

## 🏗️ System Architecture

```
Input (Text / File / Log)
        ↓
Parser
        ↓
Detection Engine
   ├── Regex Detection
   ├── Log Analyzer
   ├── AI Analyzer (Gemini)
        ↓
Risk Engine
        ↓
Policy Engine
        ↓
Response (Findings + Masked Logs + Insights)
```

---

## 🧰 Tech Stack

### Backend

* FastAPI (Python)
* Pydantic
* Regex-based detection
* Gemini API (google-generativeai)

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion

---

## ⚙️ Setup Instructions

### 📌 1. Clone Repository

```bash
git clone <your-repo-link>
cd ai-secure-data-intelligence-platform
```

---

## 🐍 Backend Setup

### 📌 2. Navigate to Backend

```bash
cd backend
```

### 📌 3. Create Virtual Environment

```bash
python -m venv venv
```

#### Activate Environment

**Windows**

```bash
venv\Scripts\activate
```

**Mac/Linux**

```bash
source venv/bin/activate
```

---

### 📌 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 📌 5. Add Gemini API Key ⚠️ IMPORTANT

Create a `.env` file inside the `backend/` folder:

```env
GEMINI_API_KEY=your_api_key_here
```

👉 Replace `your_api_key_here` with your actual Gemini API key.

---

### 📌 6. Run Backend Server

```bash
uvicorn app.main:app --reload
```

Server will run at:

```
http://127.0.0.1:8000
```

Swagger API docs:

```
http://127.0.0.1:8000/docs
```

---

## ⚛️ Frontend Setup

### 📌 7. Navigate to Frontend

```bash
cd frontend
```

### 📌 8. Install Dependencies

```bash
npm install
```

---

### 📌 9. Run Frontend

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

---

## 🧪 Example Input

```plaintext
email=test@gmail.com
password=admin123
api_key=sk-xyz
phone=9876543210
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature
ERROR something broke
```

---

## 📊 Example Output

* Detected sensitive data (email, password, API key, token)
* Risk Score: High
* Masked Logs:

  ```
  email=******
  password=******
  api_key=******
  ```
* AI Insights:

  * Rotate credentials
  * Improve logging practices
  * Enforce security policies

---

## 🎯 Key Highlights

* Hybrid detection (Regex + AI)
* Modular and scalable architecture
* Real-time log analysis
* Risk scoring system
* Secure masking engine
* Interactive UI for visualization

---

## 🚧 Future Enhancements

* PDF / DOC file support
* Real-time log streaming
* Advanced anomaly detection
* IP tracking & correlation
* Deployment (cloud-based system)

---

## 📌 Conclusion

This platform automates security analysis of logs and helps organizations quickly identify vulnerabilities, prevent data leaks, and improve system security.

---

## 📽️ Demo

(Add your demo video link here)

---

## 🔗 Repository

(Add your GitHub link here)
