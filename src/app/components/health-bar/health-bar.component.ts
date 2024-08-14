import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'cf-health-bar',
  standalone: true,
  imports: [],
  templateUrl: './health-bar.component.html',
  styleUrl: './health-bar.component.css'
})
export class HealthBarComponent {
  value = input.required<number>()
  max = input.required<number>()
  fillColor = input.required<string>()
  fillWidth = computed<number>(() => {
    return this.value() / this.max() * 100;
  })
}
