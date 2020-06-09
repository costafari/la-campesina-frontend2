import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public items: MenuItem[];

  constructor() { }

  ngOnInit(): void {

    this.items = [
      {
        label: 'INICIO',
        icon: 'pi pi-fw pi-home',
        routerLink: '/cliente-list'
      },
      {
        label: 'Mantenimientos',
        icon: 'pi pi-fw pi-file',
        items: [{
          label: 'Clientes',
          icon: 'pi pi-fw pi-caret-right',
          items: [
            {
              label: 'Lista clientes',
              icon: 'pi pi-fw pi-list',
              routerLink: '/cliente-list'
            },
            {
              label: 'Nuevo cliente',
              icon: 'pi pi-fw pi-plus',
              routerLink: '/cliente-form'
            },
          ]
        }
        ]
      }
    ];
  }

}
