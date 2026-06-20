import { Injectable, inject } from '@angular/core';
import { Producto } from '../models/producto.model';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly supabase = inject(SupabaseService).cliente;
  async obtenerProductos(): Promise<Producto[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true }); 

    if (error) {
      console.error('Error al obtener productos de Supabase:', error);
      throw error; 
    }
    
   return data as Producto[];
  }
}