const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middlewares/requireAuth");
const { checkRole } = require("../middlewares/checkRole");
const twilio = require('twilio');


const config = require('../config');

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Bienvenue sur la page d'accueil");
});

router.get("/register", (req, res) => {
  res.send("Bienvenue sur la page d'inscription");
});

//-------------------------- Register -----------------------------------//
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  const client = new twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);



  try {
    const user = await User.create({ email, password, role });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 864000 });
    res.json({ token });

    /****************** SMS *********************/
    // Use the client to send an SMS message
  client.messages.create({
    body: 'Welcome to our Web Application, you have successfully registred!',
    to: '+21697121266', // the recipient's phone number
    from: '+18087360181' // your Twilio phone number
  })
  .then(message =>{
  console.log(`SMS message sent to ${message.to}: ${message.body}`);
  res.status(200).json('Registration complete!');
  })
  .catch(error => {
    console.error(`Failed to send SMS message: ${error}`);
    res.status(500).json('Registration failed!');
  });

  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ errorMessage: "Email already in use" });
    } else {
      res.status(500).json({ errorMessage: "Server error" });
    }
  }
});

router.get("/profile", requireAuth,function (req, res)  {
  const token = req.cookies.jwt;
  console.log("token:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      res.json("bbb");
    } else {
      const userId = decodedToken.userId;
      console.log("User ID from token:", userId);

      User.findById(userId)
        .then((user) => {
          if (!user) {
            console.log("User not found");
            res.json("User not found");
          } else {
            console.log("User found:", user);
            res.render('profile.ejs', { user: user });
          }
        })
        .catch((err) => {
          console.error(err);
          res.json("aaaaa");
        });
    }
  });


});



router.get("/login", (req, res) => {
  res.send("Bienvenue sur la page de connexion");
});

router.post("/login", async (req, res) => {
  const { email, password ,role} = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ errorMessage: "L'adresse email ou le mot de passe est incorrect." });
    } else {
      const isPasswordCorrect = await user.isValidPassword(password);
      if (!isPasswordCorrect) {
        res.status(400).json({ errorMessage: "L'adresse email ou le mot de passe est incorrect." });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: 864000 });
        res.json({ token });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: "Requête invalide." });
  }
});

router.get("/profileformateur", requireAuth, checkRole("formateur"), (req, res) => {
  // Si l'utilisateur est authentifié et a le rôle de formateur,
  // il peut accéder à la route /profileformateur
  res.send("Bienvenue sur votre profil de formateur");
});

router.delete("/deactivate-account/:userId", requireAuth, async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      res.status(403).json({ errorMessage: "You do not have the necessary permissions to perform this action." });
    } else {
      const userId = req.params.userId;
      await User.findByIdAndUpdate(userId, { isActive: false });
      res.json({ message: "The account has been successfully deactivated." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "An error occurred while processing your request." });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = router;
