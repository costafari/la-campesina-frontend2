import { Proveedores } from '../proveedores/proveedores';
import { Productos } from '../productos/productos';

export class Lotes {
    id: number;
    lote: string;
    fechaEntrada: Date;
    cantidad: number;
    proveedor: Proveedores;
    producto: Productos;
    createdAt: any;
}
