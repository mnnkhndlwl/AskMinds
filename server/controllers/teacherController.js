const TeachSign = require('../models/signIn');
const Doubt = require('../models/doubts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const existingUser = await TeachSign.findOne({ email });
  
      if (existingUser) {
        return res.status(401).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newLogin = new TeachSign({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
  
      await newLogin.save();
      const insertedId = newLogin._id;
      console.log(insertedId);
      const token = jwt.sign({ userId: newLogin._id }, process.env.JWT_SECRET_KEY);
      res.status(200).json({ insertedId, message: 'User registered successfully',token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error during sign up' });
    }
  };

  const logIn = async(req,res)=>{
    try{
      const {email,password} = req.body;
      const user = await TeachSign.findOne({email:email});
      if(!user){
        console.log("not found");
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      const check = bcrypt.compare(password,user.password);
      if(!check){
        return res.status(401).json({success:false, message:'wrong password'});
      }
      const name = user.firstName;
      const insertedId = user._id;
      // console.log(insertedId);
      console.log("succesful");
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
      res.status(200).json({insertedId,message:"logged in succesfully",name,token})
    }
    catch(err){
      return res.status(400).json({message:'error during login'})
    }
  }

  const getDoubts = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await TeachSign.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      const filteredDoubts = await Doubt.find({
        studentClass: user.classs,
        subject: user.subject
      });
  
      res.status(200).json(filteredDoubts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  const accepted = async (req, res) => {
    const {doubtId} = req.body;
    console.log(doubtId);
  
    try {
      // Check if the doubt is already accepted
      const existingDoubt = await Doubt.findById(doubtId);
  
      if (!existingDoubt) {
        return res.status(404).json({ message: 'Doubt not found' });
      }
  
      if (existingDoubt.accepted) {
        return res.status(400).json({ message: 'Doubt already accepted' });
      }
  
      // Mark the doubt as accepted
      const result = await Doubt.findByIdAndUpdate(doubtId, { accepted: true });
  
      if (!result) {
        return res.status(404).json({ message: 'Doubt not found' });
      }
  
      res.status(200).json({ message: 'Doubt accepted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  const update = async (req, res) => {
    try {
      const {teacherId, subject: subject, classs: studentClass } = req.body;
  
      // Find the user by ID
      const user = await TeachSign.findById(teacherId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update subject and class
      user.subject = subject 
      user.classs = studentClass 
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user information' });
    }
  }

  const information = async (req, res) => {
    try {
      const {id} = req.params;
      const user = await TeachSign.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
  
      const { classs, subject } = user;
      res.status(200).json({ classs, subject, message: 'successfully retrieved' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting user information' });
    }
  }

  module.exports = { signIn, logIn , getDoubts , accepted , update , information };