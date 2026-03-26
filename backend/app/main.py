from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(title="AI Secure Data Intelligence Platform")

app.include_router(router)