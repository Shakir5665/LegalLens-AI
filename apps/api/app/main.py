from fastapi import FastAPI

app = FastAPI(
    title="LegalLens AI API",
    description="Evidence-Grounded Agentic AI Platform for Sri Lankan Legal Research",
    version="0.1.0",
)


@app.get("/health")
async def health_check():
    return {"status": "healthy"}