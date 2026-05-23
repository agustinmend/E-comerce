import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

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