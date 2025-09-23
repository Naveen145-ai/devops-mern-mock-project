const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const tasksRoute = require('./routes/tasks');
app.use('/api/tasks', tasksRoute);

// Only connect to MongoDB and start the server when not in test environment
let server;
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGO_URI, {
      // Note: these options are deprecated in Mongoose 6+/MongoDB driver 4+
      // Kept for backward compatibility if your env uses older versions.
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { app, server }
