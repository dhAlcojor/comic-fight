import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FightComponent } from './fight.component'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

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
    fightEl = fixture.nativeElement
    fixture.detectChanges()
  })

  it('should create', () => {
    component.leftCharacterInitialHealth = 100
    component.rightCharacterInitialHealth = 100
    fixture.detectChanges()

    const leftHealthBar = fightEl.querySelector(
      '.left-health-bar',
    ) as HTMLElement
    const rightHealthBar = fightEl.querySelector(
      '.right-health-bar',
    ) as HTMLElement

    expect(leftHealthBar.textContent).toContain('/ 100')
    expect(rightHealthBar.textContent).toContain('/ 100')
  })
})
