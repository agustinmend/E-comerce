import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarritoComponent } from '../components/carrito/carrito.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CarritoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'E-comerce';
}
