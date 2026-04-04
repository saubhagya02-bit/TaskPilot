import db from "../config/db.js";

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const [tasks] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create task
export const createTask = async (req, res) => {
  try {
    const { title, completed, date } = req.body;
    const userId = req.user.id; 

    await db.query(
      "INSERT INTO tasks (title, completed, date, user_id) VALUES (?, ?, ?, ?)",
      [title, completed, date, userId] 
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
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};