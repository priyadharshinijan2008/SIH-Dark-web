"""
Behavioral Circadian Rhythm Analysis (Python FastAPI Microservice)
"""
from typing import Dict, Any, List

def analyze_circadian_overlap(hist_a: List[int], hist_b: List[int]) -> int:
    if len(hist_a) != 24 or len(hist_b) != 24:
        return 70
    dot_prod = sum(a * b for a, b in zip(hist_a, hist_b))
    norm_a = sum(a * a for a in hist_a) ** 0.5
    norm_b = sum(b * b for b in hist_b) ** 0.5
    if norm_a == 0 or norm_b == 0:
        return 50
    return min(100, int((dot_prod / (norm_a * norm_b)) * 100))
