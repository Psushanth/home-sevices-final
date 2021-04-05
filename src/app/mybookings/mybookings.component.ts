import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit {
  cartitemsobj:any[];
  
  username:any
    constructor(private us:ServiceService, private ac:ActivatedRoute , private router:Router) { }
    
    ngOnInit(): void {
      let username=localStorage.getItem("name")
      let token=localStorage.getItem("token")
      if(token==null){
        alert("Unauthorized access")
        this.router.navigateByUrl("/login")
      }
      this.us.getservicetocart(username).subscribe(
        res=>{
          console.log(res)
          this.cartitemsobj=res["message"]
        },
        err=>{alert("something went wrong")
      console.log(err)}
      )
     
      // this.username = localStorage.getItem("name")
      // var usernameObj={
      //   username:this.username
      // };
      // this.us.getcart(usernameObj).subscribe(
      //   res=>{
      //     this.cartitemsobj=res;
      //   },
      //   err=>{}
      // )
      
    }
   
    formData=new FormData()
    deletefrmcart(serviceObj){
    var newObj={
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
    logout(){
     localStorage.clear();
     this.router.navigateByUrl("/home")
    }
    
}
