const jwt=require("jsonwebtoken")
const User=require("../model/User")

const authenticate=async(req,res,next)=>{
try{
const token=req.cookies.jwtoken;
const verify=jwt.verify(token,process.env.SECRET_KEY)
const rootUser=await User.findOne({_id:verify._id,"token:token":token})
if(!rootUser){
    throw new Error("no token found")
}
req.token=token;
req.rootUser=rootUser;
next()
}catch(err){
res.status(401).send("unothorized token")
}
}
module.exports= authenticate