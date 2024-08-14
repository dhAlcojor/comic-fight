import { Component, Input, OnInit, Signal, signal, WritableSignal } from '@angular/core'
import {HealthBarComponent} from "../components/health-bar/health-bar.component";
import {Character, DEADPOOL, WOLVERINE} from "../characters/character";

type MessageType = "left" | "right"
type Message = {
  side: MessageType
  text: string,
  critical: boolean
  color: string
}
const DELAY = 1000

@Component({
  selector: 'cf-fight',
  standalone: true,
  imports: [
    HealthBarComponent
  ],
  templateUrl: './fight.component.html',
  styleUrl: './fight.component.css',
})
export class FightComponent implements OnInit {
  leftCharacter = DEADPOOL
  leftCharacterHealth = signal(this.leftCharacter.health)
  rightCharacter = WOLVERINE
  rightCharacterHealth = signal(this.rightCharacter.health)
  currentRound = signal(0)
  messages = signal<Message[]>([])

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
      console.log("while()", this.leftCharacterHealth(), this.rightCharacterHealth())
    }
  }

  runRound() {
    this.currentRound.set(this.currentRound() + 1)
    const leftDamage = this.leftCharacter.getDamage()
    let leftCritical = false
    const rightDamage = this.rightCharacter.getDamage()
    let rightCritical = false

    if (leftDamage > 0) {
      leftCritical = this.checkDamage(this.rightCharacterHealth, this.rightCharacter, leftDamage)
    }
    this.sendMessage('left', this.leftCharacter, leftDamage, leftCritical)
    
    if (rightDamage > 0) {
      rightCritical = this.checkDamage(this.leftCharacterHealth, this.leftCharacter, rightDamage)
    }
    this.sendMessage('right', this.rightCharacter, rightDamage, rightCritical)
  }

  checkDamage(health: WritableSignal<number>, character: Character, damage: number) {
    let critical = false
    const newHealth = health() - damage
    health.set(newHealth >= 0 ? newHealth : 0)
    if (damage > character.damage[1] * 0.95) {
      character.canAttack = false
      critical = true
    }

    return critical
  }

  sendMessage(side: 'left' | 'right', character: Character, damage: number, critical: boolean) {
    const message: Message = {
      side,
      text: "",
      critical,
      color: character.mainColor
    }
    if (damage === 0) {
      message.text = `¡${character.name} se regenera!`
    } else {
      message.text = `¡${character.name} golpea y hace ${damage} de daño!`
    }

    this.messages.set([...this.messages(), message])
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
