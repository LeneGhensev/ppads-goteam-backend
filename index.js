const express = require("express");
const routes = require("./routes");
const database = require("./models");
var cors = require("cors");
require('dotenv').config();


const app = express();
const port = process.env.PORT;

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

routes(app);
database.sequelize.sync({ alter: false, force: false });

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
