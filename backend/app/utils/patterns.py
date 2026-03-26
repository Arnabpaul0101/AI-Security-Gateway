patterns = {
    "email": r"email\s*=\s*([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})",
    "password": r"password\s*=\s*(\S+)",
    "api_key": r"api[_-]?key\s*=\s*(\S+)",
    "phone": r"(?:\+91[-\s]?)?[6-9]\d{9}",
    "token": r"(eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)",
}