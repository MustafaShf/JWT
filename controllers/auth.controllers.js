const express = require("express");
const userModel = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//jwt function
const createToken = (userId) => {
  const payload = {
    id: userId, // Payload could contain user data
  };

  const secretKey = process.env.JWT_SECRET || "yourSecretKey"; // Secret key for signing the token
  const options = {
    expiresIn: "1h", // Token expiration time (optional)
  };

  // Create the JWT token
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

// Render Signup Page
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

// Render Login Page
module.exports.login_get = (req, res) => {
  res.render("login");
};

// Handle Signup
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const user = await userModel.create({
      email,
      password: hashedPassword,
    });

    console.log("User signed up:", user);
    res.redirect("/home");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("An error occurred during signup.");
  }
};

// Handle Login
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
      return res.status(404).send("User not found");
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).send("Invalid credentials");
    }
    //jwt token creation + giving it to cookie
    let userId = foundUser.id;
    const token = createToken(userId);
    res.cookie("token", token, { httpOnly: true });
    //const token = createToken(foundUser.id);

    // console.log("User logged in:", foundUser);
    res.redirect("/home"); // Redirect to home on successful login
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred during login.");
  }
};

// Render Home Page
module.exports.home_get = (req, res) => {
  res.render("home", { user: req.user });
};

module.exports.logout_get = (req, res) => {
  res.clearCookie("token");
  res.send("Your account has been logged out. Please wait a moment.");
  
};
