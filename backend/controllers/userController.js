const User = require("../models/userModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")

// Register User

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
 
    const {name, email, password} = req.body;
    
    const user = await User.create({name, email, password, 
        avatar:{
            public_id: "this is a sample id",
            url:"profilePicUrl"
        }
    })

    sendToken(user, 201, res)

})

// get users

exports.getUsers = catchAsyncErrors( async (req, res, next) =>{
    const users = await User.find()

    res.status(200).json({
        success:true,
        users
    })
})

// Login users
exports.loginUser = catchAsyncErrors( async (req, res, next) =>{
    const {email, password} = req.body

    // checking if user has given passowrd and email both 
    if (!email || !password){
        return next(new ErrorHandler("Please enter Email and Password", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid email or password 1"), 401)
    }
    
    const isPasswordMatch = await user.comparePassword(password)

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password") ,401)
    }

    sendToken(user, 200, res)

})


// Logout

exports.logout = catchAsyncErrors( async (req, res, next) =>{

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        message:"Logged Out successfully"
    })

})