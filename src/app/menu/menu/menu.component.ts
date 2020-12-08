import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({selector: 'app-menu', templateUrl: './menu.component.html', styleUrls: ['./menu.component.css']})
export class MenuComponent implements OnInit {

    public items : MenuItem[];

    constructor() {}

    ngOnInit(): void {

        this.items = [
            {
                label: 'INICIO',
                icon: 'pi pi-fw pi-home',
                routerLink: '/'
            },
            {
                label: 'INGRESOS',
                icon: 'pi pi-fw pi-plus-circle',
                items: [
                    {
                        label: 'Clientes',
                        icon: 'pi pi-fw pi-caret-right',
                        routerLink: '/cliente'
                    }, {
                        label: 'Proveedores',
                        icon: 'pi pi-fw pi-caret-right',
                        routerLink: '/proveedores'
                    }, {
                        label: 'Productos',
                        icon: 'pi pi-fw pi-caret-right',
                        routerLink: '/productos'
                    }, {
                        label: 'Lotes',
                        icon: 'pi pi-fw pi-caret-right',
                        routerLink: '/lotes'
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
            }, {
                label: 'REPORTES',
                icon: 'pi pi-fw pi-print',
                routerLink: '/cliente-list'
            }, {
                label: 'CONFIGURACION',
                icon: 'pi pi-fw pi-key',
                routerLink: '/cliente-list'
            }
        ];
    }

}
