import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Datasheet3Component } from './datasheet3.component';

describe('Datasheet3Component', () => {
  let component: Datasheet3Component;
  let fixture: ComponentFixture<Datasheet3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Datasheet3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Datasheet3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
