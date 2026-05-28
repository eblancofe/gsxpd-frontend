/**
 * ---------------------------------------------------------------
 *  Archivo:        app.config.ts
 *  Descripción:    Configuración principal de la aplicación Angular, donde se registran los proveedores globales
 *                  tales como el enrutador, el cliente HTTP y los interceptores utilizados en el sistema.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Registra el interceptor de autenticación para añadir tokens a las peticiones HTTP.
 *    - Habilita los listeners globales de errores del navegador.
 *    - Proporciona el enrutador principal de la aplicación.
 * ---------------------------------------------------------------
 */
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth-interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
