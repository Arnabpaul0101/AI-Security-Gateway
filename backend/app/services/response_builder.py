def build_response(content, findings, score, level, action, ai_output, masked_content):
    return {
        "summary": ai_output.get("summary", ""),
        "content_type": "log",
        "findings": findings,
        "risk_score": score,
        "risk_level": level,
        "action": action,
        "masked_content": masked_content,
        "insights": ai_output.get("insights", []),
        "metadata": {
            "total_lines": len(content.split("\n")),
            "total_findings": len(findings)
        }
    }