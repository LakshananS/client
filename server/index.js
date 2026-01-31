const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

// Create expenses table
db.run(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount REAL NOT NULL
  )
`, (err) => {
    if (err) {
        console.error("Error creating table:", err.message);
    } else {
        console.log("Expenses table ready");
    }
});

// Get all expenses
app.get("/expenses", (req, res) => {
    db.all("SELECT * FROM expenses", [], (err, rows) => {
        if (err) {
            console.error("Error fetching expenses:", err.message);
            return res.status(500).json({ error: "Failed to fetch expenses" });
        }
        res.json(rows);
    });
});

// Add new expense
app.post("/expenses", (req, res) => {
    const { title, amount } = req.body;

    if (!title || !amount) {
        return res.status(400).json({ error: "Title and amount are required" });
    }

    db.run(
        "INSERT INTO expenses (title, amount) VALUES (?, ?)",
        [title, amount],
        function (err) {
            if (err) {
                console.error("Error adding expense:", err.message);
                return res.status(500).json({ error: "Failed to add expense" });
            }
            res.status(201).json({ id: this.lastID, title, amount });
        }
    );
});

// Delete expense
app.delete("/expenses/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM expenses WHERE id = ?", [id], function (err) {
        if (err) {
            console.error("Error deleting expense:", err.message);
            return res.status(500).json({ error: "Failed to delete expense" });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Expense not found" });
        }
        res.json({ message: "Expense deleted successfully" });
    });
});

// Update expense
app.put("/expenses/:id", (req, res) => {
    const { id } = req.params;
    const { title, amount } = req.body;

    if (!title || !amount) {
        return res.status(400).json({ error: "Title and amount are required" });
    }

    db.run(
        "UPDATE expenses SET title = ?, amount = ? WHERE id = ?",
        [title, amount, id],
        function (err) {
            if (err) {
                console.error("Error updating expense:", err.message);
                return res.status(500).json({ error: "Failed to update expense" });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: "Expense not found" });
            }
            res.json({ id, title, amount });
        }
    );
});

// Use PORT environment variable for deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access at: http://localhost:${PORT}`);
});
