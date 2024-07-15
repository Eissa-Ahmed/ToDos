import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideRightAuthComponent } from './side-right-auth.component';

describe('SideRightAuthComponent', () => {
  let component: SideRightAuthComponent;
  let fixture: ComponentFixture<SideRightAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideRightAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideRightAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
