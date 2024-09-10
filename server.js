const express = require("express");
const Pizza = require("./models/pizzaModel");
const app = express();
const db = require("./db");
const cors = require('cors');

app.use(express.json());

app.use(cors());

const path = require('path')

const pizzasRoute = require("./routes/pizzasRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

app.use(express.static(path.join(__dirname)))

app.use('/pizzas/', pizzasRoute);
app.use('/users/', userRoute);
app.use('/orders/', ordersRoute);

app.get("/", (req, res) => {
    res.send("Server working 🔥" + port);
});


const port = process.env.PORT || 8000;

app.listen(port, () => `Server running on port 🔥`);