import { Component, computed, ElementRef, input, OnInit, signal } from '@angular/core';
import { HPEvent } from '../event/event.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'cf-hp-event',
  standalone: true,
  imports: [],
  templateUrl: './hp-event.component.html',
  styleUrl: './hp-event.component.css',
  animations: [
    trigger('visibleHidden', [
      state(
        'visible',
        style({
          opacity: 1,
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0
        })
      ),
      transition('* => *', [animate('0.5s')]),
    ])
  ]
})
export class HpEventComponent implements OnInit {
  hpEvent = input.required<HPEvent>()
  visible = signal(false)
  text = computed(() => this.hpEvent().hpChange >= 0 ? `+${this.hpEvent().hpChange}` : this.hpEvent().hpChange.toString())
  colorClass = computed(() => this.hpEvent().hpChange < 0 ? "text-damage" : "text-regenerate")

  ngOnInit(): void {
    this.visible.set(true)
    setTimeout(() => {
      this.visible.set(false)
    }, 500)
  }
}
