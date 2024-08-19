import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { EventComponent, RoundEvent } from './event.component'
import { appConfig } from '../../app.config'
import { Component } from '@angular/core'

const event: RoundEvent = {
  round: 1,
  events: [
    {
      type: 'attack',
      attacker: 'Deadpool',
      defender: 'Wolverine',
      alignment: 'left',
      color: 'black',
      damage: 10,
      regen: 0,
    },
    {
      type: 'attack',
      attacker: 'Deadpool',
      defender: 'Wolverine',
      alignment: 'left',
      color: 'black',
      damage: 10,
      regen: 0,
    },
  ],
}

describe('EventComponent', () => {
  let component: EventComponent
  let fixture: ComponentFixture<TestHostComponent>
  let testHost: TestHostComponent
  let eventEl: HTMLElement

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: appConfig.providers,
      imports: [EventComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent)
    testHost = fixture.componentInstance
    eventEl = fixture.nativeElement.querySelector('cf-event')
    fixture.detectChanges()
  })

  it('should display the round number', () => {
    const expectedRound = `Round ${event.round}`
    expect(eventEl.querySelector('header')?.textContent).toBe(expectedRound)
  })
})

/*
 * Test host component to simulate the parent component. This is necessary because the
 * component uses a required input signal, which is not working on unit tests.
 */
@Component({
  standalone: true,
  imports: [EventComponent],
  template: ` <cf-event [event]="event"></cf-event>`,
})
class TestHostComponent {
  event = event
}
