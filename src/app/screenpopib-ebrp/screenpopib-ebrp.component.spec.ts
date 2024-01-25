import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenpopibEbrpComponent } from './screenpopib-ebrp.component';

describe('ScreenpopibEbrpComponent', () => {
  let component: ScreenpopibEbrpComponent;
  let fixture: ComponentFixture<ScreenpopibEbrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenpopibEbrpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenpopibEbrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
