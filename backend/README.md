# Todo Backend

This is the backend of the Todo application (CRUD app). It is a RESTful API built with FastAPI and it uses MongoDB as a database.

`models.py` : contains the data structure we use to store the data in MongoDB database, we have ToDoList which is a list of ToDoListItem objects. Each ToDoListItem corresponds to a task that needs to be done. And we also have ListSummary which is a summary of the ToDoList.

`dal.py` : contains the data access layer which is responsible of all the database operations. It has a method to converts a MongoDB document into a ListSummary object,
and a class that contains all the methods to interact with the database (Create a new to-do list with a given name, Retrieve a to-do list by its ID, Delete a to-do list by its ID, Add a new item to a to-do list, Update the checked state of a to-do item, Remove an item from a to-do list).

`routes/`: Contains the routes of the API:

- `items.py`: contains the routes to interact with the items of the to-do list (create a new item, update as checked, delete an item).
- `lists.py`: contains the routes to interact with the to-do lists (create a new list, get a list by its ID, delete a list by its ID and get all the lists).

`requirements.txt`: contains the dependencies of the project (python libraries).

`Dockerfile`: contains the instructions to build the Docker image of the backend.

`venv/`: contains the virtual environment of the project.

`docker-compose-back.yaml`: contains the instructions to run the backend in a Docker container.

First go the the backend directory then create a virtual environment :
```bash
python -m venv venv
venv\Scripts\activate
```
Or using conda (if you have it installed):
```bash
conda create --name myenv
conda activate myenv
```

Then install the dependencies with the following command:
```bash
pip install -r requirements.txt
```

Then go to the directory 'src' and run the following command to start the server:
```bash
uvicorn server:app --reload
```
Or 
```bash
python server.py    
```
## Using Docker
You can run the backend using Docker. To do so, ensure that Docker is installed on your machine and ensure you have a .env file with the MONGODB_URI variable set to your MongoDB URI.

Then go to the backend directory and run the following command to build the image:
```bash
docker-compose -f docker-compose-back.yaml up -d
```
This command will build the image and run the container in detached mode.

Then check the container is running by running the following command:
```bash
docker ps
```
you should see the name of the container you created (plus the time it was created and its ID).

then you can send requests to the backend at 'http://localhost:3001/' + the route you want to access (they are all listed in the routes directory), plus there is a test route at 'http://localhost:3001/api/dummy' that should return a result similar to this:
```json
{
    "id": "67781ea677132bc3adc4b1de",
    "when": "the time you sent the request",
}
```
if you need to shut down the container you can run the following command:
```bash
docker-compose -f docker-compose-back.yaml down
```
To start the services again you can run the following command:
```bash
docker-compose -f docker-compose-back.yaml up -d
```

Avoid stopping and starting the container with `docker start and stop` commands as it is managed by docker-compose use docker-compose commands instead.









