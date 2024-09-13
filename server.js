const express = require("express");
const Pizza = require("./models/pizzaModel");
const app = express();
const db = require("./db");
const cors = require('cors');

app.use(express.json());

// Configuration CORS pour permettre les requêtes provenant de ton frontend
app.use(cors({
    origin: 'http://localhost:3000', // Autorise seulement ton frontend local
    credentials: true, // Si tu as besoin d'envoyer des cookies ou des en-têtes d'authentification
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

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