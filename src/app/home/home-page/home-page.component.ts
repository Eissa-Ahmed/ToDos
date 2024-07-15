import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  constructor(private authService: AuthService) {

  }
  logout() {
    this.authService.logout();
  }
  pp() {
    console.log(this.authService.getUser());
    console.log(this.authService.getUser()?.email);
  }
}
