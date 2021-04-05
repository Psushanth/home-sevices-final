import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

 constructor(private hc:HttpClient) {}
postadminsignup(userobj):Observable<any>{
  return this.hc.post("/admin/createadmin",userobj)
}
postusersignup(userobj):Observable<any>{
  return this.hc.post("/user/createuser",userobj)
}
 getadminlogin(userObj):Observable<any>{
return this.hc.post("/admin/adminlogin",userObj)
 }
 getuserlogin(userObj):Observable<any>{
  return this.hc.post("/user/userlogin",userObj)
   }
   getcart(username):Observable<any>{
     return this.hc.post("/cart/getitems",username)
   }
   postprofdata(profObj):Observable<any>{
     return this.hc.post("/professional/createprof",profObj)
   }
   postservices(servicesObj):Observable<any>{
     return this.hc.post("/services/createservices",servicesObj)
   }
   getservices():Observable<any>{
     return this.hc.get("services/getservices")
   }
   addtocart(cartObj):Observable<any>{
     return this.hc.post("/cart/addtocart",cartObj)
   }
   getservicetocart(username):Observable<any>{
return this.hc.get(`/cart/getservicesfrmcart/${username}`)
   }
   deletefrmcart(serviceObj):Observable<any>{
 return this.hc.put("/cart/deletefrmcart",serviceObj)
   }
   deleteservices(serviceObj):Observable<any>{
     return this.hc.put("/services/deleteservices",serviceObj)
   }
   getUserDetails(serviceId):Observable<any>{
    return this.hc.get(`/services/getservices/${serviceId}`)
      }
   updateservices(serviceObj):Observable<any>{
        return this.hc.put("/services/updateservice",serviceObj)
      }
      getmainservices(location):Observable<any>{
        return this.hc.get(`/services/getmainservices/${location}`)
          }
}
