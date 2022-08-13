import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutRoutes } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { UserListModule } from 'src/app/views/user-list/user-list.module';
import { AngularmaterialModule } from 'src/app/angular material/angularmaterial.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    UserListModule,
    RouterModule.forChild(LayoutRoutes),
  ],
})
export class LayoutProfileModule {}
