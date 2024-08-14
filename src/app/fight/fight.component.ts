import { Component, Input, OnInit, signal, WritableSignal } from "@angular/core"
import { RouterLink } from "@angular/router"
import { Character, DEADPOOL, WOLVERINE } from "../characters/character"
import { Event, EventComponent } from "../components/event/event.component"
import { HealthBarComponent } from "../components/health-bar/health-bar.component"

const DELAY = 1000

@Component({
  selector: "cf-fight",
  standalone: true,
  imports: [HealthBarComponent, EventComponent, RouterLink],
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
  gameOver = signal(false)

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

  resetGame() {
    this.leftCharacterHealth.set(this.leftCharacter.maxHealth)
    this.rightCharacterHealth.set(this.rightCharacter.maxHealth)
    this.currentRound.set(0)
    this.events.set([])
    this.gameOver.set(false)
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
    this.gameOver.set(true)
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
      critical,
      alignment: attacker === this.leftCharacter ? "left" : "right",
      color: attacker.mainColor,
    }
  }

  declareWinner(character: Character) {
    const event: Event = {
      type: "winner",
      who: character.name,
      alignment: "center",
      color: character.mainColor,
    }
    this.events.set([...this.events(), event])
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
