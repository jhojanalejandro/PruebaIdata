import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AngularmaterialModule } from 'src/app/angular material/angularmaterial.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, AngularmaterialModule],
})
export class LoginModule {}
