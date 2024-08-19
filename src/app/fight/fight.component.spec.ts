import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FightComponent } from './fight.component'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('FightComponent', () => {
  let component: FightComponent
  let fixture: ComponentFixture<FightComponent>

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
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
