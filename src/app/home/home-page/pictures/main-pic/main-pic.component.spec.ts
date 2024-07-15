import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPicComponent } from './main-pic.component';

describe('MainPicComponent', () => {
  let component: MainPicComponent;
  let fixture: ComponentFixture<MainPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
