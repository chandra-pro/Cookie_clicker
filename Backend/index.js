const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./db/index");
const bodyParser = require("body-parser");

const handleClick = require('./jobs/handleClick');
const getUserInfo = require("./jobs/getUserInfo");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

//route
app.get("/", async (req, res) => {
  res.send("hello");
});


// Endpoint to handle button click
app.post('/click', async (req, res) => {
    const { userId } = req.body; 
    const result = await handleClick(userId); 
    res.json(result);
  });
  
  // Endpoint to get user data
  app.get('/user/:userId', async (req, res) => {
    const { userId } = req.params; 
    const userData = await getUserInfo(userId); 
    res.json(userData);
  });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log("MONGO db connection failed !!! ", err);
  });