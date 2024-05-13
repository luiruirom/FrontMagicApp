import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { RouterModule } from '@angular/router';
import { Employee } from '../model/employee.interface';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

export default class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  employees: Employee[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.employeeService.list()
      .subscribe(employees => {
        this.employees = employees;
      });
  }

  delete(employee: Employee) {
    this.employeeService.delete(employee.id)
      .subscribe(() => {
        this.loadData();
        console.log("Employee deleted successfully!")
    });
  }
}
