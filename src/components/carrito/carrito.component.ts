import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  private readonly carritoService = inject(CarritoService); 
  items = this.carritoService.items;
  estaAbierto = this.carritoService.estaAbierto;
  subtotal = this.carritoService.subtotal;

  cerrar(): void {
    this.carritoService.cerrar();
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id);
  }

  actualizarCantidad(id: number, cantidad: number): void {
    this.carritoService.actualizarCantidad(id, cantidad);
  }
}