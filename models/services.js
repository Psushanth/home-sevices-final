const { ɵangular_packages_platform_browser_platform_browser_d } = require("@angular/platform-browser");
const mongoose =require("mongoose")

const serviceSchema=new mongoose.Schema({
        serviceId : {type:Number,required:true},
        mainservice:{type:String,required:true},
        subservice: {type:String,required:true},
        status:{type:Boolean},
        price :{type:Number,required:true},
        discreption: {type:String,required:true},
        image :{type:String,required:true}
        
 
})

//create a model---means creating a collection with a name user----and the name should be singular
const Service=mongoose.model("Service",serviceSchema)

//export User model
module.exports=Service;