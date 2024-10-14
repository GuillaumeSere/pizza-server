const express = require('express');
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body

    const newUser = new User({name, email, password})

    try {
        newUser.save()
        res.send('User Register successfully')
    } catch (error) {
        return res.status(400).json({message: error});
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.find({email, password})

        if (user.length > 0){

          const currentUser = {
            name: user[0].name,
            email: user[0].email,
            isAdmin: user[0].isAdmin,
            _id: user[0]._id
          }
          res.send(currentUser)
        }else{
            return res.status(400).json({ message: 'User login failed'})
        }
    } catch (error) {
        return res.status(400).json({message: error});
    }
})

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