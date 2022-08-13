import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { UserListComponent } from './views/user-list/user-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('../app/views/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'usuarios',
        loadChildren: () =>
          import('../app/components/layout/layout.module').then(
            (m) => m.LayoutProfileModule
          ),
      },
    ],
  }, {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () =>
          import('../app/views/login/sing-out/sing-out.module').then(
            (m) => m.SingOutModule
          ),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
