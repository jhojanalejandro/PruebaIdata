import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularmaterialModule } from './angular material/angularmaterial.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { UserListModule } from './views/user-list/user-list.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginModule } from './views/login/login.module';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularmaterialModule,
    ReactiveFormsModule,
    CoreModule,
    LoginModule,
    CommonModule,
    HttpClientModule
  ],
  exports :[
    AngularmaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
