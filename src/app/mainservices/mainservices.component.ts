import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainservices',
  templateUrl: './mainservices.component.html',
  styleUrls: ['./mainservices.component.css']
})
export class MainservicesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
gotologin(){
this.router.navigateByUrl("/dashboard")
}
}
