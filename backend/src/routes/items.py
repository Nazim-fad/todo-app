from fastapi import APIRouter, status, Request
from pydantic import BaseModel
from dal import ToDoDAL, ToDoList

router = APIRouter()

class NewItem(BaseModel):
    label: str

class ToDoItemUpdate(BaseModel):
    item_id: str
    checked_state: bool

@router.post("/{list_id}/items", status_code=status.HTTP_201_CREATED, response_model=ToDoList)
async def create_item(request: Request, list_id: str, new_item: NewItem) -> ToDoList:
    todo_dal: ToDoDAL = request.app.state.todo_dal
    return await todo_dal.create_item(list_id, new_item.label)

@router.delete("/{list_id}/items/{item_id}", response_model=ToDoList)
async def delete_item(request: Request, list_id: str, item_id: str) -> ToDoList:
    todo_dal: ToDoDAL = request.app.state.todo_dal
    return await todo_dal.delete_item(list_id, item_id)

@router.patch("/{list_id}/items/checked_state", response_model=ToDoList)
async def set_checked_state(
    request: Request, list_id: str, update: ToDoItemUpdate
) -> ToDoList:
    todo_dal: ToDoDAL = request.app.state.todo_dal
    return await todo_dal.set_checked_state(list_id, update.item_id, update.checked_state)
