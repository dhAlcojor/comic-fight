import {
  Component,
  ElementRef,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { Character, DEADPOOL, WOLVERINE } from '../characters/character'
import {
  Event,
  EventComponent,
  HPEvent,
  RoundEvent,
} from '../components/event/event.component'
import { HealthBarComponent } from '../components/health-bar/health-bar.component'
import { clamp, getRandomFromRange } from '../utils'
import { HeaderComponent } from '../header/header.component'
import { HpEventComponent } from '../components/hp-event/hp-event.component'

const DELAY = 1000

@Component({
  selector: 'cf-fight',
  standalone: true,
  imports: [
    HealthBarComponent,
    EventComponent,
    RouterLink,
    HeaderComponent,
    HpEventComponent,
  ],
  templateUrl: './fight.component.html',
  styleUrl: './fight.component.css',
})
export class FightComponent implements OnInit {
  leftCharacter = DEADPOOL
  leftCharacterHealth = signal(this.leftCharacter.health)
  leftLoserClass = signal('')
  rightCharacter = WOLVERINE
  rightCharacterHealth = signal(this.rightCharacter.health)
  rightLoserClass = signal('')
  currentRound = signal(0)
  roundEvents = signal<RoundEvent[]>([])
  hpEvents = signal<HPEvent[]>([])
  winnerEvent = signal<Event | null>(null)
  gameOver = signal(false)
  doubleKoBackgroundStyle = `linear-gradient(90deg, ${this.leftCharacter.mainColor} 0%, ${this.rightCharacter.mainColor} 100%)`

  constructor(public elementRef: ElementRef) {}

  /** Input parameter read from the URL path */
  @Input()
  set leftCharacterInitialHealth(value: number) {
    const clampedValue = clamp(value, 1, 9999)
    this.leftCharacterHealth.set(clampedValue)
    this.leftCharacter.maxHealth = clampedValue
  }

  /** Input parameter read from the URL path */
  @Input()
  set rightCharacterInitialHealth(value: number) {
    const clampedValue = clamp(value, 1, 9999)
    this.rightCharacterHealth.set(clampedValue)
    this.rightCharacter.maxHealth = clampedValue
  }

  ngOnInit(): void {
    this.runFight()
  }

  /** Reset the game state and run it again */
  resetGame() {
    this.leftCharacterHealth.set(this.leftCharacter.maxHealth)
    this.rightCharacterHealth.set(this.rightCharacter.maxHealth)
    this.leftCharacter.canAttack = true
    this.rightCharacter.canAttack = true
    this.leftLoserClass.set('')
    this.rightLoserClass.set('')
    this.currentRound.set(0)
    this.roundEvents.set([])
    this.winnerEvent.set(null)
    this.gameOver.set(false)
    this.runFight()
  }

  /** Run the game where both characters play automatically */
  async runFight() {
    while (this.leftCharacterHealth() > 0 && this.rightCharacterHealth() > 0) {
      await this.delay(DELAY)
      this.runRound()
    }

    this.declareWinner()
    this.gameOver.set(true)
  }

  /** Run the round where the left character plays first, then the right character */
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
    this.roundEvents.set([roundEvent, ...this.roundEvents()])
  }

  /**
   * Check if the attacker hits the defender, and update the health of the defender
   * @param attacker The character that attacks
   * @param defender The character that defends
   * @param defenderHealth Signal of the defender's health
   * @returns The event that describes the results of the attack
   */
  checkDamage(
    attacker: Character,
    defender: Character,
    defenderHealth: WritableSignal<number>,
  ): Event {
    const side = attacker === this.leftCharacter ? 'left' : 'right'
    if (attacker.canAttack) {
      const isDodged = Math.random() < defender.dodgeRating
      if (isDodged) {
        return {
          type: 'dodge',
          attacker: attacker.name,
          defender: defender.name,
          alignment: side,
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

      this.showDamage(
        attacker === this.leftCharacter ? 'right' : 'left',
        -damage,
      )

      return {
        type: 'attack',
        attacker: attacker.name,
        defender: defender.name,
        damage,
        critical,
        alignment: side,
        color: attacker.mainColor,
      }
    } else {
      attacker.canAttack = true
      let regen: number
      if (attacker === this.leftCharacter) {
        regen = Math.floor(
          this.leftCharacter.maxHealth * attacker.regenerationRating,
        )
        console.log('regenerating', this.leftCharacterHealth(), regen)
        this.leftCharacterHealth.set(this.leftCharacterHealth() + regen)
      } else {
        regen = Math.floor(
          this.rightCharacter.maxHealth * attacker.regenerationRating,
        )
        console.log('regenerating', this.rightCharacterHealth(), regen)
        this.rightCharacterHealth.set(this.rightCharacterHealth() + regen)
      }
      this.showDamage(side, regen)
      return {
        type: 'regenerate',
        attacker: attacker.name,
        defender: defender.name,
        regen,
        alignment: side,
        color: attacker.mainColor,
      }
    }
  }

  declareWinner() {
    if (this.leftCharacterHealth() === 0 && this.rightCharacterHealth() === 0) {
      const event: Event = {
        type: 'winner',
        attacker: '',
        defender: '',
        alignment: 'center',
        color: 'black',
      }
      this.winnerEvent.set(event)
      return
    }

    const winner =
      this.leftCharacterHealth() > 0 ? this.leftCharacter : this.rightCharacter
    const event: Event = {
      type: 'winner',
      attacker: winner.name,
      defender: '',
      alignment: 'center',
      color: winner.mainColor,
    }
    this.winnerEvent.set(event)
    const damageTexts =
      this.elementRef.nativeElement.querySelectorAll('.damage-text')
    damageTexts.forEach((damageText: HTMLElement) => {
      damageText.textContent = ''
    })

    if (this.leftCharacterHealth() === 0) {
      this.leftLoserClass.set('grayscale')
    }

    if (this.rightCharacterHealth() === 0) {
      this.rightLoserClass.set('grayscale')
    }
  }

  showDamage(character: 'left' | 'right', damage: number) {
    const el = this.elementRef.nativeElement
    const image = el.querySelector(
      `#${character}CharacterIdleImage`,
    ) as HTMLImageElement
    const boundingRect = image.getBoundingClientRect()
    const offset = 20
    const x = getRandomFromRange(
      boundingRect.left + offset,
      boundingRect.right - offset,
    )
    const y = getRandomFromRange(
      boundingRect.top + offset,
      boundingRect.bottom - offset,
    )
    this.hpEvents.set([
      ...this.hpEvents(),
      {
        hpChange: damage,
        left: x,
        top: y,
      },
    ])
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
