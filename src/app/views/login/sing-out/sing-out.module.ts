import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingOutComponent } from './sing-out.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularmaterialModule } from 'src/app/angular material/angularmaterial.module';
const routes: Routes = [
  {
    path: '',
    component: SingOutComponent,
},
];



@NgModule({
  declarations: [
    SingOutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularmaterialModule
  ]
})
export class SingOutModule { }
