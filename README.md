# AI Secure Data Intelligence Platform

## Overview

An AI-powered security analysis platform that detects sensitive data leaks, security vulnerabilities, and anomalies in logs and text inputs using a hybrid detection engine (Regex + AI).

---

## Features

* Multi-input support (Text + File Upload)
* Sensitive data detection:

  * Emails
  * Passwords
  * API Keys
  * Phone Numbers
  * Tokens (JWT)
* Log anomaly detection:

  * Errors
  * Authentication failures
* AI-powered insights using Gemini
* Risk scoring and classification
* Policy engine (mask/block)
* Masked log visualization
* Interactive frontend dashboard

---

## Tech Stack

* Backend: FastAPI (Python)
* AI: Gemini API (via google-generativeai)
* Frontend: React + Tailwind CSS + Framer Motion
* Architecture: Modular pipeline-based design

---

## System Architecture

Input → Parser → Detection Engine (Regex + Log Analyzer + AI) → Risk Engine → Policy Engine → Response

---

## Setup Instructions

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Example Input

```
email=test@gmail.com
password=admin123
api_key=sk-xyz
```

---

## Example Output

* Risk Level: High
* Masked Logs
* AI Insights
* Structured Findings
