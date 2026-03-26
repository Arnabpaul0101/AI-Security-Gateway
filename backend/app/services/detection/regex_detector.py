import re
from app.utils.patterns import patterns

def run_regex_detection(lines):
    findings = []

    for i, line in enumerate(lines):
        for key, pattern in patterns.items():
            match = re.search(pattern, line, re.IGNORECASE)

            if match:
                findings.append({
                    "type": key,
                    "value": match.group(1),
                    "line": i + 1,
                    "risk": get_risk(key)
                })

    return findings


def get_risk(key):
    if key == "password":
        return "critical"
    if key == "api_key":
        return "high"
    return "low"