import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/loginRequest.interface';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../model/user.interface';

  @Injectable({
    providedIn: 'root'
  })
  export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");
  currentUserUsername=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  username: String;

  constructor(private http: HttpClient) { 
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
    this.currentUserUsername=new BehaviorSubject<String>(sessionStorage.getItem("user") || "");
    this.username = this.currentUserUsername.value;
  }
  
  getUser(username:String){
    return this.http.get<User>("http://localhost:8080/api/v1/user/"+this.username);
  }

  getUserRole(username:String): Observable<any> {
    console.log('Getting user role...'); // Debug line
    return this.http.get("http://localhost:8080/api/user/isAdmin/"+username, { responseType: 'text' as 'json' });
  }

  login(credentials:LoginRequest):Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/auth/login",credentials, {headers:{skip:"true"}}).pipe(
      tap( (userData) => {
        sessionStorage.setItem("token", userData.token);
        sessionStorage.setItem("user", credentials.username.valueOf());
        this.currentUserUsername.next(credentials.username.valueOf());
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
        this.getUserRole(credentials.username).subscribe(
          role => {
            sessionStorage.setItem("role", role);
          }
        );
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
    
  }

  logout():void{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    this.currentUserLoginOn.next(false);
    window.location.reload();
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  get userToken():String{
    return this.currentUserData.value;
  }

  get userUsername():String{
    return this.currentUserUsername.value;
  }

}
