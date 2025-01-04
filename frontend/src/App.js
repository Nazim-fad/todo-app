import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ListToDoLists from "./ListToDoLists";
import ToDoList from "./ToDoList";

function App() {
    const [listSummaries, setListSummaries] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        reloadData();
    }, []);

    async function reloadData() {
        try {
            const response = await axios.get("/api/lists/");
            setListSummaries(response.data);
        } catch (err) {
            console.error("Error fetching lists:", err);
            alert("Failed to load lists. Please try again later.");
        }
    }

    async function handleNewToDoList(newName) {
        if (!newName.trim()) {
            alert("List name cannot be empty.");
            return;
        }
        try {
            await axios.post("/api/lists/", { name: newName.trim() });
            reloadData();
        } catch (err) {
            console.error("Error creating new list:", err);
            alert("Failed to create a new list. Please try again.");
        }
    }

    async function handleDeleteToDoList(id) {
        try {
            await axios.delete(`/api/lists/${id}`);
            reloadData();
        } catch (err) {
            console.error("Error deleting list:", err);
            alert("Failed to delete the list. Please try again.");
        }
    }

    function handleSelectList(id) {
        console.log("Selecting item", id);
        setSelectedItem(id);
    }

    function backToList() {
        setSelectedItem(null);
        reloadData();
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">To-Do Application</h1>
            {selectedItem === null ? (
                <ListToDoLists
                    listSummaries={listSummaries}
                    handleSelectList={handleSelectList}
                    handleNewToDoList={handleNewToDoList}
                    handleDeleteToDoList={handleDeleteToDoList}
                />
            ) : (
                <ToDoList listId={selectedItem} handleBackButton={backToList} />
            )}
        </div>
    );
}

export default App;
