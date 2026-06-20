import { Injectable, signal, computed } from '@angular/core';
import { ItemCarrito } from '../models/carrito.model';
import { Producto } from '../models/producto.model';
import { DatosEnvio } from '../models/datos-envio.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private itemsSignal = signal<ItemCarrito[]>([]);
  private abiertoSignal = signal<boolean>(false);

  items = this.itemsSignal.asReadonly();
  estaAbierto = this.abiertoSignal.asReadonly();

  cantidadTotal = computed(() => 
    this.itemsSignal().reduce((total, item) => total + item.cantidad, 0)
  );

  subtotal = computed(() => 
    this.itemsSignal().reduce((total, item) => total + (item.producto.price * item.cantidad), 0)
  );

  abrir(): void {
    this.abiertoSignal.set(true);
  }

  cerrar(): void {
    this.abiertoSignal.set(false);
  }

  agregarProducto(producto: Producto): void {
    const itemsActuales = this.itemsSignal();
    const itemExistente = itemsActuales.find(item => item.producto.id === producto.id);

    if (itemExistente) {
      if (itemExistente.cantidad < producto.stock) {
        this.itemsSignal.set(
          itemsActuales.map(item => 
            item.producto.id === producto.id 
              ? { ...item, cantidad: item.cantidad + 1 } 
              : item
          )
        );
      } else {
        throw new Error(`No puedes agregar más unidades de ${producto.name}. Stock máximo alcanzado.`);
      }
    } else {
      this.itemsSignal.set([...itemsActuales, { producto, cantidad: 1 }]);
    }

    this.abrir();
  }

  actualizarCantidad(productoId: number, nuevaCantidad: number): void {
    if (nuevaCantidad <= 0) {
      this.eliminarProducto(productoId);
      return;
    }
    const itemsActuales = this.itemsSignal();
    const item = itemsActuales.find(i => i.producto.id === productoId);
    if (!item) return;
    if (nuevaCantidad > item.producto.stock) {
      throw new Error(`Stock insuficiente. Solo hay ${item.producto.stock} unidades disponibles.`);
    }
    this.itemsSignal.set(
      itemsActuales.map(i => i.producto.id === productoId ? { ...i, cantidad: nuevaCantidad } : i)
    );
  }

  eliminarProducto(productoId: number): void {
    this.itemsSignal.set(this.itemsSignal().filter(item => item.producto.id !== productoId));
  }
  vaciarCarrito(): void {
    this.itemsSignal.set([]);
    this.cerrar()
  }

  validarDatosEnvio(datos: DatosEnvio): boolean {
    if (!datos.nombre || datos.nombre.trim() === '') {
      throw new Error('El campo nombre es obligatorio.');
    }
    if (!datos.telefono || datos.telefono.trim() === '') {
      throw new Error('El campo telefono es obligatorio.');
    }
    if (!datos.direccion || datos.direccion.trim() === '') {
      throw new Error('El campo direccion es obligatorio.');
    }
    return true;
  }
}