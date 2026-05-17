/**
 * ---------------------------------------------------------------
 *  Archivo:        evaluador.service.ts
 *  Descripción:    SERVICIO->Realiza y es encargado de gestionar las operaciones CRUD relacionadas
 *                  con los evaluadores externos, comunicándose con la API REST del backend.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  17/05/2026
 *
 *  Detalles:
 *    - Obtiene listados paginados y filtrados de evaluadores.
 *    - Permite consultar un evaluador por ID.
 *    - Gestiona la creación, actualización y eliminación de registros.
 *    - Centraliza las peticiones HTTP al endpoint /evaluador.
 * ---------------------------------------------------------------
 */
//Servicio de Angular para gestionar tabla Evaluador (AsBo) dentro del Expediente
//permitiendo realizar operaciones CRUD comunicándose con una API REST
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';   

@Injectable({ providedIn: 'root' }) //servicio disponible en toda la aplicación

export class EvaluadorService {
  //URL base de la API para tabla evaluador
  //private api = 'http://localhost:3000/evaluador'; 
  private apiUrl = environment.apiUrl;
  private apiUrl_dirigida = `${this.apiUrl}/evaluador`;

  constructor(private http: HttpClient) { } //Inyecta HttpClient para hacer peticiones HTTP

  //Obtiene todos los expedientes con paginación y búsqueda
  //Valores por defecto: página 1, 100 totales, sin búsqueda
  getAll(page: number = 1, limit: number = 100, search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}?page=${page}&limit=${limit}&search=${search}`);
  }

  //Obtiene un registro de tabla Cambio específico por su ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}/${id}`);
  }

  //Obtiene un registro de tabla Cambio específico por su parámetro
  getEvaluador(page: number = 1, limit: number = 5, search: string = '') {
    return this.http.get<any>(this.apiUrl_dirigida, {
      params: { page, limit, search }
    });
  }
  
  //Crea un nuevo registro de tabla Cambio (POST)
  createEvaluador(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl_dirigida, data);
  }

  //Actualiza un registro de tabla Cambio existente por su ID (PUT)
  updateEvaluador(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl_dirigida}/${id}`, data);
  }
  
  //Elimina un registro de tabla Cambio por su ID (DELETE)
  deleteEvaluador(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl_dirigida}/${id}`);
  }
}//de class
