const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs');

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

userSchema.methods.encryptPassword=function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
}

userSchema.methods.validUserPassword=function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports=mongoose.model('User', userSchema)