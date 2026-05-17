/**
 * ---------------------------------------------------------------
 *  Archivo:        expediente-informe.service.ts
 *  Descripción:    SERVICIO->Realiza y es encargado de obtener expedientes y sus tabñas auxiliares
 *                  asociadas, permitiendo cargar toda la información necesaria para la generación
 *                  de informes y vistas detalladas del expediente.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  17/05/2026
 *
 *  Detalles:
 *    - Obtiene un expediente por ID desde el backend.
 *    - Recupera catálogos auxiliares: expertos, direcciones, titulares, tipos de cambio, niveles de significatividad y evaluadores AsBo.
 *    - Combina todas las peticiones mediante forkJoin para cargar en una sola operación el expediente y sus listas asociadas.
 *    - Facilita la construcción de vistas completas e informes del expediente.
 * ---------------------------------------------------------------
 */
//Servicio de Angular para gestionar informes de Expedientes,
//permitiendo realizar operaciones CRUD comunicándose con una API REST
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';   

@Injectable({ providedIn: 'root' }) //servicio disponible en toda la aplicación

export class ExpedienteInformeService {
  //URL base de la API para informes de Expedientes
  //private api = 'http://localhost:3000'; 
  private apiUrl = environment.apiUrl;
  private apiUrl_dirigida = `${this.apiUrl}/expedientes`;

  constructor(private http: HttpClient) { } //Inyecta HttpClient para hacer peticiones HTTP

  //Obtiene un expediente completo por ID
  getExpedienteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/expedientes/${id}`);
  }

  //Métodos para obtener listas de catálogos de las Tablas auxiliares que componen el Expediente
  //Obtiene los registros de la tabla Expertos (EER)
  getExpertos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/expertos`);
  }
  
  //Obtiene los registros de la tabla Unidad-Organizativa
  getDirecciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/unidad-organizativa`);
  }

  //Obtiene los registros de la tabla Titularidad
  getTitulares(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/titularidad`);
  }

  //Obtiene los registros de la tabla del tipo de Cambio
  getTiposCambio(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cambio`);
  }

  getSignificatividad(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/significatividad`);
  }

  //Obtiene los registros de la tabla Evaluador (Asbo)
  getAsbo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/evaluador`);
  }

  //Cargar todo junto: expediente + tablas auxiliares
  //Carga todo junto: el expediente + todas las listas de las tablas auxiliares necesarias
  //Usa forkJoin para esperar a que todas las peticiones terminen
  getExpedienteConListas(id: number): Observable<{
    expediente: any;
    expertos: any[];
    direcciones: any[];
    titulares: any[];
    tiposCambio: any[];
    significatividad: any[];
    asbo: any[];
  }> {
    return forkJoin({
      expediente: this.getExpedienteById(id),
      expertos: this.getExpertos(),
      direcciones: this.getDirecciones(),
      titulares: this.getTitulares(),
      tiposCambio: this.getTiposCambio(),
      significatividad: this.getSignificatividad(),
      asbo: this.getAsbo(),
    }).pipe(
      map(res => ({  //Si el expediente tiene formato { data: [...] }, extrae el primer elemento
        expediente: res.expediente.data ? res.expediente.data[0] : res.expediente,
        expertos: res.expertos,
        direcciones: res.direcciones,
        titulares: res.titulares,
        tiposCambio: res.tiposCambio,
        significatividad: res.significatividad,
        asbo: res.asbo,
      }))
    );
  }
}//de class
