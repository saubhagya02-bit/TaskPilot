const db = require("../config/db");

exports.getTask = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM tasks");
  res.json(rows);
};

exports.createTask = async (req, res) => {
  const { title } = req.body;
  await db.query("INSERT INTO tasks (title) VALUES (?)", [title]);
  res.json({ message: "Task created" });
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM tasks WHERE id=?", [id]);
  res.json({ message: "Task deleted" });
};
