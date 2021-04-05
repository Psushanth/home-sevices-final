import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IndexOptions } from 'mongoose';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-adminaddservices',
  templateUrl: './adminaddservices.component.html',
  styleUrls: ['./adminaddservices.component.css']
})
export class AdminaddservicesComponent implements OnInit {
  servicesArray:any[];
services=["cleaning","plumbing","carpenter","painter","saloon for men","saloon for women","pest control","Applaince Repair"]
constructor(private us:ServiceService, private router:Router){}
  ngOnInit(){
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
  

  file:File;
  incomingfile(event){

   this.file = event.target.files[0]
  
  }

 formData = new FormData()

  addservices(ref){

    let serviceObj = ref.value
    console.log(serviceObj)
    serviceObj.status=true;
    this.formData.append("image",this.file,this.file.name)
    this.formData.append("serviceObj",JSON.stringify(serviceObj))
 
   

    this.us.postservices(this.formData).subscribe(
      res=>{
        console.log(res["message"])
        if(res['message'] == "failed"){
          alert(res['reason'])
          localStorage.clear()
          //navigate to loin
          this.router.navigateByUrl("/login")
        }
        else{
          
        if(res['message'] == 'services added'){
          alert(res['message'])
          let currentUrl = this.router.url;
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
        }
        else{
          alert(res['message'])
        }
      }
      },
      err=>{
        alert("Something went wrong")
        console.log(err)
      }
    )
  }

update(serviceId){
  this.router.navigateByUrl(`/update/${serviceId}`)
}

 delete(serviceObj){
  var newObj={
    serviceId : serviceObj.serviceId,
    mainservice :serviceObj.mainservice,
    subservice:serviceObj.subservice,
    status:false,
    price:serviceObj.price,
    discreption:serviceObj.discreption,
    image:serviceObj.image
      };
  
      console.log(newObj)  
  this.us.deleteservices(newObj).subscribe(
    (res)=>{
      console.log(res["message"])
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



 
}