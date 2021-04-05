import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  submitted:boolean
  constructor(private us:ServiceService, private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      usertype:new FormControl('null',Validators.required),
      name:new FormControl(null, [
        Validators.required,
        Validators.minLength(5)]),
      password:new FormControl(null, [
        Validators.required])
    })
  }
  getControls(){
    return this.loginForm.controls
  }
  onSubmit(){
    this.submitted=true;
  if(this.loginForm.valid){
    console.log(this.loginForm.value)
 if(this.loginForm.value.usertype=="admin"){
this.us.getadminlogin(this.loginForm.value).subscribe(
  (res)=>{
    console.log(res["message"])
    if(res["message"]=="login success"){
      localStorage.setItem("token",res["token"])
    localStorage.setItem("name",res["name"])
      alert("Login successfull")
        this.router.navigateByUrl("/adminaddservices")
    
    }else if(res["message"]=="invalid password"){
      alert("Invalid Password")
    }
    
    else{
     alert("Admin data not found ...please register!!")
     this.router.navigateByUrl("/signup")
    }
  },
  (err)=>{
    console.log(err)
  }
)
 }else 
  if(this.loginForm.value.usertype=="user"){
    this.us.getuserlogin(this.loginForm.value).subscribe(
      (res)=>{
        console.log(res["message"])
        if(res["message"]=="login success"){
          localStorage.setItem("token",res["token"])
        localStorage.setItem("name",res["name"])
          alert("User Login successfull")
            this.router.navigateByUrl("/dashboard")
        
        }else if(res["message"]=="invalid password"){
          alert("Invalid Password")
        }
        
        else{
         alert("Admin data not found ...please register!!")
         this.router.navigateByUrl("/signup")
        }
      },
      (err)=>{
        console.log(err)
      }
    )
 }
}
    
 
}
// changetype(e) {
 
  
//   this.loginForm.setValue({
//     usertype:e.target.value
//   })
// }
}
