const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");
const User=mongoose.model("User");

router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
        .populate("postedby", "_id ")
        .then(posts => {
            res.json({posts});
        })
        .catch(err => {
            console.log(err);
        });
});

router.get('/mypost', requireLogin, (req, res) => {
    console.log(req.user);
    Post.find({postedby: req.user._id})
        .populate("postedby", "_id name")
        .then(mypost => {
            res.json({mypost});
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/createpost', requireLogin, (req, res) => {
    const {title, body} = req.body;
    console.log(title);
    console.log(body);

    if (!title || !body) {
        return res.status(422).json({error: "Please add all the fields"});
    }
    const post = new Post({
        title,
        body,
        postedby: req.user
    });

    post.save()
        .then(result => {
            res.json({message: "Successfully saved"});
        })
        .catch(err => {
            res.json({error: err});
            console.log(err);
        });
});
router.put('/comment',requireLogin,(req,res)=>{
    const comment={
    text:req.body.text,
    postedby:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{
            comments:comment
        }
    },{
        new:true
    }).populate("comments.postedby","_id name")
    .populate("postedby","__id name")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.get('/guide-details', requireLogin, (req, res) => {
    console.log(req.user);
    User.findOne({_id: req.user._id}, { password: 0 }) // project all fields except password
        .then(userDetails => {
            res.json({ userDetails });
            console.log(userDetails);
        })
        .catch(err => {
            console.log(err);
        });
});

  
router.put('/guide-details', requireLogin, (req, res) => {
  const {
    latitude,
    longitude,
    description,
    languages,
    city,
    phoneNumber
  } = req.body;

  console.log(req.body);
  console.log(req.user.userType);

  if (req.user.userType === 'guide') {
    const details = {
      latitude,
      longitude,
      description,
      languages,
      city,
      phoneNumber
    };

    User.findByIdAndUpdate(
     _id=req.user._id,
      {
        $push: {
          guideDetails: details,
          
        }
      },
      { new: true }
    )
      .select('-password') // Exclude password field from response
      .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json({ userDetails: result }); // Return result in userDetails object
        }
      });
  } else {
    res.status(403).json({ error: 'Forbidden' });
  }
});


module.exports = router;
