export class Character {
  name: string
  portrait: string
  idle: string
  logo: string
  mainColor: string
  secondaryColor: string
  health: number
  maxHealth: number
  damage: [number, number]
  dodgeRating: number
  canAttack: boolean

  constructor(name: string, portrait: string, idle: string, logo: string, mainColor: string, secondaryColor: string, damage: [number, number], dodgeRating: number) {
    this.name = name
    this.portrait = portrait
    this.idle = idle
    this.logo = logo
    this.mainColor = mainColor
    this.secondaryColor = secondaryColor
    this.health = 0
    this.maxHealth = 0
    this.damage = damage
    this.dodgeRating = dodgeRating
    this.canAttack = true
  }

  getDamage(): number {
    if (!this.canAttack) {
      console.log(`${this.name} no puede atacar`)
      this.canAttack = true
      return 0;
    }

    this.canAttack = true
    const [min, max] = this.damage
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}

export const DEADPOOL = new Character('Deadpool', 'assets/deadpool/deadpool-portrait.webp', 'assets/deadpool/deadpool-idle.webp', 'assets/deadpool/deadpool-logo.webp', '#b40d0d', '#000000', [10, 100], .25)
export const WOLVERINE = new Character('Wolverine', 'assets/wolverine/wolverine-portrait.webp', 'assets/wolverine/wolverine-idle.webp', 'assets/wolverine/wolverine-logo.webp', '#c2c214', '#204B77', [10, 120], .20)
