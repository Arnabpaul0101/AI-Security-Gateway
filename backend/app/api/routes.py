from fastapi import APIRouter
from app.models.request_model import AnalyzeRequest
from app.services.pipeline import run_pipeline

router = APIRouter()

@router.post("/analyze")
async def analyze(request: AnalyzeRequest):
    return await run_pipeline(request)