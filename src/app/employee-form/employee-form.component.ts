import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export default class EmployeeFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute)
  private employeeService = inject(EmployeeService);

  form?: FormGroup;
  employee?: Employee;
  errors: string[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.employeeService.get(parseInt(id))
        .subscribe(employee => {
          this.employee = employee;
          this.form = this.fb.group({
            name: [employee.name, [Validators.required]],
            email: [employee.email, [Validators.required, Validators.email]],
          });
        });
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      });
    }
  
  }

  save() {

    if (this.form?.invalid) {
      this.form?.markAllAsTouched();
      return;
    }

    const employeeForm = this.form!.value;

    let request: Observable<Employee>;
      
    if(this.employee){
      request = this.employeeService.update(this.employee.id, employeeForm)
      
    } else {
      request = this.employeeService.create(employeeForm)
    }

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
