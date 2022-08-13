import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserListRoutingModule } from './user-list-routing.module';
import { AngularmaterialModule } from 'src/app/angular material/angularmaterial.module';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [CommonModule, UserListRoutingModule, AngularmaterialModule],
})
export class UserListModule {}
