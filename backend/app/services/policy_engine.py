def apply_policy(risk_level, options):
    if risk_level == "high" and options.get("block_high_risk"):
        return "blocked"

    if options.get("mask"):
        return "masked"

    return "allowed"