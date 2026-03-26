from pydantic import BaseModel
from typing import Optional, Dict

class AnalyzeRequest(BaseModel):
    input_type: str
    content: str
    options: Optional[Dict] = {}