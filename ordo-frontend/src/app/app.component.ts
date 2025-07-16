import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // necessário!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // aqui importa o RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ordo';
}
