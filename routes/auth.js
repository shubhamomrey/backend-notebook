const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = 'Harryisagoodb$oy';
//Route 1: creating a user POST "api/auth/createuser". no login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 5 words").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors, return bad request and the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success , errors: errors.array() });
    }
    //  check whether the user with same email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "User already exists" });
      }
      // for secure password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data ={
        user:{
          id: user.id
        }
      }
     const authtoken = jwt.sign(data, JWT_SECRET)
    
     // res.json(user);
     success = true
     res.json({ success, authtoken })
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);
//Route 2: Authenticate a user using POST "api/auth/login" method
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors, return bad request and the error message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try{
      let user = await User.findOne({email})
      if(!user){
        success = false;
        return res.status(400).json({error: "Please try to login with correct credentials."});
      }
      let passwordCompare = await bcrypt.compare(password, user.password)
      if(!passwordCompare){
        success = false;
        return res.status(400).json({ success, error: "Please try to login with correct credentials."});
      }
      const data ={
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      success = true
      res.json({success, authtoken})
    } catch (error){
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
})

// Route 3: Get login information using POST "api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Server Error");
}
})
module.exports = router;
