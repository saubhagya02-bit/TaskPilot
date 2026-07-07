import db from '../config/db.js';

// Get all tasks (To-Do)
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const [tasks] = await db.query(
      "SELECT * FROM tasks WHERE user_id = ? ORDER BY date ASC",
      [userId],
    );
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create task
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const completed = !!req.body.completed;
    const date = req.body.date || null;
    const userId = req.user.id;

    if (!title || !String(title).trim()) {
      return res.status(400).json({ message: "Title is required" });
    }
    await db.query(
      "INSERT INTO tasks (title, completed, date, user_id) VALUES (?, ?, ?, ?)",
      [String(title).trim(), completed, date, userId],
    );
    res.json({ message: "Task created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const completed = !!req.body.completed;
    const date = req.body.date || null;
    const userId = req.user.id;

    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    if (!title || !String(title).trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const [result] = await db.query(
      "UPDATE tasks SET title = ?, completed = ?, date = ? WHERE id = ? AND user_id = ?",
      [String(title).trim(), completed, date, id, userId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: "Invalid task id" });
    }

    const [result] = await db.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
