# Overwiew

This project is a todo list application (CRUD) with a simple interface. It has two parts: the frontend and the backend. The frontend is built with React and the backend is built with Python using FastAPI and it uses a MongoDB database to store the data.

make sure before you use the app create a MongoDB database and to create a connection string to your database and add it to the `.env` file (see the `.env.example` file for an example), also make sure to allow the IP address of the server where the app is running to access the database.

There are two README files in this project, one for the frontend and one for the backend. You can find them in the `frontend` and `backend` directories. They contain more information about what each part of the project does and how to run them separately.

## How to run the app

Run the following command from the root directory of the project (docker must be installed and running on your machine):

```bash
docker-compose -f compose.yaml up -d --build
```

Check the status of the services with the following command:

```bash
docker-compose ps
```
You should see 3 services running: `frontend`, `backend`, and `nginx` in up status.

Open your browser and visit `http://localhost:8080` to see the app running.

You can check the logs of the services with the following command:

```bash
docker-compose logs frontend
docker-compose logs backend
docker-compose logs nginx
```

To stop the services run the following command:

```bash
docker-compose down
```

It takes about 1 minute and a half to two minutes for the services to start, so if you see an error Bad Gateway when you visit `http://localhost:8080` wait a little bit and refresh the page.

make sure to put the right connection string to your MongoDB database in the `.env.example` file and rename it to `.env` before running the app.