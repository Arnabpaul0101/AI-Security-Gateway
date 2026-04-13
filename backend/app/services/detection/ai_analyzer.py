import os
import json
import re
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
# from langchain_groq import ChatGroq

load_dotenv()


llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    google_api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0.2
)

# llm2 = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.2)

prompt_template = ChatPromptTemplate.from_template("""
You are a cybersecurity log analysis system.

Analyze the logs and the detected findings.

Return STRICT JSON in this format:

{{
  "summary": "short 2-3 line summary",
  "risks": ["risk1", "risk2"],
  "insights": ["insight1", "insight2"]
}}

Rules:
- Do NOT return markdown
- Do NOT add explanations outside JSON
- Keep summary concise
- Insights must be actionable
- Use findings to guide your analysis

Logs:
{content}

Findings:
{findings}
""")


parser = StrOutputParser()


async def run_ai_analysis(content, findings):
    chain = prompt_template | llm | parser

    response = await chain.ainvoke({
        "content": content,
        "findings": json.dumps(findings, indent=2)
    })

    parsed = extract_json(response)

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