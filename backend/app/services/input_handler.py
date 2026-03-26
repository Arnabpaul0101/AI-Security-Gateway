def handle_input(request):
    if request.input_type in ["text", "log", "chat"]:
        return request.content

    if request.input_type == "sql":
        return request.content

    if request.input_type == "file":
        return request.content

    return request.content