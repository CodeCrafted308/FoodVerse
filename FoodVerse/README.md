# FoodVerse — Multimodal Food Intelligence Platform

A runnable starter project with a React + Vite frontend and FastAPI backend. It includes modular demo services for food recognition, nutrition estimates, freshness assessment, kitchen hygiene video review, cooking assistance, personalized meal plans, and an insights dashboard.

> **Important:** This is a prototype scaffold, not a validated food-safety or medical product. Nutrition is approximate; freshness and hygiene outputs are heuristic demos, not reliable safety determinations. Do not use them to decide whether food is safe to eat or to certify a restaurant. Real model integrations are intentionally isolated behind service modules.

## Requirements
- Python 3.10+
- Node.js 18+

## Run backend
```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
API docs: http://127.0.0.1:8000/docs

## Run frontend (new terminal)
```bash
cd frontend
npm install
npm run dev
```
Open the local URL printed by Vite. The frontend expects the API at `http://127.0.0.1:8000`. Set `VITE_API_URL` if needed.

## Included capabilities
- Image upload and demo food-label prediction (filename-based fallback; not a trained classifier)
- Approximate nutrition lookup for common foods
- Heuristic freshness demo
- Video upload review with explicit demo-only hygiene checklist
- Recipe suggestions and meal-plan generation
- Health score and actionable insight cards

## Next steps for production
1. Replace demo food detection with a trained vision model or hosted vision API.
2. Use a calibrated nutrition database and portion-size estimation.
3. Validate freshness models against labeled datasets for each food category and storage condition.
4. For hygiene monitoring, use consented footage, privacy controls, human review, and a validated object/action detection pipeline.
5. Add authentication, database persistence, rate limits, file scanning, observability, tests, and deployment configuration.
