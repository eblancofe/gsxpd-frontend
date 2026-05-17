/**
 * ---------------------------------------------------------------
 *  Archivo:        role.guard.ts
 *  Descripción:    GUARD->Realiza y tiene el control del acceso a rutas protegidas según el
 *                  rol del usuario, permitiendo el paso solo si su rol coincide con los permitidos.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/04/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene el rol del usuario mediante AuthService.
 *    - Verifica si el rol está incluido en la lista de roles permitidos.
 *    - Redirige al panel si el usuario no tiene permisos suficientes.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    //declaramos constantes necesarias
    const authService = inject(AuthService);
    const router = inject(Router);
    const userRole = authService.getRole();

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    // Si el rol no coincide, redirige al panel o login
    router.navigate(['/panel']);
    return false;
  };
};
