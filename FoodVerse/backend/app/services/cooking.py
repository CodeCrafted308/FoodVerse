def suggest_recipes(ingredients: str, dietary_preference: str = "No preference") -> list[dict]:
    items = [x.strip() for x in ingredients.split(",") if x.strip()]
    if not items:
        items = ["seasonal vegetables", "rice"]
    main = ", ".join(items[:4])
    recipes = [
        {"name": f"Quick {items[0].title()} Bowl", "time_minutes": 20,
         "ingredients": items[:6], "steps": [
             "Wash and prepare the ingredients.",
             "Cook grains or other base ingredients according to their package instructions.",
             "Cook the remaining ingredients thoroughly with suitable seasoning.",
             "Combine, taste, and serve."
         ], "dietary_preference": dietary_preference},
        {"name": f"Simple {items[0].title()} Skillet", "time_minutes": 15,
         "ingredients": items[:6] + ["oil", "salt and pepper"],
         "steps": [
             "Prepare ingredients into evenly sized pieces.",
             "Heat a pan and add a small amount of oil.",
             "Cook ingredients until tender and safely cooked through.",
             "Season and serve."
         ], "dietary_preference": dietary_preference}
    ]
    return recipes

def create_meal_plan(goal: str, dietary_preference: str, meals_per_day: int, days: int) -> dict:
    choices = [
        ("Breakfast", "Oats with fruit and yogurt"),
        ("Lunch", "Grain bowl with vegetables and beans"),
        ("Dinner", "Vegetable stir-fry with a protein source"),
        ("Snack", "Fruit with nuts or an alternative"),
        ("Extra meal", "Soup with whole-grain toast"),
        ("Light meal", "Egg, tofu, or bean wrap")
    ]
    plan = []
    for day in range(1, days + 1):
        meals = []
        for idx in range(meals_per_day):
            label, meal = choices[idx % len(choices)]
            meals.append({"type": label, "suggestion": meal})
        plan.append({"day": day, "meals": meals})
    return {
        "prototype": True, "goal": goal, "dietary_preference": dietary_preference,
        "days": plan,
        "note": "General ideas only. Adjust portions and ingredients for allergies, medical needs, culture, budget, and professional advice."
    }
