const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();

const prisma = new PrismaClient();

//Register
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username ,
        email,
        password :hashPass
      },
 });
    

    const {password,isAdmin,...other}=newUser

    res.status(200).json(other);
  } catch (error) {
    console.log("error handling");
    next(error);
  }
});

//Login
router.post("/login", async (req, res,next) => {
  try {
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRETE
    );
  } catch (error) {
    next(error);
  }
});

//Logout
router.post("/logout", async (req, res,next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
