const express = require("express");
const authRouter = require("./routes/auth");
const roomRouter = require("./routes/room");
const hotelRouter = require("./routes/hotel");
const userRouter = require("./routes/user");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const app = express();
dotenv.config();
//Midlleware
app.use((err, req, res, next) => {       
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "il ya une erreur";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const cors = require("cors");
app.use(express.json());
app.use(cors())
app.use("/auth", authRouter);
app.use("/room", roomRouter);
app.use("/hotel", hotelRouter);
app.use("/user", userRouter);

app.get("/", async (req, res) => {
  res.send("you are welcome");
  const users = await prisma.user.findMany();
  res.json(users);
});

//Database connection
const prisma = new PrismaClient();

const port = process.env.PORT ||5000;
app.listen(port, () => console.log(`localhost://${port}/`));

// const roomModel = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
  
//   rooms:{
//     type:[String]
//   }
// ,
// roomNumbers: [{ number: Number, unavailableDates: [{ type: Date }] }],

//  });
