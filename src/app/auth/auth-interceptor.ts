/**
 * ---------------------------------------------------------------
 *  Archivo:        auth.interceptor.ts
 *  Descripción:    Interceptor HTTP que añade el token de sesión a todas las peticiones salientes 
 *                  para habilitar la autenticación.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/04/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Recupera el token almacenado en sessionStorage.
 *    - Permite que el backend valide la autenticación en cada solicitud.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  return next(req);
};
