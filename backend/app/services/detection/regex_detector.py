import re
from app.utils.patterns import patterns

def run_regex_detection(lines):
    findings = []

    for i, line in enumerate(lines):
        for key, pattern in patterns.items():
            match = re.search(pattern, line, re.IGNORECASE)

            if match:
                value = match.group(1) if match.groups() else match.group(0)

                findings.append({
                    "type": key,
                    "value": value,
                    "line": i + 1,
                    "risk": get_risk(key)
                })

    return findings


def get_risk(key):
    if key == "password":
        return "critical"
    if key in ["api_key", "token", "generic_token", "phone"]:
        return "high"
    return "low"