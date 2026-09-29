"""
FastAPI AI Service Main Application
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from .stylometry import compare_texts
from .behavior import analyze_circadian_overlap
from .entity_linking import compute_attribution

app = FastAPI(
    title="Threat Actor De-anonymization AI Service",
    description="Microservice evaluating stylometry, behavioral rhythms, and multi-factor entity linking.",
    version="1.0.0"
)

class StylometryRequest(BaseModel):
    sample_a: str
    sample_b: str

class EntityLinkRequest(BaseModel):
    id_overlap: float = 80.0
    temporal_overlap: float = 75.0
    platform_overlap: float = 70.0
    behavior_sim: float = 74.0
    stylo_sim: float = 78.0

@app.get("/health")
def health():
    return {"status": "healthy", "service": "threat-ai-microservice"}

@app.post("/analyze/stylometry")
def analyze_stylometry(req: StylometryRequest):
    return compare_texts(req.sample_a, req.sample_b)

@app.post("/analyze/entity-link")
def analyze_entity_link(req: EntityLinkRequest):
    return compute_attribution(
        req.id_overlap,
        req.temporal_overlap,
        req.platform_overlap,
        req.behavior_sim,
        req.stylo_sim
    )
