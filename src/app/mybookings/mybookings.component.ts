import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit {
  cartitemsobj:any[];
  totalprice:any;
  username:any;
  numberofitems:any;
  quantity:any
  skills:any[];
 q=1;
  checkoutForm:FormGroup
    constructor(private us:ServiceService, private ac:ActivatedRoute , private router:Router) { }
    
    ngOnInit(): void {

      this.username=localStorage.getItem("name")
      let token=localStorage.getItem("token")
      if(token==null){
        alert("Unauthorized access")
        this.router.navigateByUrl("/login")
      }
      this.us.getservicetocart(this.username).subscribe(
        res=>{
          console.log(res)
          this.cartitemsobj=res["message"]
          this.totalprice=this.cartitemsobj.reduce((acc,curr)=>{
            return acc+(curr.quantity*curr.price)
          },0)
          console.log(this.totalprice)
          this.numberofitems=this.cartitemsobj.reduce((acc,curr)=>{
   return acc+curr.quantity;
          },0)
          console.log(this.quantity)
          this.skills=this.cartitemsobj.map((res)=>res.mainservice )
          console.log(this.skills)
        },
        err=>{alert("something went wrong")
      console.log(err)}
      )
     
    
      


      this.checkoutForm=new FormGroup({
        firstname:new FormControl(null,Validators.required),
        email:new FormControl(null,[
          Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
          address:new FormControl(null, [
          Validators.required]),
          cardname:new FormControl(null, [
            Validators.required]),
            cardnumber:new FormControl(null, [
              Validators.required,
             Validators.maxLength(12),
             Validators.minLength(12),
            Validators.pattern("[0-9]*$")]),
              expmonth:new FormControl(null, [
                Validators.required]),
                expyear:new FormControl(null, [
                  Validators.required]),
                  cvv:new FormControl(null, [
                    Validators.required,
                    Validators.maxLength(3),
                    Validators.minLength(3),
                   Validators.pattern("[0-9]*$")])
      })
    }
   
    formData=new FormData()
    deletefrmcart(serviceObj){
    var newObj={
      username:this.username,
  subservice:serviceObj.subservice,
  price:serviceObj.price,
  status:false,
  image:serviceObj.image
    };

    console.log(newObj)  
this.us.deletefrmcart(newObj).subscribe(
  (res)=>{
    if(res["message"]=="deleted the service"){
    alert("Deleted a service")
   

    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });

    }else{
      alert("something went Wrong")
    }
  },
  (err)=>{
    console.log(err)
  }
)
    }
    getControls(){
      return this.checkoutForm.controls
    }
  logout(){
     localStorage.clear();
     this.router.navigateByUrl("/home")
    }
    onSubmit(){
 console.log(this.checkoutForm.value)
    }
    addquantitytocart(service){
      console.log("in compo",service)
      let serviceObj = {"username":this.username,"subservice":service.subservice,"price":service.price,"status":true,"quantity":1+service.quantity,"image":service.image};
      console.log("in compo",serviceObj)
      this.us.addquantitytocart(serviceObj).subscribe(
        (res)=>{
          if(res["message"]=="added to the cart")
         alert("added to cart")
         
         let currentUrl = this.router.url;
         this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
             this.router.navigate([currentUrl]);
         });
     
        },
        (err)=>{
          alert("Something went wrong")
          console.log(err)
        }
      )
    }



    removequantitytocart(service){
      console.log("in compo",service)
      let serviceObj = {"username":this.username,"subservice":service.subservice,"price":service.price,"status":true,"quantity":service.quantity-1,"image":service.image};
      console.log("in compo",serviceObj)
      this.us.removequantitytocart(serviceObj).subscribe(
        (res)=>{
          if(res["message"]=="removed to the cart")
         alert("removed from cart")
         
         let currentUrl = this.router.url;
         this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
             this.router.navigate([currentUrl]);
         });
     
        },
        (err)=>{
          alert("Something went wrong")
          console.log(err)
        }
      )
    }

    submitorder(){
      if(this.checkoutForm.valid){
      alert("Successfully Placed Order")

      this.router.navigateByUrl(`success`)}
    }
}
