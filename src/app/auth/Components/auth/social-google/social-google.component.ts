declare const google: any;
import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Environment } from '../../../../environment';
import { JwtService } from '../../../services/jwt.service';
import { AuthService } from '../../../services/auth.service';
import { IAuthenticationModel } from '../../../../interfaces/iauthentication-model';
import { IResponse } from '../../../../interfaces/iresponse';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { retry, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppAction } from '../../../NgRx/auth.allAction';
@Component({
  selector: 'app-social-google',
  templateUrl: './social-google.component.html',
  styleUrl: './social-google.component.scss'
})
export class SocialGoogleComponent implements OnInit {
  toggleBtnGoogle: WritableSignal<boolean> = signal<boolean>(false);
  constructor(private router: Router,
    private JwtService: JwtService,
    private authService: AuthService,
    private toastr: ToastrService,
    private socialAuthService: SocialAuthService,
    private store: Store
  ) {

  }

  ngOnInit() {
    this.initializeGoogleSignIn();
    this.initialBtnGoogle();
  }

  initializeGoogleSignIn() {
    this.socialAuthService.authState.subscribe({
      next: (user: SocialUser) => {
        this.signInWithGoogle(user.idToken);
      },
      error: (err) => {
        this.toastr.error(err.Message);
      }
    })
  }

  initialBtnGoogle() {
    google.accounts.id.initialize({
      client_id: Environment.ClientId,
      callback: this.handleCredentialResponse.bind(this)
    });
    google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "filled_blue", size: "large" }
    );
  };

  handleCredentialResponse(response: any) {
    this.signInWithGoogle(response.credential);
  }

  signInWithGoogle(Token: string) {
    this.store.dispatch(AppAction.continueWithGoogleAction({ Token: Token }));
    //this.authService.ContinueWithGoogle(Token).pipe(
    //   retry(1),
    //   tap((res: IResponse<IAuthenticationModel | null>) => {
    //     if (res.StatusCode == 200) {
    //       // this.store.dispatch(loginAction({ user: res.Data! }));
    //     }
    //   })
    // ).subscribe({
    //   next: (res: IResponse<IAuthenticationModel | null>) => {
    //     if (res.StatusCode == 200) {
    //       this.router.navigate(['/home']);
    //     }
    //   },
    //   error: (err) => {
    //     let error: IResponse<IAuthenticationModel | null> = err.error;
    //     this.toastr.error(err.Message);
    //   },
    //   complete: () => {
    //   }
    //});
  }


}
