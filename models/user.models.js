const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please enter an Email'],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'Please enter an Password'],
    }
})

const user=mongoose.model('user',UserSchema)
module.exports=user