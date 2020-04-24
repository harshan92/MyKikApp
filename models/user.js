const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:{type:String, unique:true},
    first_name:{type:String},
    last_name:{type:String},
    email:{type:String, unique:true},
    password:{type:String, default:''},
    userImage:{type:String, default:'default.png'},
    facebook:{type:String, default:''},
    facebookTokens:Array,
    google:{type:String, default:''},
    googleTokens:Array
});

module.exports=mongoose.model('User', userSchema)
