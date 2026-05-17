/**
 * ---------------------------------------------------------------
 *  Archivo:        auth.service.ts
 *  Descripción:    SERVICIO->Se ncarga de gestionar la autenticación del usuario, 
 *                  almacenando el token, rol y datos asociados, y proporcionando 
 *                   métodos para login, logout y verificación de sesión.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  17/05/2026
 *
 *  Detalles:
 *    - Realiza el login y almacena token, usuario y rol en sessionStorage.
 *    - Expone observables reactivos para el estado de autenticación.
 *    - Permite obtener el usuario, rol y token, así como cerrar sesión.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //declaramos variables necesarias
  //private apiUrl = 'http://localhost:3000/auth';
  private apiUrl = `${environment.apiUrl}/auth`;
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedInSubject.asObservable();
  private userSubject = new BehaviorSubject<any>(this.getUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

  //inicio de sesión
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        sessionStorage.setItem('token', response.access_token);
        sessionStorage.setItem('username', response.username);
        sessionStorage.setItem('role', response.role);
        this.loggedInSubject.next(true);
        this.userSubject.next(this.getUser());
      })
    );
  }

  getUser() { //Obtenemos usuario
    const token = sessionStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }
  
  getToken(): string | null { //Obtenemos token
    return sessionStorage.getItem('token');
  }
  
  isLoggedIn(): boolean { //Saber si está logueado el usuario
    return !!this.getToken();
  }
  
  getRole(): string | null { //Obtenemos el rol
    return sessionStorage.getItem('role');
  }
  
  logout(): void { //Cerrar sesión
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');

    this.loggedInSubject.next(false);
    this.userSubject.next(null);
  }
  
  getProfile(): Observable<any> { //Obtener perfil del usuario autenticado
    return this.http.get(`${this.apiUrl}/profile`);
  }
}//de class
