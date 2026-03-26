from pydantic import BaseModel
from typing import List, Dict, Any

class AnalyzeResponse(BaseModel):
    summary: str
    content_type: str
    findings: List[Dict[str, Any]]
    risk_score: int
    risk_level: str
    action: str
    insights: List[str]