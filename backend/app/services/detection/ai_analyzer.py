import os
import json
import re
from google import genai
from dotenv import load_dotenv
import asyncio

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

async def run_ai_analysis(content, findings):
    prompt = f"""
You are a cybersecurity log analysis system.

Analyze the following logs and return STRICT JSON in this format:

{{
  "summary": "short 2-3 line summary",
  "risks": ["risk1", "risk2"],
  "insights": ["insight1", "insight2"]
}}

Rules:
- Do NOT return markdown
- Do NOT explain anything outside JSON
- Keep summary concise
- Insights should be actionable

Logs:
{content}
"""

    response = await asyncio.to_thread(
        client.models.generate_content,
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text if hasattr(response, "text") else str(response)

    parsed = extract_json(text)

    return {
        "summary": parsed.get("summary", ""),
        "risks": parsed.get("risks", []),
        "insights": parsed.get("insights", [])
    }


def extract_json(text):
    try:
        return json.loads(text)
    except:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group())
            except:
                pass

    return {
        "summary": "AI parsing failed",
        "risks": [],
        "insights": []
    }