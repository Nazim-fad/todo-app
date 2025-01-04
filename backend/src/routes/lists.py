from fastapi import APIRouter, status, Request
from pydantic import BaseModel
from dal import ToDoDAL
from models import ListSummary, ToDoList

router = APIRouter()

class NewList(BaseModel):
    name: str

class NewListResponse(BaseModel):
    id: str
    name: str

@router.get("/", response_model=list[ListSummary])
async def get_all_lists(request: Request) -> list[ListSummary]:
    todo_dal: ToDoDAL = request.app.state.todo_dal
    return await todo_dal.list_todo_lists()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=NewListResponse)
async def create_todo_list(request: Request, new_list: NewList) -> NewListResponse:
    todo_dal: ToDoDAL = request.app.state.todo_dal
    return NewListResponse(
        id=await todo_dal.create_todo_list(new_list.name),
        name=new_list.name,
    )

@router.get("/{list_id}", response_model=ToDoList)
async def get_list(list_id: str, request: Request) -> ToDoList:
    todo_dal: ToDoDAL = request.app.state.todo_dal
    return await todo_dal.get_todo_list(list_id)

@router.delete("/{list_id}", response_model=bool)
async def delete_list(list_id: str,request: Request) -> bool:
    todo_dal: ToDoDAL = request.app.state.todo_dal
    return await todo_dal.delete_todo_list(list_id)



