from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil, uuid

from .services.food import analyze_food
from .services.freshness import assess_freshness
from .services.hygiene import review_kitchen_video
from .services.cooking import suggest_recipes, create_meal_plan

app = FastAPI(title="FoodVerse API", version="0.1.0", description="Multimodal Food Intelligence demo API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
MAX_FILE_BYTES = 20 * 1024 * 1024

@app.get("/")
def root():
    return {"name": "FoodVerse API", "status": "running", "docs": "/docs", "prototype": True}

@app.get("/api/health")
def health():
    return {"status": "healthy", "version": "0.1.0"}

async def save_upload(file: UploadFile, allowed: set[str]) -> Path:
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in allowed:
        raise HTTPException(status_code=415, detail=f"Unsupported file type. Allowed: {', '.join(sorted(allowed))}")
    name = f"{uuid.uuid4().hex}{suffix}"
    path = UPLOAD_DIR / name
    size = 0
    try:
        with path.open("wb") as out:
            while chunk := await file.read(1024 * 1024):
                size += len(chunk)
                if size > MAX_FILE_BYTES:
                    out.close()
                    path.unlink(missing_ok=True)
                    raise HTTPException(status_code=413, detail="File exceeds 20 MB limit")
                out.write(chunk)
    finally:
        await file.close()
    return path

@app.post("/api/food/analyze")
async def food_analyze(file: UploadFile = File(...)):
    path = await save_upload(file, {".jpg", ".jpeg", ".png", ".webp"})
    try:
        return analyze_food(path, file.filename or "food image")
    finally:
        path.unlink(missing_ok=True)

@app.post("/api/freshness/analyze")
async def freshness_analyze(file: UploadFile = File(...)):
    path = await save_upload(file, {".jpg", ".jpeg", ".png", ".webp"})
    try:
        return assess_freshness(path, file.filename or "food image")
    finally:
        path.unlink(missing_ok=True)

@app.post("/api/hygiene/review")
async def hygiene_review(file: UploadFile = File(...)):
    path = await save_upload(file, {".mp4", ".mov", ".avi", ".webm"})
    try:
        return review_kitchen_video(path, file.filename or "kitchen video")
    finally:
        path.unlink(missing_ok=True)

@app.post("/api/cooking/recipes")
def recipes(ingredients: str = Form(...), dietary_preference: str = Form("No preference")):
    return {"recipes": suggest_recipes(ingredients, dietary_preference)}

@app.post("/api/meals/plan")
def meal_plan(
    goal: str = Form("Balanced eating"),
    dietary_preference: str = Form("No preference"),
    meals_per_day: int = Form(3),
    days: int = Form(3),
):
    if not 1 <= meals_per_day <= 6 or not 1 <= days <= 7:
        raise HTTPException(status_code=422, detail="meals_per_day must be 1–6 and days must be 1–7")
    return create_meal_plan(goal, dietary_preference, meals_per_day, days)
