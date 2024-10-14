const express = require("express");
const cors = require("cors");
const Pizza = require("./models/pizzaModel");
const app = express();
const db = require("./db");

app.use((req, res, next) => {
    console.log(`Requête reçue: ${req.method} ${req.url}`);
    console.log('Origin:', req.headers.origin);
    next();
  });

// Configuration CORS plus détaillée
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
const host = '0.0.0.0'; // Écoute sur toutes les interfaces réseau

app.listen(port, host, (err) => {
    if(err) {
        console.error(`Erreur lors du démarrage du serveur : ${err}`);
    } else {
        console.log(`Le serveur fonctionne sur http://${host}:${port} 🔥`);
    }
});
