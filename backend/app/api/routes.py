from fastapi import APIRouter, UploadFile, File, Form
from app.models.request_model import AnalyzeRequest
from app.services.pipeline import run_pipeline

router = APIRouter()

@router.post("/analyze")
async def analyze(
    input_type: str = Form(...),
    content: str = Form(None),
    file: UploadFile = File(None)
):
    if file:
        content = (await file.read()).decode("utf-8")

    request = AnalyzeRequest(
        input_type=input_type,
        content=content,
        options={
            "mask": True,
            "block_high_risk": True,
            "log_analysis": True
        }
    )

    return await run_pipeline(request)