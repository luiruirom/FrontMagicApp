import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
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
    },
    {
        path: 'login',
        loadComponent: () => import('./login-form/login-form.component')
    },
    {
        path: 'register',
        loadComponent: () => import('./register-form/register-form.component')
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false }
        ),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}