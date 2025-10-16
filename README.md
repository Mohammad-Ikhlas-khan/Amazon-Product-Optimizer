# Amazon Product Optimizer

This web application generates Amazon-optimized product listings using advanced AI (Gemini), helping sellers create compelling, SEO-friendly titles, bullets, and descriptions from their original product data. The app includes both a React frontend and a Node.js/Express backend, with a MySQL database for storage.

---

## Features
- Scrape and input original Amazon product data
- AI-powered optimization for Amazon listings:
  - Title
  - Bullets
  - Long-form description
  - Relevant keyword phrases
- Easy history tracking and review

---

## Quickstart

### 1. Clone the repository
```bash
git clone https://github.com/Mohammad-Ikhlas-khan/Amazon-Product-Optimizer.git
cd Amazon_Product
```

### 2. Install dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Setup environment variables
Create a `.env` file inside the `backend` folder with:
```
DB_NAME=your_db_name
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
PORT=3000
GEMINI_API_KEY=your_google_gemini_api_key
```

_Set up your MySQL server and create a blank database matching `DB_NAME` above._

### 4. Run the app
#### Backend
```bash
cd backend
npm run dev
# or: npm start
```
The backend runs by default on [http://localhost:3000](http://localhost:3000)

#### Frontend
```bash
cd frontend
npm run dev
```
Visit the app at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

---

## Database Setup Notes
- The backend uses Sequelize for ORM.
- On first run, necessary tables will be created automatically.
- Ensure MySQL is running and credentials in `.env` are correct.

---

## AI Prompt Used (Gemini Model)
```
You are an expert Amazon listing copywriter and SEO specialist. 
Given the original listing fields below, produce:

1) "optimized_title": a single title (<=200 characters), keyword-rich, readable.
2) "optimized_bullets": an array of 5 concise bullet points (each 1-2 short sentences).
3) "optimized_description": a persuasive long-form description (3-5 short paragraphs) that avoids medical/illegal claims and follows Amazon policies.
4) "keywords": 3-5 short keyword phrases relevant to the product (comma-separated array).

**ENSURE ALL STRING VALUES ARE PROPERLY ESCAPED FOR JSON, ESPECIALLY DOUBLE QUOTES.** 
Return output strictly as JSON with those keys. Here are the original fields:

ORIGINAL_TITLE: "{original_title}"
ORIGINAL_BULLETS: {original_bullets_json}
ORIGINAL_DESCRIPTION: "{original_description}"
Product details / restrictions: don't claim unproven benefits. Use American English. Keep keywords natural. Generate bullets that are customer-focused (benefits + features).
```

### Why this prompt?
This prompt was designed to generate clear, policy-compliant, and SEO-focused Amazon listings using the Gemini generative AI model. It:
- Enforces strict Amazon character and content policies
- Focuses output on buyer benefits and natural keywords
- Returns directly usable, structured fields in JSON for easy frontend display and database storage
- Ensures compliance by avoiding unproven claims and escaping content for reliability

---

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, Sequelize
- **Database:** MySQL
- **AI:** Google Gemini API

---
