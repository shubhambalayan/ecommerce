const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config({path: "backend/config/config.env"})


const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        require:[true, "Please enter your name"],
        maxLenght: [30, "Name can not exceed 30 characters"],
        minLenght: [5, "Name should have more than 5 characters"]
    },

    email:{
        type:String,
        require: [true, "Please enter your Email"],
        unique:true,
        validator:[validator.isEmail, "Please enter a valid email"]
    },

    password:{
        type:String,
        require:true,
        minLenght:[8, "Password should be greater than 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


// Compare passowrd 
userSchema.methods.comparePassword = async function(enteredPassword){

    return await bcrypt.compare(enteredPassword, this.password)

}




module.exports = mongoose.model("User", userSchema)