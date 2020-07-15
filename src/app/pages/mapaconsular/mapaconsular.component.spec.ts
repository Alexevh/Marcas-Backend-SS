import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaconsularComponent } from './mapaconsular.component';

describe('MapaconsularComponent', () => {
  let component: MapaconsularComponent;
  let fixture: ComponentFixture<MapaconsularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaconsularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaconsularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
