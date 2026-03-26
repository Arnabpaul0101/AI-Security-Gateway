def run_log_analysis(lines):
    findings = []

    for i, line in enumerate(lines):
        l = line.lower()

        if "error" in l:
            findings.append({
                "type": "error_log",
                "value": line.strip(),
                "line": i + 1,
                "risk": "medium"
            })

        if "exception" in l:
            findings.append({
                "type": "stack_trace",
                "value": line.strip(),
                "line": i + 1,
                "risk": "medium"
            })

        if "failed" in l or "unauthorized" in l or "denied" in l:
            findings.append({
                "type": "auth_failure",
                "value": line.strip(),
                "line": i + 1,
                "risk": "high"
            })

    return findings