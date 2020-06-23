import { Proveedores } from '../proveedores/proveedores';
import { Productos } from '../productos/productos';

export class Lotes {
    id: Number;
    lote: String;
    fechaEntrada: any;
    cantidad: Number;
    proveedor: Proveedores;
	producto: Productos;
	createdAt: any;
}
