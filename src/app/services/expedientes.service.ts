/**
 * ---------------------------------------------------------------
 *  Archivo:        expedientes.service.ts
 *  Descripción:    SERVICIO->Realiza y es encargado de gestionar las operaciones CRUD relacionadas
 *                  con los expedientes digitales, comunicándose con la API REST del backend.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  09/05/2026
 *
 *  Detalles:
 *    - Obtiene listados paginados y filtrados de expedientes.
 *    - Permite consultar un expediente por ID.
 *    - Gestiona la creación, actualización y eliminación de expedientes.
 *    - Incluye métodos adicionales para obtener todos los expedientes o uno concreto mediante identificador.
 *    - Centraliza las peticiones HTTP al endpoint /expedientes.
 * ---------------------------------------------------------------
 */
//Servicio de Angular para gestionar registros de Expedientes, 
//permitiendo realizar operaciones CRUD comunicándose con una API REST
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';   
  
@Injectable({ providedIn: 'root' }) //servicio disponible en toda la aplicación

export class ExpedientesService {
  getTitulares(titularSeleccionado: number) {
    throw new Error('Method not implemented.');
  }
  //URL base de la API para los registros de Expedientes
  //private api = 'http://localhost:3000/expedientes'; 
  private apiUrl = environment.apiUrl;
  private apiUrl_dirigida = `${this.apiUrl}/expedientes`;

  constructor(private http: HttpClient) { } //Inyecta HttpClient para hacer peticiones HTTP

  //Obtiene todos los expedientes con paginación y búsqueda
  //Valores por defecto: página 1, 100 totales, sin búsqueda
  getAll(page: number = 1, limit: number = 100, search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}?page=${page}&limit=${limit}&search=${search}`);
  } 
  
  //Obtiene un expediente específico por su ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}/${id}`);
  }

  //Obtiene un expediente específico por su parámetro
  getExpedientes(page: number = 1, limit: number = 5, search: string = '') {
    return this.http.get<any>(this.apiUrl_dirigida, {
      params: { page, limit, search }
    });
  }

  //Crea un nuevo expediente (POST)
  createExpedientes(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl_dirigida, data);
  }

  //Actualiza un expediente existente por su ID (PUT)
  updateExpedientes(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl_dirigida}/${id}`, data);
  }

  //Elimina un expediente por su ID (DELETE)
  deleteExpedientes(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl_dirigida}/${id}`);
  }

  //Obtener todos los expedientes (sin paginación)
  getExpedientesAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl_dirigida}`);
  }

  //Obtener un expediente por ID 
  getOne(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}/${id}`);
  }
}//de class
