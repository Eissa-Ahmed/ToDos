import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isLogged: Observable<Boolean> = of(true);

  constructor(private AuthService: AuthService) {

  }
  ngOnInit(): void {
    //this.isLogged = this.store.select(isLoggedInSelector);
    // this.isLogged.subscribe((data) => console.log(data))
  }
  onLogout() {
    this.AuthService.logout();
  }
}
