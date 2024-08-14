import { Component, Input, OnInit, signal } from '@angular/core'
import {HealthBarComponent} from "../components/health-bar/health-bar.component";
import {Character, DEADPOOL, WOLVERINE} from "../characters/character";

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
  rightCharacter = WOLVERINE
  currentRound = signal(0)
  messages = signal<string[]>([])

  @Input()
  set leftCharacterHealth(value: number) {
    this.leftCharacter.health = value
    this.leftCharacter.maxHealth = value
  }

  @Input()
  set rightCharacterHealth(value: number) {
    this.rightCharacter.health = value
    this.rightCharacter.maxHealth = value
  }

  ngOnInit(): void {
    this.runFight()
  }

  runFight() {
    console.log("runFight()")
    while (this.leftCharacter.health > 0 && this.rightCharacter.health > 0) {
      setTimeout(() => {
        console.log("setTimeout()")
        this.currentRound.set(this.currentRound() + 1)
        const leftDamage = this.leftCharacter.getDamage()
        const rightDamage = this.rightCharacter.getDamage()

        if (leftDamage > 0) {
          const leftCritical = this.checkDamage(this.rightCharacter, leftDamage)
          this.sendMessage(this.leftCharacter, leftDamage, leftCritical)
        } else {
          
        }
        
        if (rightDamage > 0) {
          this.checkDamage(this.leftCharacter, rightDamage)
        } else {

        }
      }, 1000)
    }
  }

  checkDamage(character: Character, damage: number) {
    let critical = false
    character.health -= damage
    if (damage > character.damage[1] * 0.9) {
      character.canAttack = false
      critical = true
    }

    return critical
  }

  sendMessage(character: Character, damage: number, critical: boolean) {
    let message = ""
    if (damage === 0) {
      message = `${character.name} se regenera!`
    } else {
      message = `${character.name} golpea y hace ${damage} de daño!`
      if (critical) {
        message += " ¡Golpe crítico!"
      }
    }

    console.log(message)
    this.messages.set([...this.messages(), message])
  }
}
