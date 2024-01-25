import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenpopCCComponent } from './screenpop-cc.component';

describe('ScreenpopCCComponent', () => {
  let component: ScreenpopCCComponent;
  let fixture: ComponentFixture<ScreenpopCCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenpopCCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenpopCCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
