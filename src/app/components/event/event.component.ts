import { Component, input } from "@angular/core"

export type EventAlignment = "left" | "right" | "center"
export type EventType = "attack" | "dodge" | "regenerate" | "winner"
export type Event = {
  type: EventType
  attacker: string
  defender: string
  alignment: EventAlignment
  color: string
  damage?: number
  regen?: number
  critical?: boolean
}
export type RoundEvent = {
  round: number,
  events: [Event, Event]
}

@Component({
  selector: "cf-event",
  standalone: true,
  imports: [],
  templateUrl: "./event.component.html",
  styleUrl: "./event.component.css",
})
export class EventComponent {
  event = input.required<RoundEvent>()
}
