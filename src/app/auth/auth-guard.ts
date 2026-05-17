/**
 * ---------------------------------------------------------------
 *  Archivo:        auth.guard.ts
 *  Descripción:    Guard de autenticación que restringe el acceso a rutas protegidas, 
 *                  permitiendo el paso solo a usuarios con sesión activa.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/04/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Comprueba el estado de autenticación mediante AuthService.
 *    - Redirige al usuario a la pantalla de login si no está autenticado.
 *    - Protege rutas críticas del sistema evitando accesos no autorizados.
 * ---------------------------------------------------------------
*/
//Importaciones necesarias de Angular
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  if (!token) { //gestión del token
    router.navigate(['/login']);
    return false;
  }

  //Validar token en el backend
  return authService.getProfile().pipe(
    map(() => true),
    catchError(() => {
      sessionStorage.removeItem('token');
      router.navigate(['/login']);
      return of(false);
    })
  );
};
