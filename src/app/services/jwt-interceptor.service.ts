import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private loginService:LoginService) { }
  

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token:String=this.loginService.userToken;
    console.log(req.url);

      console.log("if " + req.url);
      if (token!="") {
        console.log("token");
        req=req.clone(
          {
            setHeaders: {
              'Content-Type': 'application/json; charset=utf-8',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
      }
      return next.handle(req);
  }
}
