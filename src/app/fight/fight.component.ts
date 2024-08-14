import { Component, Input, OnInit, signal, WritableSignal } from "@angular/core"
import { Character, DEADPOOL, WOLVERINE } from "../characters/character"
import {
  AttackEvent,
  Event,
  EventComponent,
} from "../components/event/event.component"
import { HealthBarComponent } from "../components/health-bar/health-bar.component"

const DELAY = 1000

@Component({
  selector: "cf-fight",
  standalone: true,
  imports: [HealthBarComponent, EventComponent],
  templateUrl: "./fight.component.html",
  styleUrl: "./fight.component.css",
})
export class FightComponent implements OnInit {
  leftCharacter = DEADPOOL
  leftCharacterHealth = signal(this.leftCharacter.health)
  rightCharacter = WOLVERINE
  rightCharacterHealth = signal(this.rightCharacter.health)
  currentRound = signal(0)
  events = signal<Event[]>([])

  @Input()
  set leftCharacterInitialHealth(value: number) {
    this.leftCharacterHealth.set(value)
    this.leftCharacter.maxHealth = value
  }

  @Input()
  set rightCharacterInitialHealth(value: number) {
    this.rightCharacterHealth.set(value)
    this.rightCharacter.maxHealth = value
  }

  ngOnInit(): void {
    this.runFight()
  }

  async runFight() {
    console.log("runFight()")
    while (this.leftCharacterHealth() > 0 && this.rightCharacterHealth() > 0) {
      await this.delay(DELAY)
      this.runRound()
      console.log(
        "while()",
        this.leftCharacterHealth(),
        this.rightCharacterHealth(),
      )
    }

    this.declareWinner(
      this.leftCharacterHealth() > 0 ? this.leftCharacter : this.rightCharacter,
    )
  }

  runRound() {
    this.currentRound.set(this.currentRound() + 1)
    this.events.set([
      ...this.events(),
      this.checkDamage(
        this.leftCharacter,
        this.rightCharacter,
        this.rightCharacterHealth,
      ),
    ])
    this.events.set([
      ...this.events(),
      this.checkDamage(
        this.rightCharacter,
        this.leftCharacter,
        this.leftCharacterHealth,
      ),
    ])
  }

  checkDamage(
    attacker: Character,
    defender: Character,
    defenderHealth: WritableSignal<number>,
  ): Event {
    const damage = attacker.getDamage()
    let critical = false
    const newHealth = defenderHealth() - damage
    defenderHealth.set(newHealth >= 0 ? newHealth : 0)
    if (damage > attacker.damage[1] * 0.95) {
      defender.canAttack = false
      critical = true
    }

    return {
      type: "attack",
      who: attacker.name,
      damage,
      alignment: attacker === this.leftCharacter ? "left" : "right",
      text:
        damage > 0
          ? `¡${attacker.name} golpea y hace ${damage} de daño!`
          : `¡${attacker.name} se regenera!`,
      color: attacker.mainColor,
    } as AttackEvent
  }

  declareWinner(character: Character) {
    const event: Event = {
      type: "winner",
      who: character.name,
      alignment: "center",
      text: `¡${character.name} ha ganado!`,
      color: character.mainColor,
    }
    this.events.set([...this.events(), event])
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
