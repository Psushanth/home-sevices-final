import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
skills:any
username:any
cartitemsobj:any
totalprice:any
numberofitems:any
quantity:any
profdetails=[];
newprof=[]
  constructor(private us:ServiceService,private ac:ActivatedRoute) { }

  ngOnInit(): void {
   
    
    this.username=localStorage.getItem("name")
    this.us.getservicetocart(this.username).subscribe(
      res=>{
        console.log(res["message"])
        this.cartitemsobj=res["message"]
        this.totalprice=this.cartitemsobj.reduce((acc,curr)=>{
          return acc+(curr.quantity*curr.price)
        },0)
        console.log(this.totalprice)
        this.numberofitems=this.cartitemsobj.reduce((acc,curr)=>{
          return acc+curr.quantity;
        },0)
        console.log(this.quantity)
        this.skills=this.cartitemsobj.map((res)=>res.mainservice )
        console.log(this.skills)
        
      },
      err=>{alert("something went wrong")
      console.log(err)}
      )
  
      this.us.getprofessionaldetails().subscribe(
        (res)=>{
          console.log(res["message"])
          if(res["message"]!=null){
          this.profdetails.push(res["message"])
          this.newprof.push(this.profdetails[0][0])
          console.log("success",this.profdetails,this.newprof)
          }else{
            console.log("something went wrong")
          }
        },
        (err)=>{
          alert("something went wrong")
        }
        )


}

}
