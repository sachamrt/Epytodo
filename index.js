const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const app = express();
const middleware = require('./src/middleware/auth.js');
const cors = require("cors");

dotenv.config();
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: '3306',
  password: "root",
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connexion réussie à la base de données");
  }
});

app.locals.connection = connection;
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(middleware);
require('./src/routes/auth/auth.js')(app);
require('./src/routes/user/user.js')(app);
require('./src/routes/todos/todos.js')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});