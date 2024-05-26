import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { User } from './model/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'magicappweb';

  private loginService = inject(LoginService);

  user?: User;
  username: string = this.checkUsername();

  checkUserRole() {
    const role = sessionStorage.getItem("role");
    if (role === 'ROLE_ADMIN') {
      return true
    } 
    return false;
  }

  logout() {
    this.loginService.logout();
  }

  checkToken(): boolean {
    return this.loginService.userToken !== "";
  }

  checkUsername(): string {
    return this.loginService.userUsername.valueOf();
  }
}
