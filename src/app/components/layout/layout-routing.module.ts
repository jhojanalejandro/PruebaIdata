import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from 'src/app/views/user-list/user-list.component';



export const LayoutRoutes: Routes = [
  { path: 'lista', component: UserListComponent },

];

export const APP_ROUTING_LAYOUT = RouterModule.forRoot(LayoutRoutes);
