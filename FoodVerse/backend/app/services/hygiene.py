from pathlib import Path
def review_kitchen_video(path: Path, original_name: str) -> dict:
    # Video decoding, person/object detection and action recognition are not bundled.
    return {
        "prototype": True,
        "video": original_name,
        "status": "Manual review required",
        "checks": [
            {"indicator": "Glove usage", "result": "Not analyzed", "note": "Requires a validated video detection model."},
            {"indicator": "Hair-cap compliance", "result": "Not analyzed", "note": "Requires person/PPE detection."},
            {"indicator": "Food handling", "result": "Not analyzed", "note": "Requires temporal action recognition."},
            {"indicator": "Kitchen cleanliness", "result": "Not analyzed", "note": "Requires validated scene analysis."}
        ],
        "privacy_note": "Use footage only with appropriate authorization and privacy safeguards.",
        "disclaimer": "No hygiene compliance conclusion is made by this demo."
    }
