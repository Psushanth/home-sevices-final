import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-register-prof',
  templateUrl: './register-prof.component.html',
  styleUrls: ['./register-prof.component.css']
})
export class RegisterProfComponent implements OnInit {

  loginForm:FormGroup;
  submitted:boolean
    skillsarray=["Electician","Plumber","cleanser","saloon","Carpenter"]
    locationsarray=["Banglore","Chennai","Hyderabad","Pune","Mumbai"]
    constructor(private us:ServiceService) { }
  
    ngOnInit(): void {
      this.loginForm=new FormGroup({
        name: new FormControl(null,[
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("[a-zA-Z ]*$")]),
        email: new FormControl(null,[
          Validators.required,
          Validators.email]),
        locations: new FormControl(null,[
          Validators.required]),
        skills:new FormControl(null,[
          Validators.required]),
        mobilenumber:new FormControl(null,[
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
           Validators.pattern("[0-9]*$")])
  
        
        })
       
      }
      getControls(){
        return this.loginForm.controls
      }
  
      onSubmit(){
        this.submitted=true;
        if(this.loginForm.valid){
        console.log(this.loginForm.value)
       this.us.postprofdata(this.loginForm.value).subscribe(
       (res)=>{
         console.log("in component",res["message"])
          if(res["message"]=="Professional created"){
            alert("Registered as Professional Successfully")
          }
          else{
            alert("Professional name already Exist....try with other username")
          }
       },
       (err)=>{console.log(err)}
       )
      }
      }
      
    }