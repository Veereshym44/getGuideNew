const express = require('express');
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../key');
const mongoose = require('mongoose');

const User = mongoose.model("User");

router.get('/', (req, res) => {
  res.send("hello");
});

// Signup route for doctors
router.post('/guide-signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password)
    return res.status(422).json({ error: "fill all entries" });

  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.json({ error: "already exist" });
      }
      bcrypt.hash(password, 12)
        .then(hashed_password => {
          const user = new User({
            name,
            email,
            password: hashed_password,
            userType:"guide" 
          });
          user.save()
            .then(user => { res.json({ message: "successfully signed up as doctor" }); })
            .catch(err => { console.log(err) });
        });
    })
    .catch(err => { console.log(err) });
});

// Signup route for users
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password)
    return res.status(422).json({ error: "fill all entries" });

  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.json({ error: "already exist" });
      }
      bcrypt.hash(password, 12)
        .then(hashed_password => {
          const user = new User({
            name,
            email,
            password: hashed_password,
            userType: "user"
          });
          user.save()
            .then(user => { res.json({ message: "successfully signed up as user" }); })
            .catch(err => { console.log(err) });
        });
    })
    .catch(err => { console.log(err) });
});
router.post('/admin-signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password)
    return res.status(422).json({ error: "fill all entries" });

  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res.json({ error: "already exist" });
      }
      bcrypt.hash(password, 12)
        .then(hashed_password => {
          const user = new User({
            name,
            email,
            password: hashed_password,
            userType: "admin" // Set isDoctor to false for users
          });
          user.save()
            .then(user => { res.json({ message: "successfully signed" }); })
            .catch(err => { console.log(err) });
        });
    })
    .catch(err => { console.log(err) });
});

// Login route for doctors
// router.post('/doc-login', (req, res) => {
//   const { email, password } = req.body;
//   User.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         return res.json({ error: "invalid email or password" });
//       }

//       if (!user.isDoctor) {
//         return res.json({ error: "invalid email or password" });
//       }

//       bcrypt.compare(password, user.password)
//         .then(doMatch => {
//           if (doMatch) {
//             const token = jwt.sign({ _id: user._id }, JWT_SECRET);
//             const { _id, name, email, isDoctor } = user;
//             res.json({ token, user: { _id, name, email, isDoctor }, message: 'login successful as doctor' });
//           }
//           else {
//             return res.json({ error: "invalid email or password" });
//           }
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     });
// });

// Login route for users
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({ error: "invalid email or password" });
      }

      bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            const token = jwt.sign({ _id: user._id }, JWT_SECRET);

           
              const { _id, name, email, userType,guideDetails } = user;
              res.json({ token, user: { _id, name, email, userType, guideDetails }, message: 'login successful' });
           
          } else {
            return res.json({ error: "invalid email or password" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
});

  module.exports = router;
  
