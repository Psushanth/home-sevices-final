import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-mainservices',
  templateUrl: './mainservices.component.html',
  styleUrls: ['./mainservices.component.css']
})
export class MainservicesComponent implements OnInit {
  public locations:Array<string> = ["Hyderabad","Banglore","Pune","chennai","Mumbai"];
  constructor(private ac:ActivatedRoute,private us:ServiceService,private router:Router) { }
location:any
servicesoflocation:any
  ngOnInit(): void {

    this.ac.paramMap.subscribe(data=>{
      this.location=data['params'].serviceId
        console.log(this.location)
        this.us.getmainservices(this.locations[this.location]).subscribe(
          res=>{
            console.log(res["message"])
            this.servicesoflocation=res["message"]
  
           
          },
          err=>{}
        )
      })
  }

}
