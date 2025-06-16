const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const todo = new Todo({ text: req.body.text, user: req.user.id });
  await todo.save();
  res.json(todo);
};

exports.toggleTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id, user: req.user.id });
  res.status(200).json({ message: "Tarea eliminada" });
};
