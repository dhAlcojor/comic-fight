import {Component, Input, signal} from '@angular/core';
import {Deadpool} from "../characters/deadpool";
import { Wolverine } from '../characters/wolverine';

enum Phase {
  PRE_COMBAT,
  COMBAT,
}

@Component({
  selector: 'cf-fight',
  standalone: true,
  imports: [],
  templateUrl: './fight.component.html',
  styleUrl: './fight.component.css'
})
export class FightComponent {
  leftCharacter = new Deadpool();
  rightCharacter = new Wolverine();
  currentPhase = signal(Phase.PRE_COMBAT);

  @Input()
  set leftCharacterHealth(value: number) {
    this.leftCharacter.health = value;
  }

  @Input()
  set rightCharacterHealth(value: number) {
    this.rightCharacter.health = value;
  }

  public get Phase() {
    return Phase;
  }
}
