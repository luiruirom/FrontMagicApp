import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./computer-list/computer-list.component')
    },
    {
        path: 'employee',
        loadComponent: () => import('./employee-list/employee-list.component')
    },
    {
        path: 'employee/new',
        loadComponent: () => import('./employee-form/employee-form.component')
    },
    {
        path: ':id/edit',
        loadComponent: () => import('./employee-form/employee-form.component')
    }
];
