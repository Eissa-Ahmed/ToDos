declare const google: any;
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { IUser } from '../../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../../interfaces/iresponse';
import { IAuthenticationModel } from '../../interfaces/iauthentication-model';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { UserRegisterModel } from '../../interfaces/UserRegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //baseUrl: string = 'https://sayedabdelkrim-002-site18.ktempurl.com/';
  baseUrl: string = 'https://localhost:7281/';
  private jwtServices = inject(JwtService);
  private user: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  private readonly isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private allowResetPassword: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<IResponse<IAuthenticationModel | null>> {
    return this.http.post<IResponse<IAuthenticationModel | null>>(`${this.baseUrl}api/authentication/login`, { email, password }).pipe(
      tap((response: IResponse<IAuthenticationModel | null>) => {
        if (response.Success) {
          let authenticationModel: IAuthenticationModel = response.Data!;
          if (authenticationModel) {
            const user: IUser = {
              userName: authenticationModel.Username,
              email: authenticationModel.Email,
              id: authenticationModel.Id,
              exp: new Date(authenticationModel.TokenExpiration),
            };
            this.setUser(user);
            this.isAuthenticated.next(true);
            this.storeToken(authenticationModel.Token);
          }
        }
      })
    );
  }

  getAllowResetPassword(): Observable<boolean> {
    const isAllowed = localStorage.getItem('allowResetPassword');
    if (isAllowed) this.allowResetPassword.next(JSON.parse(isAllowed));
    return this.allowResetPassword;
  }
  setAllowResetPassword(value: boolean) {
    localStorage.setItem('allowResetPassword', value.toString());
    this.allowResetPassword.next(value);
  }

  forgetPassword(Email: string): Observable<IResponse<null>> {
    return this.http.put<IResponse<null>>(`${this.baseUrl}api/authentication/forget-password?email=${Email}`, null);
  }
  checkCode(Email: string, Code: string): Observable<IResponse<null>> {
    return this.http.put<IResponse<null>>(`${this.baseUrl}api/authentication/check-code`, { Email, Code });
  }
  confirmPassword(Email: string, Password: string): Observable<IResponse<null>> {
    return this.http.put<IResponse<null>>(`${this.baseUrl}api/authentication/confirm-password`, { Email, Password });
  }
  ContinueWithGoogle(Token: string): Observable<IResponse<IAuthenticationModel | null>> {
    return this.http.post<IResponse<IAuthenticationModel | null>>(`${this.baseUrl}api/authentication/google`, { Token }).pipe(
      tap((response: IResponse<IAuthenticationModel | null>) => {
        if (response.Success) {
          let authenticationModel: IAuthenticationModel = response.Data!;
          if (authenticationModel) {
            const user: IUser = {
              userName: authenticationModel.Username,
              email: authenticationModel.Email,
              id: authenticationModel.Id,
              exp: new Date(authenticationModel.TokenExpiration),
            };
            this.setUser(user);
            this.isAuthenticated.next(true);
            this.storeToken(authenticationModel.Token);
          }
        }
      })
    )
  }

  register(model: UserRegisterModel): Observable<IResponse<null>> {
    return this.http.post<IResponse<null>>(`${this.baseUrl}api/authentication/register`, model);
  }
  setUser(user: IUser) {
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser(): IUser | null {
    return this.user.value ?? JSON.parse(localStorage.getItem('user')!);
  }

  isAuthenticated$(): boolean {
    const token: string | null = localStorage.getItem('token');

    if (!token) return false;
    this.isAuthenticated.next(this.jwtServices.tokenIsValid());
    return this.isAuthenticated.value;
  }
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
  logout() {
    this.user?.next(null);
    this.isAuthenticated.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/auth/login']);
  }
}
