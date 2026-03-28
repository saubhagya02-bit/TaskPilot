const db = require("../config/db");

exports.getTask = (req, res) => {
  const sql = "SELECT id, title, completed, date FROM tasks";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);

    res.json(result);
  });
};
exports.createTask = (req, res) => {
  const { title, completed, date } = req.body;

  const sql = "INSERT INTO tasks (title, completed, date) VALUES (?, ?, ?)";

  db.query(sql, [title, completed, date], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ message: "Task created" });
  });
};

exports.updateTask = (req, res) => {
  const id = req.params.id;
  const { title, completed } = req.body;

  const sql = "UPDATE tasks SET title = ?, completed = ? WHERE id = ?";

  db.query(sql, [title, completed, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ message: "Task updated successfully" });
  });
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM tasks WHERE id=?", [id]);
  res.json({ message: "Task deleted" });
};
