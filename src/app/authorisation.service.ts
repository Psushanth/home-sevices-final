import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let token=localStorage.getItem("token")
    if(token==undefined)
    {
      return next.handle(req)
    }
   else{
     let modifiedReqObj=req.clone({headers:req.headers.set("Authorization","Bearer "+token)})
     return next.handle(modifiedReqObj)
   }
  }
}
