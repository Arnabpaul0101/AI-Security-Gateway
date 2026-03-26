def mask_sensitive_data(content, findings):
    masked = content

    for f in findings:
        if f["type"] in ["password", "api_key", "email"]:
            if f["value"] in masked:
                masked = masked.replace(f["value"], "******")

    return masked