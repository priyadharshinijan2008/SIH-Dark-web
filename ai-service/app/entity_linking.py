"""
Entity Linking Multi-Factor Attribution (Python FastAPI Microservice)
"""
from typing import Dict, Any

def compute_attribution(
    id_overlap: float,
    temporal_overlap: float,
    platform_overlap: float,
    behavior_sim: float,
    stylo_sim: float
) -> Dict[str, Any]:
    # Weights: 30%, 15%, 15%, 20%, 20%
    score = (
        id_overlap * 0.30 +
        temporal_overlap * 0.15 +
        platform_overlap * 0.15 +
        behavior_sim * 0.20 +
        stylo_sim * 0.20
    )
    overall = min(99, max(10, int(round(score))))
    
    strength = "Strong Association" if overall >= 75 else "Moderate Association" if overall >= 55 else "Weak Association"
    
    return {
        "overall_confidence": overall,
        "association_strength": strength,
        "disclaimer": "This score represents similarity between observed indicators. It does not establish a person's real-world identity."
    }
