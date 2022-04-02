const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const req = require('express/lib/request')

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required: true,
        trim : true
    },
    email : {
        type: String,
        unique : true,
        trim : true,
        required:true,
        lowercase :true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email is Invalid')
            }   
        }
    },
    password :{
        type : String,
        required : true,
        minlength : 7,
        trim : true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"') 
            }
        }
    },
    // confirmPassword :{
    //     type : String,
    //     required : true,
    //     minlength : 7,
    //     trim : true,
    //     validate(value){
    //         if(value.toLowerCase().includes('password')){
    //             throw new Error('Password should match') 
    //         }
    //     }
    // },
},
{
    timestamps : true
})


userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()} ,'thisismynewcourse')
    
    // user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
} 

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save' , async function(next){
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})
const User = mongoose.model('User',userSchema)

module.exports = User

