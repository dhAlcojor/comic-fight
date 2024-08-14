import { Component, input } from "@angular/core"

export type EventAlignment = "left" | "right" | "center"
export type EventType = "attack" | "winner"
export type Event = {
  type: EventType
  who: string
  alignment: EventAlignment
  color: string
  damage?: number
  critical?: boolean
}

@Component({
  selector: "cf-event",
  standalone: true,
  imports: [],
  templateUrl: "./event.component.html",
  styleUrl: "./event.component.css",
})
export class EventComponent {
  event = input.required<Event>()
}
