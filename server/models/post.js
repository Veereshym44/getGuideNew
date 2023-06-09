const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    
    comments:[{
        text:String,
        postedby:{
            type:ObjectId,
            ref:"User"
                }
        
    }]
    ,
    postedby:{
type:ObjectId,
ref:"User"
    }

})

mongoose.model("Post",postSchema)