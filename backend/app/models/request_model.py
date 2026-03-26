from pydantic import BaseModel
from typing import Optional, Dict

class AnalyzeRequest(BaseModel):
    input_type: str
    content: Optional[str] = None
    options: Optional[Dict] = {}