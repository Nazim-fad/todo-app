import { useRef, useEffect, useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import axios from "axios";

function ToDoList({ listId, handleBackButton }) {
    const labelRef = useRef();
    const [listData, setListData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/lists/${listId}`);
                setListData(response.data);
            } catch (err) {
                console.error("Error fetching list data:", err);
                setError("Failed to fetch list data.");
            }
        };
        fetchData();
    }, [listId]);

    const handleCreateItem = async (label) => {
        if (!label.trim()) {
            alert("Item label cannot be empty.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`/api/lists/${listData.id}/items`, {
                label: label.trim(),
            });
            setListData(response.data);
            labelRef.current.value = "";
        } catch (err) {
            console.error("Error creating item:", err);
            alert("Failed to create item.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`/api/lists/${listData.id}/items/${id}`);
            setListData(response.data);
        } catch (err) {
            console.error("Error deleting item:", err);
            alert("Failed to delete item.");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckToggle = async (itemId, newState) => {
        setLoading(true);
        try {
            const response = await axios.patch(
                `/api/lists/${listData.id}/items/checked_state`,
                {
                    item_id: itemId,
                    checked_state: newState,
                }
            );
            setListData(response.data);
        } catch (err) {
            console.error("Error toggling item state:", err);
            alert("Failed to update item state.");
        } finally {
            setLoading(false);
        }
    };

    if (listData === null) {
        return (
            <div className="container mt-4">
                <button className="btn btn-secondary mb-3" onClick={handleBackButton}>
                    Back
                </button>
                <div className="alert alert-info">
                    {error ? error : "Loading to-do list..."}
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={handleBackButton}>
                Back
            </button>
            <h1 className="mb-4">{listData.name}</h1>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="input-group mb-3">
                <input
                    ref={labelRef}
                    type="text"
                    className="form-control"
                    placeholder="New Item"
                />
                <button
                    className="btn btn-primary"
                    disabled={loading}
                    onClick={() => handleCreateItem(labelRef.current.value)}
                >
                    Add
                </button>
            </div>

            {listData.items.length > 0 ? (
                <ul className="list-group">
                    {listData.items.map((item) => (
                        <li
                            key={item.id}
                            className={`list-group-item d-flex align-items-center ${
                                item.checked ? "list-group-item-success" : ""
                            }`}
                        >
                            <span
                                className="me-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleCheckToggle(item.id, !item.checked)}
                            >
                                {item.checked ? "✅" : "⬜️"}
                            </span>
                            <span className="flex-grow-1">{item.label}</span>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={(evt) => {
                                    evt.stopPropagation();
                                    handleDeleteItem(item.id);
                                }}
                            >
                                <BiSolidTrash />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="alert alert-warning mt-3">No items in this list.</div>
            )}
        </div>
    );
}

export default ToDoList;
