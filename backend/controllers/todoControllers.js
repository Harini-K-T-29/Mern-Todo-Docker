import Todo from "../models/Todo.js";

// create an item
export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      throw new Error("Please fill out title and description");
    }
    const newTodo = await Todo.create({ title, description });
    res.status(201).json({
      success: true,
      data: newTodo,
      message: "Todo created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// get all items
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({
      success: true,
      data: todos,
      message: "Todos fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update items
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const todo = await Todo.findById(id);
    todo.title = title;
    todo.description = description;
    const updatedTodo = await todo.save();
    res.status(200).json({
      success: true,
      data: updatedTodo,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete item
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: deletedTodo,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
