import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequest } from '../model/registerRequest.interface';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http = inject(HttpClient);

  register(registerRequest: RegisterRequest){
    return this.http.post<RegisterRequest>('http://localhost:8080/api/auth/register', registerRequest);
  }

}

