const mongoose = require("mongoose")
const jwt=require("jsonwebtoken")
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    tokens:[
      {
        token:{
          type: String,
          require: true,         
        }
      }
    ]
  },
  { timestamps: true }
)

UserSchema.methods.generateAuthToken= async function(){
  try{
    let token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
    this.tokens=this.tokens.concat({token:token})
    await this.save();
    return token
  }catch(err){

  }
}

module.exports = mongoose.model("User", UserSchema)
