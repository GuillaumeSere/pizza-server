const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({message: 'Cet email est déjà utilisé'});
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Attendre que l'utilisateur soit sauvegardé
        const savedUser = await newUser.save();
        
        // Retourner l'utilisateur sans le mot de passe
        const userResponse = {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            isAdmin: savedUser.isAdmin
        };

        res.status(201).json(userResponse);
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        return res.status(400).json({message: error.message});
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        
        if (user && await bcrypt.compare(password, user.password)) {
            const currentUser = {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            };
            res.json(currentUser);
        } else {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect'});
        }
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        return res.status(400).json({message: error.message});
    }
});

router.get('/getallusers', async (req, res) => {
    console.log("Requête reçue pour getAllUsers");
    try {
        const users = await User.find({}, '-password');
        console.log("Utilisateurs trouvés:", users.length);
        res.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router