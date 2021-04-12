const { ɵangular_packages_platform_browser_platform_browser_d } = require("@angular/platform-browser");
const mongoose =require("mongoose")

const OrderSchema=new mongoose.Schema({
  mainservice:{type:String},
  skills:{type:Array}
})

//create a model---means creating a collection with a name user----and the name should be singular
const Order=mongoose.model("order",OrderSchema)

//export User model
module.exports=Order;