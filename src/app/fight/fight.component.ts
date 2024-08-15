import { Component, Input, OnInit, signal, WritableSignal } from "@angular/core"
import { RouterLink } from "@angular/router"
import { Character, DEADPOOL, WOLVERINE } from "../characters/character"
import { Event, EventComponent, RoundEvent } from "../components/event/event.component"
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
  roundEvents = signal<RoundEvent[]>([])
  winnerEvent = signal<Event | null>(null)
  gameOver = signal(false)
  doubleKoBackgroundStyle = `linear-gradient(90deg, ${this.leftCharacter.mainColor} 0%, ${this.rightCharacter.mainColor} 100%)`

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
    console.log("doubleKoBackgroundStyle", this.doubleKoBackgroundStyle)
    this.runFight()
  }

  resetGame() {
    this.leftCharacterHealth.set(this.leftCharacter.maxHealth)
    this.rightCharacterHealth.set(this.rightCharacter.maxHealth)
    this.leftCharacter.canAttack = true
    this.rightCharacter.canAttack = true
    this.currentRound.set(0)
    this.roundEvents.set([])
    this.winnerEvent.set(null)
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

    this.declareWinner()
    this.gameOver.set(true)
  }

  runRound() {
    this.currentRound.set(this.currentRound() + 1)
    const leftEvent = this.checkDamage(
      this.leftCharacter,
      this.rightCharacter,
      this.rightCharacterHealth,
    )
    const rightEvent = this.checkDamage(
      this.rightCharacter,
      this.leftCharacter,
      this.leftCharacterHealth,
    )
    const roundEvent: RoundEvent = {
      round: this.currentRound(),
      events: [leftEvent, rightEvent],
    }
    this.roundEvents.set([
      roundEvent,
      ...this.roundEvents(),
    ])
  }

  checkDamage(
    attacker: Character,
    defender: Character,
    defenderHealth: WritableSignal<number>,
  ): Event {
    if (attacker.canAttack) {
      const isDodged = Math.random() < defender.dodgeRating
      if (isDodged) {
        return {
          type: "dodge",
          attacker: attacker.name,
          defender: defender.name,
          alignment: attacker === this.leftCharacter ? "left" : "right",
          color: defender.mainColor,
        }
      }

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
        attacker: attacker.name,
        defender: defender.name,
        damage,
        critical,
        alignment: attacker === this.leftCharacter ? "left" : "right",
        color: attacker.mainColor,
      }
    } else {
      attacker.canAttack = true
      return {
        type: "regenerate",
        attacker: attacker.name,
        defender: defender.name,
        alignment: attacker === this.leftCharacter ? "left" : "right",
        color: attacker.mainColor,
      }
    }
  }

  declareWinner() {
    if (this.leftCharacterHealth() === 0 && this.rightCharacterHealth() === 0) {
      const event: Event = {
        type: "winner",
        attacker: "",
        defender: "",
        alignment: "center",
        color: "black",
      }
      this.winnerEvent.set(event)
      return
    }

    const winner = this.leftCharacterHealth() > 0 ? this.leftCharacter : this.rightCharacter
    const event: Event = {
      type: "winner",
      attacker: winner.name,
      defender: "",
      alignment: "center",
      color: winner.mainColor,
    }
    this.winnerEvent.set(event)
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
