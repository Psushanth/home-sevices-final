import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  servicesArray:any[];
  serviceObj:any;
  userDetailsObj:any;
  id:any;
services=["cleaning","plumbing","carpenter","painter","saloon for men","saloon for women","pest control","Applaince Repair"]
  constructor(private us:ServiceService  ,private router:Router, private ac:ActivatedRoute) { }

  ngOnInit(): void {
    this.ac.paramMap.subscribe(data=>{
    this.id=data['params'].serviceId
      console.log(this.id)
      this.us.getUserDetails(this.id).subscribe(
        res=>{
          console.log(res["message"])
          this.userDetailsObj=res["message"]

         
        },
        err=>{}
      )
    })
  }
  file:File;
  incomingfile(event){

   this.file = event.target.files[0]
  
  }

 formData = new FormData()

  updateservices(ref){

    let serviceObj = ref.value
    console.log("in update",serviceObj)
    serviceObj.status=true;
    this.formData.append("image",this.file,this.file.name)
    this.formData.append("serviceObj",JSON.stringify(serviceObj))
 
   

    this.us.updateservices(this.formData).subscribe(
      res=>{
        console.log(res["message"])
        if(res['message'] == "failed"){
          alert(res['reason'])
          localStorage.clear()
          //navigate to loin
          this.router.navigateByUrl("/login")
        }
        else{
          
        if(res['message'] == 'Updated the service'){
          alert(res['message'])
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

}
