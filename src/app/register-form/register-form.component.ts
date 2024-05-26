import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RegisterRequest } from '../model/registerRequest.interface';
import { RegisterService } from '../services/register.service';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export default class RegisterFormComponent {

  constructor(private http: HttpClient) { }

  private fb = inject(FormBuilder);
  private registerService = inject(RegisterService);
  private loginService = inject(LoginService);
  private router = inject(Router);

  
  form?: FormGroup;
  registerRequest?: RegisterRequest;
  errors: string[] = [];

  checkUserRole() {
    const role = sessionStorage.getItem("role");
    if (role === 'ROLE_ADMIN') {
      return true
    } 
    return false;
  }

  ngOnInit(): void {  
      this.form = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]]
    })
  }

  register() {

    if (this.form?.invalid) {
      this.form?.markAllAsTouched();
      return;
    }

    const registerForm = this.form!.value;

    let request: Observable<RegisterRequest>;
      
    request = this.registerService.register(registerForm)

    request
      .subscribe({
        next: () => {
          this.errors = [];
          this.router.navigate(['/']);
        },
        error: response => {
          this.errors = response.error.errors;
        }
      });
  }

}
