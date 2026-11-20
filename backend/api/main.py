from fastapi import FastAPI

from backend.api.routes import router

app = FastAPI(title="Company Intel API")
app.include_router(router)
