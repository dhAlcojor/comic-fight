import { Component } from '@angular/core'
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'cf-about',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
