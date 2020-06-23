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
        label: 'MANTENIMIENTOS',
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
            }
          ],
        },
        {
          label: 'Proveedores',
          icon: 'pi pi-fw pi-caret-right',
          items: [
            {
              label: 'Lista proveedores',
              icon: 'pi pi-fw pi-list',
              routerLink: '/proveedores-list'
            },
            {
              label: 'Nuevo Proveedor',
              icon: 'pi pi-fw pi-plus',
              routerLink: '/proveedores-form'
            }
          ]
        },
        {
          label: 'Productos',
          icon: 'pi pi-fw pi-caret-right',
          items: [
            {
              label: 'Lista productos',
              icon: 'pi pi-fw pi-list',
              routerLink: '/productos-list'
            },
            {
              label: 'Nuevo Producto',
              icon: 'pi pi-fw pi-plus',
              routerLink: '/productos-form'
            }
          ]
        },
        {
          label: 'Lotes',
          icon: 'pi pi-fw pi-caret-right',
          items: [
            {
              label: 'Lista Lotes',
              icon: 'pi pi-fw pi-list',
              routerLink: '/lotes-list'
            },
            {
              label: 'Nuevo Lote',
              icon: 'pi pi-fw pi-plus',
              routerLink: '/lotes-form'
            }
          ]
        }
        ]
      },
      {
        label: 'TICKET',
        icon: 'pi pi-fw pi-money-bill',
        routerLink: '/cliente-list'
      },
      {
        label: 'VISTAS',
        icon: 'pi pi-fw pi-compass',
        routerLink: '/cliente-list'
      },
      {
        label: 'REPORTES',
        icon: 'pi pi-fw pi-print',
        routerLink: '/cliente-list'
      },
      {
        label: 'CONFIGURACION',
        icon: 'pi pi-fw pi-key',
        routerLink: '/cliente-list'
      }
    ];
  }

}
