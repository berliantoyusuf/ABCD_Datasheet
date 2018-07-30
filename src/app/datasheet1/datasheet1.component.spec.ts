import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Datasheet1Component } from './datasheet1.component';

describe('Datasheet1Component', () => {
  let component: Datasheet1Component;
  let fixture: ComponentFixture<Datasheet1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Datasheet1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Datasheet1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
