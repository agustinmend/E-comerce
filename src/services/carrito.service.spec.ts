import { TestBed } from '@angular/core/testing';
import { CarritoService } from './carrito.service';
import { Producto } from '../models/producto.model';

describe('CarritoService', () => {
  let service: CarritoService;

  const mockProducto: Producto = {
    id: 1,
    name: 'Teclado Mecánico',
    price: 100,
    description: 'Teclado RGB',
    stock: 5,
    images: ['teclado1.jpg', 'teclado2.jpg']
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoService);
  });

  it('HU-03: Debe inicializar el carrito vacío y calcular totales en cero', () => {
    expect(service.items().length).toBe(0);
    expect(service.cantidadTotal()).toBe(0);
    expect(service.subtotal()).toBe(0);
    expect(service.estaAbierto()).toBeFalse();
  });

  it('HU-02: Debe agregar un producto nuevo al carrito y abrir el panel', () => {
    service.agregarProducto(mockProducto);
    const items = service.items();
    expect(items.length).toBe(1);
    expect(items[0].producto.id).toBe(1);
    expect(items[0].cantidad).toBe(1);
    expect(service.estaAbierto()).toBeTrue();
  });

//  it('HU-02 (Regla de negocio): No debe permitir agregar más unidades que el stock disponible', () => {
//    for (let i = 0; i < 6; i++) {
//      service.agregarProducto(mockProducto);
//    }
//    expect(() => {
//    service.agregarProducto(mockProducto);
//    }).toThrowError(`No puedes agregar más unidades de ${mockProducto.name}. Stock máximo alcanzado.`);
//    expect(service.items()[0].cantidad).toBe(5);
//  });

  it('HU-04: Debe actualizar la cantidad de un producto existente y recalcular subtotales', () => {
    service.agregarProducto(mockProducto);
    service.actualizarCantidad(1, 3);
    const items = service.items();
    expect(items[0].cantidad).toBe(3);
    expect(service.cantidadTotal()).toBe(3);
    expect(service.subtotal()).toBe(300);
  });

  it('HU-04: Debe eliminar el producto si se actualiza su cantidad a 0', () => {
    service.agregarProducto(mockProducto);
    service.actualizarCantidad(1, 0);
    expect(service.items().length).toBe(0);
    expect(service.cantidadTotal()).toBe(0);
  });

  it('debería vaciar la lista de items y el subtotal a 0', () => {
    service.agregarProducto(mockProducto);
    expect(service.items().length).toBe(1);
    service.vaciarCarrito();
    expect(service.items().length).toBe(0);
    expect(service.subtotal()).toBe(0);
  });
});