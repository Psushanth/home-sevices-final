const { ɵangular_packages_platform_browser_platform_browser_d } = require("@angular/platform-browser");
const mongoose =require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{type:String,required:true},
    subservice:{type:String,required:true},
    status:{type:Boolean},
    price:{type:Number,required:true},
    image:{type:String,required:true}
})

//create a model---means creating a collection with a name user----and the name should be singular
const cart=mongoose.model("cartitem",UserSchema)

//export User model
module.exports=cart;