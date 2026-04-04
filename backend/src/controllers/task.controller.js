const db = require("../config/db.js");

// Get all tasks
exports.getTask = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, completed, date FROM tasks"
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, completed, date } = req.body;

    await db.query(
      "INSERT INTO tasks (title, completed, date) VALUES (?, ?, ?)",
      [title, completed, date]
    );

    res.json({ message: "Task created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Update task
exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, completed } = req.body;

    await db.query(
      "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
      [title, completed, id]
    );

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};