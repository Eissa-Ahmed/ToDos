import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialFacebookComponent } from './social-facebook.component';

describe('SocialFacebookComponent', () => {
  let component: SocialFacebookComponent;
  let fixture: ComponentFixture<SocialFacebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialFacebookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
