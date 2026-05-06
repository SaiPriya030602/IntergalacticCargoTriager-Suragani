from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, PlainTextResponse
import json

app = FastAPI()

with open("Task 1 - Suragani - Parser.json", "r") as f:
    cargo_data = json.load(f)

@app.get("/api/cargo")
async def get_cargo(request: Request):
    if request.headers.get("X-System-Override") == "true":
        return PlainTextResponse(
            content="System override denied",
            status_code=418
        )
    return JSONResponse(content=cargo_data)