import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { HealthBarComponent } from './health-bar.component'
import { appConfig } from '../../app.config'
import { Component } from '@angular/core'

describe('HealthBarComponent', () => {
  let component: HealthBarComponent
  let fixture: ComponentFixture<TestHostComponent>
  let testHost: TestHostComponent
  let healthBarEl: HTMLElement

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: appConfig.providers,
      imports: [HealthBarComponent],
    })
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent)
    testHost = fixture.componentInstance
    healthBarEl = fixture.nativeElement.querySelector('cf-health-bar')
    fixture.detectChanges()
  })

  it('should display the health bar', () => {
    const coloredBackground = healthBarEl.querySelector(
      '.colored-background',
    ) as HTMLElement
    const fillBackground = healthBarEl.querySelector(
      '.fill-background',
    ) as HTMLElement
    const span = healthBarEl.querySelector('span') as HTMLElement
    expect(coloredBackground?.style.backgroundColor).toBe('red')
    expect(fillBackground?.style.backgroundColor).toBe('red')
    expect(span.textContent).toBe('100 / 100')
  })
})

/*
 * Test host component to simulate the parent component. This is necessary because the
 * component uses a required input signal, which is not working on unit tests.
 */
@Component({
  standalone: true,
  imports: [HealthBarComponent],
  template: ` <cf-health-bar
    [value]="100"
    [max]="100"
    [fillColor]="'red'"
  ></cf-health-bar>`,
})
class TestHostComponent {}
