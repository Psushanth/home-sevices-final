import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  servicesArray=[];
  checkbox:any;
  mainservicename:any;
  maincategories=["cleaning","plumbing","carpenter","painter","saloon for men","saloon for women","pest control","Applaince Repair"]
  selectedcategory:any;
  cartitemsobj:any;
  numberofitems:number;
  username=localStorage.getItem("name")
  constructor(private us:ServiceService, private router:Router) { }
   id:Number=0;
  ngOnInit(): void {
    let tokenverify=localStorage.getItem("token")
    if(tokenverify==null){
      alert("Unauthorized access")
this.router.navigateByUrl("/home")
    }
    this.us.getservices().subscribe(
      (res)=>{
        this.servicesArray=res["message"]
      },
      (err)=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
    
    this.us.getservicetocart(this.username).subscribe(
     res=>{
       console.log(res)
       this.cartitemsobj=res["message"]
       this.numberofitems=this.cartitemsobj.length;
     },
     err=>{alert("something went wrong")
   console.log(err)}
   )
  }
  logout(){
    localStorage.clear()
    this.router.navigateByUrl(`/login`)
  }
  bookings(){
  
    this.router.navigateByUrl(`/mybookings`)
  }
  addtocart(service){
    
    console.log("in compo",service)
    let serviceObj = {"username":this.username,"mainservice":service.mainservice,"subservice":service.subservice,"price":service.price,"status":true,"image":service.image};
    console.log("in compo",serviceObj)
    this.us.addtocart(serviceObj).subscribe(
      (res)=>{
        if(res["message"]=="added to the cart"){
       alert("added to cart")
       this.us.getservicetocart(this.username).subscribe(
        res=>{
          console.log(res)
          this.cartitemsobj=res["message"]
          this.numberofitems=this.cartitemsobj.length;
        },
        err=>{alert("something went wrong")
      console.log(err)}
      )
      }else{
        alert("service already Added")
      }
    },
      (err)=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
  }

  load(){

    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  search(){
    if(this.mainservicename!=""){
    this.servicesArray=this.servicesArray.filter(res=>{
      return (res.subservice.toLocaleLowerCase().match(this.mainservicename.toLocaleLowerCase()))||
      (res.mainservice.toLocaleLowerCase().match(this.mainservicename.toLocaleLowerCase()))
    })}
    else{
      this.ngOnInit();
    }
  }




  searchcategory(ref){
    this.selectedcategory=ref.value;
    console.log(this.selectedcategory)
    if(this.selectedcategory!=""&& this.selectedcategory.cleaning==true){
      console.log("in comp search category ",this.selectedcategory.cleaning)
  
        let selectedvalue="cleaning";
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.mainservice.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })} else    if( this.selectedcategory.plumbing==true){
      console.log("in comp search category ",this.selectedcategory.plumbing)
  
        let selectedvalue="plumbing";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.mainservice.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory.carpenter==true){
      console.log("in comp search category ",this.selectedcategory.carpenter)
  
        let selectedvalue="carpenter";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.mainservice.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory.painter==true){
      console.log("in comp search category ",this.selectedcategory.painter)
  
        let selectedvalue="painter";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.mainservice.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory["saloon for men"]==true){
      console.log("in comp search category ",this.selectedcategory["saloon for men"])
  
        let selectedvalue="saloon for men";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.mainservice.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory["saloon for women"]==true){
      console.log("in comp search category ",this.selectedcategory["saloon for women"])
  
        let selectedvalue="saloon for women";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.mainservice.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory["pest control"]==true){
      console.log("in comp search category ",this.selectedcategory["saloon for women"])
  
        let selectedvalue="saloon for women";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.mainservice.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
    else    if( this.selectedcategory["Applaince Repair"]==true){
      console.log("in comp search category ",this.selectedcategory["Applaince Repair"])
  
        let selectedvalue="Applaince Repair";
      
    this.servicesArray=this.servicesArray.filter(res=>{
      return res.mainservice.toLocaleLowerCase().match(selectedvalue.toLocaleLowerCase())
    
    })}
   
    else{
      this.ngOnInit();
    }
  }
  
}

