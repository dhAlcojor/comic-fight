import { Component, Input, OnInit, signal } from '@angular/core'
import {HealthBarComponent} from "../components/health-bar/health-bar.component";
import {DEADPOOL, WOLVERINE} from "../characters/character";

enum Phase {
  PRE_COMBAT,
  COMBAT,
}

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
  currentPhase = signal(Phase.PRE_COMBAT)
  currentRound = signal(0)

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

  public get Phase() {
    return Phase
  }

  ngOnInit(): void {
    this.runFight()
  }

  runFight() {
    this.currentPhase.set(Phase.COMBAT)

    while (this.leftCharacter.health > 0 && this.rightCharacter.health > 0) {
      setTimeout(() => {
        this.currentRound.set(this.currentRound() + 1)
        const leftDamage = this.leftCharacter.getDamage()
        const rightDamage = this.rightCharacter.getDamage()
        this.leftCharacter.health -= leftDamage
        this.rightCharacter.health -= rightDamage
      }, 1000)
    }
  }
}
