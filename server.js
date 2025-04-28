const express = require("express");
const cors = require("cors");
const Pizza = require("./models/pizzaModel");
const app = express();
const mongoose = require("./db");
const path = require('path');

// Configuration des variables d'environnement
const port = process.env.PORT || 8000;
const host = 'localhost';

// Middleware pour le logging
app.use((req, res, next) => {
    console.log(`Requête reçue: ${req.method} ${req.url}`);
    console.log('Origin:', req.headers.origin);
    next();
});

// Configuration CORS
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        const allowedOrigins = process.env.FRONTEND_URL || 'http://localhost:3000';
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Non autorisé par CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Routes
const pizzasRoute = require("./routes/pizzasRoute");
const userRoute = require("./routes/userRoute");
const ordersRoute = require("./routes/ordersRoute");

app.use('/pizzas/', pizzasRoute);
app.use('/users/', userRoute);
app.use('/orders/', ordersRoute);

app.get("/", (req, res) => {
    res.send("Server working 🔥" + port);
});

// Démarrage du serveur
app.listen(port, host, (err) => {
    if(err) {
        console.error(`Erreur lors du démarrage du serveur : ${err}`);
    } else {
        console.log(`Le serveur fonctionne sur http://${host}:${port} 🔥`);
    }
});
