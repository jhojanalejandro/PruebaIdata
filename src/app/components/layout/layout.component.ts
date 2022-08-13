import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/app/models/menu-items';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: '',
      icon: 'cancel',
    },
  ];

  menuItemsLeft: MenuItem[] = this.getNavigation();

  user: any;
  constructor(private router: Router, private _route: ActivatedRoute) {}

  ngOnInit(): void {}

  navigate(n: any) {
    this.router.navigate(['pactar/inicio']);
  }

  getNavigation(): any {
    this.user = JSON.parse(localStorage.getItem('userModel')!);
    return (this.menuItemsLeft = [
      {
        label: 'Inicio',
        icon: '',
        link: 'pactar/estado',
      },
      {
        label: 'Usuarios',
        icon: '',
        link: 'adminUser/usuarios',
      },
    ]);
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-out']);
  }


}
