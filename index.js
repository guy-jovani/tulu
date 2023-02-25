require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const notesRoutes = require('./api/notes/notes.routes');
const errorHandler = require('./middleware/errorHandler.middleware');
const pgClient = require('./pgCLient');
const app = express();

app.use(bodyParser.json());
app.use('/notes', notesRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = require('http').createServer(app);

pgClient
  .connect()
  .then(() => {
    server.listen(PORT, () => {
      console.log('started');
    });
  })
  .catch((err) => {
    console.log("couldn't connect to db");
  });
