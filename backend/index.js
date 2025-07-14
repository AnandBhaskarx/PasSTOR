require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Password = require('./models/password');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_STRING)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Mongo Error:", err));


app.post('/add', async (req, res) => {
  const { site, username, password } = req.body;
  const newPassword = new Password({ site, username, password });
  await newPassword.save();
  res.json({ message: 'Saved!' });
});

app.get('/all', async (req, res) => {
  const passwords = await Password.find();
  res.json(passwords);
});

app.delete('/delete/:id', async (req, res) => {
  await Password.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted!' });
});

// ✅ Run server
app.listen(5000, () => console.log('Server started on port 5000'));

app.put('/update/:id', async (req, res) => {
  const { site, username, password } = req.body;

  try {
    await Password.findByIdAndUpdate(req.params.id, {
      site,
      username,
      password
    });
    res.json({ message: 'Updated!' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

