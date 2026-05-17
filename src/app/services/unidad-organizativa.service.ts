/**
 * ---------------------------------------------------------------
 *  Archivo:        unidad-organizativa.service.ts
 *  Descripción:    SERVICIO->Realiza y es encargado de gestionar las operaciones CRUD relacionadas
 *                  con las unidades organizativas, comunicándose con la API REST del backend.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  17/05/2026
 *
 *  Detalles:
 *    - Obtiene listados paginados y filtrados de unidades organizativas.
 *    - Proporciona un método específico para cargar datos en combos.
 *    - Permite consultar una unidad organizativa por ID.
 *    - Gestiona la creación, actualización y eliminación de registros.
 *    - Centraliza las peticiones HTTP al endpoint /unidad-organizativa.
 * ---------------------------------------------------------------
 */
//Importa decoradores y servicios necesarios de Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' }) //servicio disponible en toda la aplicación

export class UnidadOrganizativaService {
  //URL base de la API para gestionar la tabla unidad_organizativa
  //private api = 'http://localhost:3000/unidad-organizativa'; 
  private apiUrl = environment.apiUrl;
  private apiUrl_dirigida = `${this.apiUrl}/unidad-organizativa`;

  constructor(private http: HttpClient) { } //Inyecta HttpClient para hacer peticiones HTTP

  //Obtiene todas las unidades con paginación y búsqueda (valores por defecto)
  //Valores por defecto: página 1, 100 totales, sin búsqueda
  getAll(page: number = 1, limit: number = 100, search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}?page=${page}&limit=${limit}&search=${search}`);
  } 
  
  //Obtiene todas las unidades (sin paginar), útil para combos/selectores
  getAllCombo() {
    return this.http.get<any[]>(this.apiUrl_dirigida);
  }

  //Obtiene una unidad específica por su ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}/${id}`);
  }

  //Obtiene una unidad específica por sus parámetros
  getUnidadOrganizativa(page: number = 1, limit: number = 5, search: string = '') {
    return this.http.get<any>(this.apiUrl_dirigida, {
      params: { page, limit, search }
    });
  }

  //Crea una nueva unidad organizativa (POST)
  createUnidadOrganizativa(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl_dirigida, data);
  }

  //Actualiza una unidad existente por su ID (PUT)
  updateUnidadOrganizativa(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl_dirigida}/${id}`, data);
  }

  //Elimina una unidad por su ID (DELETE)
  deleteUnidadOrganizativa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl_dirigida}/${id}`);
  }
}//de class
