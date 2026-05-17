/**
 * ---------------------------------------------------------------
 *  Archivo:        permisos-panel.service.ts
 *  Descripción:    SERVICIO->Realiza y es encargado de gestionar las opciones de navegación y
 *                  acceso disponibles en el panel según el rol del usuario autenticado en el sistema.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  09/05/2026
 *
 *  Detalles:
 *    - Define un mapa de roles y sus opciones permitidas en el panel.
 *    - Proporciona un método para obtener las opciones asociadas a un rol.
 *    - Facilita la construcción dinámica del menú según permisos.
 * ---------------------------------------------------------------
 */
//Servicio de Angular para gestionar los permisos según el rol del usuario
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root', }) //servicio disponible en toda la aplicación

export class PermisosPanelService {
  //Define qué opciones del menú puede ver cada rol de usuario
  opcionesPorRol: Record<string, string[]> = {
    admin: ['usuarios', 'configuracion', 'expedientes', 'informes'],
    secretaria: ['expedientes_SECRETARIA', 'informes'],
    eer: ['configuracion', 'expedientes'],
    lectura: ['informes']
  };

  //Devuelve las opciones permitidas para rol específico, Si el rol no existe -> devuelve array vacío
  getOpcionesParaRol(rol: string): string[] {
    return this.opcionesPorRol[rol] || [];
  }
}//de class
