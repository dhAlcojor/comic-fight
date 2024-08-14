import {Component, model, signal} from "@angular/core";
import { Deadpool } from "../characters/deadpool";
import { Wolverine } from "../characters/wolverine";
import { RouterLink } from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "cf-home",
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  leftCharacter = new Deadpool();
  rightCharacter = new Wolverine();
  backgroundStyle = `background: linear-gradient(90deg, ${this.leftCharacter.secondaryColor} 0%, ${this.leftCharacter.mainColor} 33%, ${this.rightCharacter.mainColor} 67%, ${this.rightCharacter.secondaryColor} 100%);`;

  leftCharacterHealth = model(1000);
  rightCharacterHealth = model(1000);
}
