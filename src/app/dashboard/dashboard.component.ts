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
  username=localStorage.getItem("name")
  constructor(private us:ServiceService, private router:Router,private toastr:ToastrService) { }
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
  }
  logout(){
    localStorage.clear()
    this.router.navigateByUrl("/home")
  }
  bookings(){
  
    this.router.navigateByUrl(`/mybookings`)
  }
  addtocart(service){
    console.log("in compo",service)
    let serviceObj = {"username":this.username,"subservice":service.subservice,"price":service.price,"image":service.image};
    console.log("in compo",serviceObj)
    this.us.addtocart(serviceObj).subscribe(
      (res)=>{
        if(res["message"]=="added to the cart")
       this.toastr.success("wfwqet 3434 3q  4")
      },
      (err)=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
  }
  
}

