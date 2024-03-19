const Doubt = require('../models/doubts');
const StudentSign = require('../models/signStud');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const postDoubt = async (req, res) => {
  const { doubtText, studentClass, subject, studName, studentId } = req.body;

  if (!doubtText || !studentClass || !subject) {
    return res
      .status(400)
      .json({ error: " doubtText, studentClass, and subject are required." });
  }

  try {
    const newDoubt = new Doubt({
      // studentName,
      doubtText,
      studentClass,
      subject,
      studName,
      studentId,
    });

    const savedDoubt = await newDoubt.save();
    const insertedId = newDoubt._id;
    res.status(201).json({ savedDoubt, insertedId, studName });
  } catch (err) {
        res.status(500).json({ error: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await StudentSign.findOne({ email });

    if (existingUser) {
      return res.status(401).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newLogin = new StudentSign({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newLogin.save();
    const insertedId = newLogin._id;
    console.log(insertedId);
    const token = jwt.sign(
      { userId: newLogin._id },
      process.env.JWT_SECRET_KEY
    );
    res
      .status(200)
      .json({ insertedId, message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during sign up" });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await StudentSign.findOne({ email: email });
    if (!user) {
      console.log("not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const check = bcrypt.compare(password, user.password);
    if (!check) {
      return res
        .status(401)
        .json({ success: false, message: "wrong password" });
    }
    const name = user.firstName;
    const insertedId = user._id;
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
    res
      .status(200)
      .json({ insertedId, message: "logged in succesfully", token, name });
  } catch (err) {
    return res.status(400).json({ message: "error during login" });
  }
};

module.exports = {postDoubt,signIn , logIn}