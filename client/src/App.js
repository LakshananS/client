import { useEffect, useState } from "react";
import "./App.css";

function App() {
const [expenses, setExpenses] = useState([]);
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const loadExpenses = () => {
fetch("http://localhost:5000/expenses")
.then(res => res.json())
.then(data => setExpenses(data));
};
useEffect(() => {
loadExpenses();
}, []);
const addExpense = () => {
fetch("http://localhost:5000/expenses", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ title, amount })
}).then(() => {
setTitle("");
setAmount("");
loadExpenses();
});
};
return (
<div className="container">
<h1>Expense Tracker</h1>
<input
placeholder="Expense Title"
value={title}
onChange={e => setTitle(e.target.value)}
/>
<input
type="number"
placeholder="Amount"
value={amount}
onChange={e => setAmount(e.target.value)}
/>
<button onClick={addExpense}>Add Expense</button>
<ul>
{expenses.map(exp => (
<li key={exp.id}>
{exp.title} - ${exp.amount}
</li>
))}
</ul>
</div>
);
}
export default App;
