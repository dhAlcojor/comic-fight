import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FightComponent } from './fight.component'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { waitFor } from '../utils'

describe('FightComponent', () => {
  let component: FightComponent
  let fixture: ComponentFixture<FightComponent>
  let fightEl: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightComponent],
      providers: [
        provideRouter([{ path: '**', component: FightComponent }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(FightComponent)
    component = fixture.componentInstance
    component.showDamage = () => {}
    fixture.detectChanges()
  })

  it('should create', () => {
    component.leftCharacterInitialHealth = 100
    component.rightCharacterInitialHealth = 100
    fixture.detectChanges()
    component.ngOnInit()

    const leftHealthBar = fightEl.querySelector(
      '.left-health-bar',
    ) as HTMLElement
    const rightHealthBar = fightEl.querySelector(
      '.right-health-bar',
    ) as HTMLElement

    expect(leftHealthBar.textContent).toContain('/ 100')
    expect(rightHealthBar.textContent).toContain('/ 100')
  })

  it('should reset the game', async () => {
    component.leftCharacterInitialHealth = 200
    component.rightCharacterInitialHealth = 200
    fixture.detectChanges()
    component.ngOnInit()

    try {
      const resetButton = await waitFor('#resetButton')
      resetButton.click()
      fixture.detectChanges()
    } catch (e) {
      console.error(e)
    }

    const leftHealthBar = fightEl.querySelector(
      '.left-health-bar',
    ) as HTMLElement
    const rightHealthBar = fightEl.querySelector(
      '.right-health-bar',
    ) as HTMLElement

    expect(leftHealthBar.textContent).toContain('/ 200')
    expect(rightHealthBar.textContent).toContain('/ 200')
  }, 30000)
})
