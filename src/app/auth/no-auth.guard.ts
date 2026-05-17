/**
 * ---------------------------------------------------------------
 *  Archivo:        no-auth.guard.ts
 *  Descripción:    GUARD->Realiza la función de impedir el acceso a rutas públicas cuando
 *                  el usuario ya ha iniciado sesión, redirigiéndolo automáticamente al panel principal.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Comprueba si existe una sesión activa mediante AuthService.
 *    - Evita que usuarios autenticados accedan a la pantalla de login.
 *    - Redirige al panel principal cuando el usuario ya está logueado.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const noAuthGuard: CanActivateFn = () => {
    //declaramos constantes necesarias
    const auth = inject(AuthService);
    const router = inject(Router);
    const loggedIn = auth.isLoggedIn(); // tu método actual

    if (loggedIn) { //con sesión iniciada, navegamos al panel
        router.navigate(['/panel']);
        return false;
    }
    return true;
};
