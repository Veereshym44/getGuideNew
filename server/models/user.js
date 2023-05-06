const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      required: true
    },
  
    guideDetails: [
      {
        latitude: {
          type: String
        },
        longitude: {
          type: String
        },
        description: {
          type: String
        },
        
        languages: {
          type: String
        },
        city: {
          type: String
        },
        phoneNumber: {
          type: String
        }
      }
    ]
  });
  

mongoose.model("User",userSchema);