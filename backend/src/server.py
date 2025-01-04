import os
import sys
from datetime import datetime
from contextlib import asynccontextmanager
from pydantic import BaseModel

from bson import ObjectId
from fastapi import FastAPI, Depends, Request
from motor.motor_asyncio import AsyncIOMotorClient
import uvicorn

from dal import ToDoDAL
from dotenv import load_dotenv
from routes.lists import router as lists_router
from routes.items import router as items_router

load_dotenv()
COLLECTION_NAME = "todo_lists"
MONGODB_URI = os.getenv("MONGODB_URI")
DEBUG = os.environ.get("DEBUG", "").strip().lower() in {"1", "true", "on", "yes"}

@asynccontextmanager
async def lifespan(app: FastAPI):
    client = AsyncIOMotorClient(MONGODB_URI)
    database = client.get_default_database()
    try:
        pong = await database.command("ping")
        if int(pong["ok"]) != 1:
            raise Exception("Cluster connection is not okay!")

        todo_lists = database.get_collection(COLLECTION_NAME)
        app.state.todo_dal = ToDoDAL(todo_lists)

        yield
    except Exception as e:
        print(f"Error during lifespan startup: {e}", file=sys.stderr)
        raise
    finally:
        client.close()

def get_todo_dal(request: Request) -> ToDoDAL:
    return app.state.todo_dal

app = FastAPI(lifespan=lifespan, debug=DEBUG)

# Add the routes to the app
app.include_router(lists_router, prefix="/api/lists", dependencies=[Depends(get_todo_dal)])
app.include_router(items_router, prefix="/api/lists", dependencies=[Depends(get_todo_dal)])

# Add a dummy route to test the server
class DummyResponse(BaseModel):
    id : str
    when: datetime

@app.get("/api/dummy")
async def get_dummy() -> DummyResponse:
    return DummyResponse(
        id = str(ObjectId()),
        when = datetime.now()
    )

def main(argv = sys.argv[1:]):
    try:
        uvicorn.run("server:app", host="0.0.0.0", port=3001, reload=DEBUG )
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()