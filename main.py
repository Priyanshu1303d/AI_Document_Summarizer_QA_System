import os
import uvicorn
from dotenv import load_dotenv

# Load .env before anything else
load_dotenv()

def run():
    """
    Entry point for your backend server.
    Uses uvicorn to run FastAPI app cleanly.
    """
    host = os.getenv("APP_HOST", "0.0.0.0")
    port = int(os.getenv("APP_PORT", 8000))
    debug = os.getenv("DEBUG", "true").lower() == "true"

    print("=======================================")
    print("   🚀 AI Document Summarizer Backend   ")
    print("=======================================")
    print(f"Host: {host}")
    print(f"Port: {port}")
    print(f"Debug mode: {debug}")
    print("Starting server...\n")

    uvicorn.run(
        "app:app",
        host=host,
        port=port,
        reload=debug,
        log_level="info",
        timeout_keep_alive=120,
    )


if __name__ == "__main__":
    run()
