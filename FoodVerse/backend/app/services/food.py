from pathlib import Path
from typing import Any

# Demo-only label fallback. Replace with a real model adapter (e.g. ONNX, Torch, or hosted vision API).
FOOD_DATA = {
    "pizza": {"name": "Pizza", "calories": 285, "protein_g": 12, "carbs_g": 36, "fat_g": 10},
    "salad": {"name": "Garden salad", "calories": 120, "protein_g": 4, "carbs_g": 14, "fat_g": 6},
    "burger": {"name": "Burger", "calories": 354, "protein_g": 17, "carbs_g": 32, "fat_g": 17},
    "apple": {"name": "Apple", "calories": 95, "protein_g": 0.5, "carbs_g": 25, "fat_g": 0.3},
    "rice": {"name": "Cooked rice", "calories": 205, "protein_g": 4.3, "carbs_g": 45, "fat_g": 0.4},
    "banana": {"name": "Banana", "calories": 105, "protein_g": 1.3, "carbs_g": 27, "fat_g": 0.4},
    "pasta": {"name": "Pasta", "calories": 220, "protein_g": 8, "carbs_g": 43, "fat_g": 1.3},
    "soup": {"name": "Soup", "calories": 150, "protein_g": 6, "carbs_g": 20, "fat_g": 4},
}
def analyze_food(path: Path, original_name: str) -> dict[str, Any]:
    lower = original_name.lower()
    key = next((k for k in FOOD_DATA if k in lower), "salad")
    item = FOOD_DATA[key]
    # Values represent a rough generic serving, not portion-specific measurements.
    score = max(20, min(95, round(100 - item["fat_g"] * 1.2 - max(0, item["calories"] - 100) * 0.08)))
    return {
        "prototype": True,
        "food": item["name"],
        "confidence": 0.35,
        "recognition_method": "demo filename fallback",
        "nutrition_per_estimated_serving": {k: v for k, v in item.items() if k != "name"},
        "health_score": score,
        "insights": [
            "Nutrition values are generic estimates and depend on portion size and preparation.",
            "For a better-balanced meal, consider adding vegetables and a suitable protein source."
        ],
        "disclaimer": "Demo only: this is not actual computer-vision recognition or medical nutrition advice."
    }
