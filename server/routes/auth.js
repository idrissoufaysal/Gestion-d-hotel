const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const prisma = new PrismaClient();

//Register
router.post("/register", async (req, res, next) => {
  const { username, email } = req.body;
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPass,
      },
    });

    const { password, isAdmin, ...other } = newUser;

    res.status(200).json(other);
  } catch (error) {
    console.log("error handling");
    next(error);
  }
});

//Login
router.post("/login", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json(`l'utilisateur ${email} n'existe pas`);
    }

    validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json("mot de pass incorrect");
    }
    res.status(200).json("vous etes connete cher "+user.username)

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRETE
    );

  res.cookie("accessToken",token,{
    httpOnly:true,
  })
  .status(200)
  .json("vous etes connete cher "+user.username)

  } catch (error) {
    next(error);
  }
}); 

//Logout
router.post("/logout", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
