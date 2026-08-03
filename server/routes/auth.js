const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

let db;

router.setDB = (database) => {
  db = database;
};


// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await db.get(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );


    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }


    const validPassword = await bcrypt.compare(
      password,
      user.password
    );


    if (!validPassword) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }


    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      "secretkey"
    );


    res.json({
      message: "Login successful",
      token
    });


  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


module.exports = router;
