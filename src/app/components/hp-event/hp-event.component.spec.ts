import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpEventComponent } from './hp-event.component';

describe('HpEventComponent', () => {
  let component: HpEventComponent;
  let fixture: ComponentFixture<HpEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HpEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HpEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
