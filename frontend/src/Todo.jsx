import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(backendUrl + "/api/v1/todos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch todos");
        return res.json();
      })
      .then((resData) => {
        setTodos(resData.data);
      })
      .catch(() => {
        toast.error("Failed to load todos");
      });
  };

  const handleSubmit = () => {
    if (title.trim() && description.trim()) {
      fetch(backendUrl + "/api/v1/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to add todo");
          return res.json();
        })
        .then((resData) => {
          setTodos([...todos, resData.data]);
          setTitle("");
          setDescription("");
          toast.success("Item added successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("Please fill out title and description");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleCancel = () => {
    setEditId(-1);
    setEditTitle("");
    setEditDescription("");
  };

  const handleUpdate = () => {
    if (editTitle.trim() && editDescription.trim()) {
      fetch(`${backendUrl}/api/v1/todos/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to update");
          return res.json();
        })
        .then((resData) => {
          const updated = todos.map((item) =>
            item._id === editId ? resData.data : item
          );
          setTodos(updated);
          setEditId(-1);
          setEditTitle("");
          setEditDescription("");
          toast.success("Item updated successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } else {
      toast.error("Please fill out title and description");
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      fetch(`${backendUrl}/api/v1/todos/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete");
          return res.json();
        })
        .then(() => {
          const filtered = todos.filter((item) => item._id !== id);
          setTodos(filtered);
          toast.success("Item deleted successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5">
      <Toaster />
      <h1 className="text-2xl font-bold text-center mb-10 md:mb-16 text-green-700">
        MERN Todo Project with Docker
      </h1>

      <div className="flex flex-col md:flex-row gap-4 my-6">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-md"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-md"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <ul className="space-y-4">
        {Array.isArray(todos) &&
          todos.map((item) => (
            <li
              key={item._id}
              className="bg-gray-100 rounded-lg p-4 flex justify-between items-center"
            >
              {editId !== item._id ? (
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-2 flex-1 mr-4">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border rounded-md"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border rounded-md"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </div>
              )}

              <div className="flex gap-2 ml-4">
                {editId !== item._id ? (
                  <>
                    <button
                      className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 cursor-pointer"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600 cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-green-500 px-3 py-1 text-white rounded hover:bg-green-600 cursor-pointer"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                    <button
                      className="bg-gray-400 px-3 py-1 rounded hover:bg-gray-500 cursor-pointer"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;
