import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  readonly cliente: SupabaseClient;

  constructor() {
    this.cliente = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }
}