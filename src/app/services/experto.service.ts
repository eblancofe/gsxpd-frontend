/**
 * ---------------------------------------------------------------
 *  Archivo:        expertos.service.ts
 *  Descripción:    SERVICIO->Realiza y es encargado de gestionar las operaciones CRUD relacionadas 
 *                  con los expertos EER, comunicándose con la API REST del backend.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  09/05/2026
 *
 *  Detalles:
 *    - Obtiene listados paginados y filtrados de expertos EER.
 *    - Proporciona un método específico para cargar expertos en combos.
 *    - Permite consultar un experto por ID.
 *    - Gestiona la creación, actualización y eliminación de expertos.
 *    - Centraliza las peticiones HTTP al endpoint /expertos.
 * ---------------------------------------------------------------
 */
//Servicio de Angular para gestionar los expertos, permitiendo realizar operaciones CRUD comunicándose con una API REST
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';   

@Injectable({ providedIn: 'root' }) //servicio disponible en toda la aplicación

export class ExpertosService {
  //URL base de la API para los expertos (EER)
  //private api = 'http://localhost:3000/expertos'; 
  private apiUrl = environment.apiUrl;
  private apiUrl_dirigida = `${this.apiUrl}/expertos`;

  constructor(private http: HttpClient) { } //Inyecta HttpClient para hacer peticiones HTTP

  //Obtiene todos los expertos (sin paginar), útil para combos o selectores
  getAllCombo() {
    return this.http.get<any[]>(this.apiUrl_dirigida);
  }

  //Obtiene todos los expertos con paginación y búsqueda
  //Valores por defecto: página 1, 100 totales, sin búsqueda
  getAll(page: number = 1, limit: number = 100, search: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}?page=${page}&limit=${limit}&search=${search}`);
  }  

  //Obtiene un experto (EER) específico por su ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl_dirigida}/${id}`);
  }

  //Obtiene un experto (EER) específico por su parámetro
  getExpertos(page: number = 1, limit: number = 5, search: string = '') {
    return this.http.get<any>(this.apiUrl_dirigida, {
      params: { page, limit, search }
    });
  }

  //Crea un nuevo registro experto (EER) (POST)
  createExperto(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl_dirigida, data);
  }

  //Actualiza un registro experto (EER) existente por su ID (PUT)
  updateExperto(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl_dirigida}/${id}`, data);
  }

  //Elimina un registro experto (EER) por su ID (DELETE)
  deleteExperto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl_dirigida}/${id}`);
  }
}//de class
