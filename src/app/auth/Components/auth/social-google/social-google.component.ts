declare const google: any;
import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Environment } from '../../../../environment';
import { JwtService } from '../../../services/jwt.service';
import { AuthService } from '../../../services/auth.service';
import { IAuthenticationModel } from '../../../../interfaces/iauthentication-model';
import { IResponse } from '../../../../interfaces/iresponse';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.initializeGoogleSignIn();
  }

  onLoginWithGoogle() {
    this.toggleBtnGoogle.set(true);
    this.initializeGoogleSignIn();
  }
  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: Environment.ClientId,
      callback: this.handleCredentialResponse.bind(this)

    })
    google.accounts.id.renderButton(
      document.getElementById('google'),
      { theme: 'filled_blue', size: 'large', shape: 'rectangle' }
    );
    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    this.authService.ContinueWithGoogle(response.credential).subscribe({
      next: (res: IResponse<IAuthenticationModel | null>) => {
        if (res.StatusCode == 200) {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        let error: IResponse<IAuthenticationModel | null> = err.error;
        this.toastr.error(err.Message);
      },
      complete: () => {
      }
    });
  }
}
