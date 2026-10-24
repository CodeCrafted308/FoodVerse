from pathlib import Path
def assess_freshness(path: Path, original_name: str) -> dict:
    # No visual model is bundled; never infer food safety from a filename.
    return {
        "prototype": True,
        "classification": "Needs visual review",
        "confidence": None,
        "signals_checked": ["Color", "Texture", "Discoloration", "Surface patterns"],
        "findings": [
            "A validated image model is not connected in this starter.",
            "Image-only freshness estimates can miss pathogens and unsafe storage conditions."
        ],
        "recommendation": "Inspect the food directly and follow storage guidance. When in doubt, discard it.",
        "disclaimer": "This demo does not determine whether food is safe to eat."
    }
