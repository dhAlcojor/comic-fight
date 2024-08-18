import { Component, computed, ElementRef, input, OnInit, signal } from '@angular/core';
import { HPEvent } from '../event/event.component';

@Component({
  selector: 'cf-hp-event',
  standalone: true,
  imports: [],
  templateUrl: './hp-event.component.html',
  styleUrl: './hp-event.component.css'
})
export class HpEventComponent implements OnInit {
  hpEvent = input.required<HPEvent>()
  visible = signal(true)
  text = computed(() => this.hpEvent().hpChange >= 0 ? `+${this.hpEvent().hpChange}` : this.hpEvent().hpChange.toString())
  colorClass = computed(() => this.hpEvent().hpChange < 0 ? "text-damage" : "text-regenerate")

  ngOnInit(): void {
    console.log(this.hpEvent(), this.colorClass())
    setTimeout(() => {
      this.visible.set(false)
    }, 500)
  }
}
