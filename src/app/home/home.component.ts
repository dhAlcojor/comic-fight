import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'
import {DEADPOOL, WOLVERINE} from "../characters/character";

@Component({
  selector: 'cf-home',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  leftCharacter = DEADPOOL
  rightCharacter = WOLVERINE
  backgroundStyle = `background: linear-gradient(90deg, ${this.leftCharacter.secondaryColor} 0%, ${this.leftCharacter.mainColor} 33%, ${this.rightCharacter.mainColor} 67%, ${this.rightCharacter.secondaryColor} 100%);`

  leftCharacterHealth = signal(this.leftCharacter.health)
  rightCharacterHealth = signal(this.rightCharacter.health)
}
