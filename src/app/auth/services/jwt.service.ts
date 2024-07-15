import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() { }
  decodeToken(token: string): JwtPayload | undefined {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  tokenIsValid(): boolean {
    const token: string | null = localStorage.getItem('token');
    if (!token) return false;
    const decoded: JwtPayload = this.decodeToken(token) || {};

    if (!decoded.exp) return false;
    const expirationDate = new Date(decoded.exp * 1000);

    const now = new Date();
    return expirationDate > now;
  }
}


