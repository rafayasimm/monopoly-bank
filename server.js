import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let players = [];

// 🟢 Login or Register Player
app.post("/login", (req, res) => {
  const { username } = req.body;
  if (!players.find((p) => p.username === username)) {
    players.push({ username, balance: 1500 }); // default fund
  }
  res.json({ success: true });
});

// 🟡 Get Balance
app.get("/balance/:username", (req, res) => {
  const player = players.find((p) => p.username === req.params.username);
  res.json({ balance: player?.balance || 0 });
});

// 🟣 Get All Players
app.get("/players", (req, res) => {
  res.json(players);
});

// 🟠 Send Money
app.post("/send", (req, res) => {
  const { from, to, amount } = req.body;
  const sender = players.find((p) => p.username === from);
  const receiver = players.find((p) => p.username === to);

  if (sender && receiver && sender.balance >= amount) {
    sender.balance -= amount;
    receiver.balance += amount;
  }

  res.json({ success: true });
});

// 🔵 Take Loan with Interest
app.post("/loan", (req, res) => {
  const { username, amount } = req.body;
  const player = players.find((p) => p.username === username);
  if (player) {
    const interest = amount * 0.1; // 10% interest
    player.balance += amount;
    player.balance -= interest;
  }
  res.json({ success: true });
});

// 🏁 Start Server
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
