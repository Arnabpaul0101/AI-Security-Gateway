from app.services.input_handler import handle_input
from app.services.parser import parse_content
from app.services.detection.regex_detector import run_regex_detection
from app.services.detection.log_analyzer import run_log_analysis
from app.services.detection.ai_analyzer import run_ai_analysis
from app.services.risk_engine import calculate_risk
from app.services.policy_engine import apply_policy
from app.services.response_builder import build_response
from app.services.masking_engine import mask_sensitive_data


async def run_pipeline(request):
    content = handle_input(request)
    lines = parse_content(content)

    findings = []
    findings += run_regex_detection(lines)

    if request.options.get("log_analysis", True):
        findings += run_log_analysis(lines)

    ai_output = await run_ai_analysis(content, findings)

    risk_score, risk_level = calculate_risk(findings)

    action = apply_policy(risk_level, request.options)

    masked_content = content
    if request.options.get("mask", True):
        masked_content = mask_sensitive_data(content, findings)
        
    response = build_response(
        content,
        findings,
        risk_score,
        risk_level,
        action,
        ai_output,
        masked_content
    )

    return response