import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmapaconsularComponent } from './gmapaconsular.component';

describe('GmapaconsularComponent', () => {
  let component: GmapaconsularComponent;
  let fixture: ComponentFixture<GmapaconsularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmapaconsularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmapaconsularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
