from app.core.constants import RISK_WEIGHTS

def calculate_risk(findings):
    score = 0

    for f in findings:
        score += RISK_WEIGHTS.get(f["risk"], 1)

    if score >= 9:
        level = "high"
    elif score >= 4:
        level = "medium"
    else:
        level = "low"

    return score, level