import { useRef } from "react";
import { BiSolidTrash } from "react-icons/bi";

function ListToDoLists({
    listSummaries,
    handleSelectList,
    handleNewToDoList,
    handleDeleteToDoList,
}) {
    const labelRef = useRef();

    const handleAddNewList = async () => {
        const newName = labelRef.current.value.trim();
        if (newName === "") {
            alert("List name cannot be empty.");
            return;
        }
        try {
            await handleNewToDoList(newName); 
            labelRef.current.value = ""; 
        } catch (err) {
            console.error("Error creating list:", err);
        }
    };

    if (listSummaries === null) {
        return (
            <div className="container mt-4">
                <div className="alert alert-info">Loading to-do lists...</div>
            </div>
        );
    } else if (listSummaries.length === 0) {
        return (
            <div className="container mt-4">
                <div className="mb-3">
                    <div className="input-group">
                        <input
                            ref={labelRef}
                            type="text"
                            className="form-control"
                            placeholder="New to-do list name"
                        />
                        <button className="btn btn-primary" onClick={handleAddNewList}>
                            Add
                        </button>
                    </div>
                </div>
                <div className="alert alert-warning">There are no to-do lists!</div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">All To-Do Lists</h1>
            <div className="mb-3">
                <div className="input-group">
                    <input
                        ref={labelRef}
                        type="text"
                        className="form-control"
                        placeholder="New to-do list name"
                    />
                    <button className="btn btn-primary" onClick={handleAddNewList}>
                        Add
                    </button>
                </div>
            </div>
            <ul className="list-group">
                {listSummaries.map((summary) => (
                    <li
                        key={summary.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSelectList(summary.id)}
                    >
                        <span>{summary.name}</span>
                        <span className="badge bg-secondary rounded-pill">
                            {summary.item_count} items
                        </span>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={(evt) => {
                                evt.stopPropagation();
                                handleDeleteToDoList(summary.id);
                            }}
                        >
                            <BiSolidTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListToDoLists;
