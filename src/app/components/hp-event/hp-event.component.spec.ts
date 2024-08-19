import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { HpEventComponent } from './hp-event.component'
import { Component } from '@angular/core'
import { appConfig } from '../../app.config'

const event = {
  hpChange: 10,
  left: 10,
  top: 10,
}

describe('HpEventComponent', () => {
  let component: HpEventComponent
  let fixture: ComponentFixture<TestHostComponent>
  let testHost: TestHostComponent
  let hpEventEl: HTMLElement

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: appConfig.providers,
      imports: [HpEventComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent)
    testHost = fixture.componentInstance
    hpEventEl = fixture.nativeElement.querySelector('cf-hp-event')
    fixture.detectChanges()
  })

  it('should create the hp event', () => {
    expect(hpEventEl.textContent).toContain('+10')
  })
})

/*
 * Test host component to simulate the parent component. This is necessary because the
 * component uses a required input signal, which is not working on unit tests.
 */
@Component({
  standalone: true,
  imports: [HpEventComponent],
  template: ` <cf-hp-event [hpEvent]="event"></cf-hp-event>`,
})
class TestHostComponent {
  event = event
}
