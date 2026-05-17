/**
 * ---------------------------------------------------------------
 *  Archivo:        informe.service.ts
 *  Descripción:    SERVICIO->Realiza y es encargado de obtener informes agrupados por año desde la
 *                  API REST del backend, facilitando la consulta y análisis temporal de los expedientes.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  17/05/2026
 *
 *  Detalles:
 *    - Consulta informes filtrados por año mediante el endpoint /informe.
 *    - Devuelve los datos en formato observable para su uso en componentes.
 *    - Centraliza las peticiones HTTP relacionadas con informes.
 * ---------------------------------------------------------------
 */
//Importa decoradores y servicios necesarios de Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
  
@Injectable({ providedIn: 'root', }) //servicio disponible en toda la aplicación

export class InformeService {
  //URL base de la API para gestionar la tabla informes
  //private api = 'http://localhost:3000/informe'; 
  private apiUrl = environment.apiUrl;
  private apiUrl_dirigida = `${this.apiUrl}/informe`;

  constructor(private http: HttpClient) { } //Inyecta HttpClient para hacer peticiones HTTP

  //función que obtiene todos los registros de Expedientes desde la API según el año seleccionado
  getInformesPorAnio(anio: number): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl_dirigida}/por-anio/${anio}`);
  }
}//de class
