const { ɵangular_packages_platform_browser_platform_browser_d } = require("@angular/platform-browser");
const mongoose =require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
   password:{type:String,required:true},
   email:{type:String,required:true},
})

//create a model---means creating a collection with a name user----and the name should be singular
const Admin=mongoose.model("admin",UserSchema)

//export User model
module.exports=Admin;