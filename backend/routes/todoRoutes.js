const express = require("express");
const {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
} = require("../controllers/todoController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.use(auth);
router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id/toggle", toggleTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
