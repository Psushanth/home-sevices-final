import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


 
  public users:Array<string> = ["Hyderabad","Banglore","Pune","chennai","Mumbai"];
  constructor(private router:Router) { }

  ngOnInit(): void {

  }

formsubmit(ref){
  let locationObj=ref.value
console.log(ref.value)
 this.router.navigateByUrl(`/mainservices/${this.users.indexOf(locationObj.location)}`)
}
}
