import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  cargando: boolean = true;
  
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);

  ngOnInit(): void {
    this.cargarCatalogo();
  }

  async cargarCatalogo(): Promise<void> {
    try {
      this.cargando = true;
      this.productos = await this.productoService.obtenerProductos();
    } catch (error) {
      console.error('Fallo la carga del catálogo:', error);
    } finally {
      this.cargando = false;
    }
  }

  agregarAlCarrito(producto: Producto): void {
    if (producto.stock > 0) {
      this.carritoService.agregarProducto(producto);
    }
  }
}