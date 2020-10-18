const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbURI = process.env.ATLAS_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () => {
      console.log('Connection to database established successfully');
      console.log(`Server is running on port: ${port}`);
    })
  )
  .catch(err => console.log(err));

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
