/**
 * ---------------------------------------------------------------
 *  Archivo:        paises.service.ts
 *  Descripción:    SERVICIO->Realiza y es encargado de obtener el listado de países desde la
 *                  API REST del backend, utilizado para cargar catálogos y desplegables en el sistema.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  17/05/2026
 *
 *  Detalles:
 *    - Recupera todos los países mediante el endpoint /paises.
 *    - Devuelve los datos en formato observable para su uso en componentes.
 *    - Servicio sencillo orientado a catálogos y listas auxiliares.
 * ---------------------------------------------------------------
 */
//Importa decoradores y servicios necesarios de Angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';  

@Injectable({ providedIn: 'root' }) //servicio disponible en toda la aplicación

export class PaisesService {
  //URL base de la API para gestionar la tabla paises
  //private api = 'http://localhost:3000/paises';
  private apiUrl = environment.apiUrl;
  private apiUrl_dirigida = `${this.apiUrl}/paises`;

  constructor(private http: HttpClient) { } //Inyecta HttpClient para hacer peticiones HTTP

  //función que obtiene todos los países desde la API
  getAll() { 
    return this.http.get<any[]>(this.apiUrl_dirigida);
  }
}//de class
