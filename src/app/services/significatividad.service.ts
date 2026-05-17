/**
 * ---------------------------------------------------------------
 *  Archivo:        significatividad.service.ts
 *  Descripción:    SERVICIO->Realiza y es encargado de gestionar las operaciones CRUD relacionadas
 *                  con los niveles de significatividad, comunicándose con la API REST del backend.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  17/05/2026
 *
 *  Detalles:
 *    - Obtiene listados paginados y filtrados de niveles de significatividad.
 *    - Proporciona un método específico para cargar datos en combos.
 *    - Permite consultar un nivel de significatividad por ID.
 *    - Gestiona la creación, actualización y eliminación de registros.
 *    - Centraliza las peticiones HTTP al endpoint /significatividad.
 * ---------------------------------------------------------------
 */
//Importa decoradores y servicios necesarios de Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  

@Injectable({ providedIn: 'root' }) //servicio disponible en toda la aplicación

export class SignificatividadService {
  //URL base de la API para gestionar la tabla significatividad
  //private api = 'http://localhost:3000/significatividad'; 
  private apiUrl = environment.apiUrl;
  private apiUrl_dirigida = `${this.apiUrl}/significatividad`;

  constructor(private http: HttpClient) { } //Inyecta HttpClient para hacer peticiones HTTP

  //Obtiene todos los registro de significatividad con paginación y búsqueda
  //Valores por defecto: página 1, 100 totales, sin búsqueda
  getAll(page: number = 1, limit: number = 100, search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}?page=${page}&limit=${limit}&search=${search}`);
  }

  //Obtiene todos los registro de significatividad (sin paginar), útil para combos o selectores
  getAllCombo() {
    return this.http.get<any[]>(this.apiUrl_dirigida);
  }

  //Obtiene un registro de significatividad específico por su ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}/${id}`);
  }

  //Obtiene un registro de significatividad específico por su parámetro
  getSignificatividad(page: number = 1, limit: number = 5, search: string = '') {
    return this.http.get<any>(this.apiUrl_dirigida, {
      params: { page, limit, search }
    });
  }

  //Crea un nuevo registro de significatividad de significatividad (POST)
  createSignificatividad(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl_dirigida, data);
  }

  //Actualiza un registro de significatividad existente por su ID (PUT)
  updateSignificatividad(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl_dirigida}/${id}`, data);
  }

  //Elimina un registro de significatividad por su ID (DELETE)
  deleteSignificatividad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl_dirigida}/${id}`);
  }
}//de class
