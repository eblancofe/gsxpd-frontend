/**
 * ---------------------------------------------------------------
 *  Archivo:        users.service.ts
 *  Descripción:    SERVICIO->Realiza y es encargado de gestionar las operaciones CRUD 
 *                  relacionadas con los usuarios del sistema, comunicándose con la API REST del backend.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  17/05/2026
 *
 *  Detalles:
 *    - Obtiene listados paginados y filtrados de usuarios.
 *    - Permite consultar un usuario por ID.
 *    - Gestiona la creación, actualización (parcial mediante PATCH) y eliminación de usuarios.
 *    - Centraliza las peticiones HTTP al endpoint /users.
 * ---------------------------------------------------------------
 */
//Importa decoradores y servicios necesarios de Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' }) //servicio disponible en toda la aplicación

export class UsersService {
  //private apiUrl = 'http://localhost:3000/users'; //URL base de la API para gestionar usuarios
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }   //Inyecta HttpClient para hacer peticiones HTTP

  //Obtiene todos los usuarios con paginación y búsqueda (parámetros en la URL)
  getAll(page: number, limit: number, search: string) {
    return this.http.get<{ data: any[], total: number }>(`${this.apiUrl}?page=${page}&limit=${limit}&search=${search}`);
  }

  //Obtiene el usuario específico por su ID específico
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  //Obtiene usuarios con parámetros
  getUsers(page: number = 1, limit: number = 5, search: string = '') {
    return this.http.get<any>(this.apiUrl, {
      params: { page, limit, search }
    });
  }

  //Crea un nuevo usuario (POST)
  createUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  //Actualiza el usuario (usa PATCH para actualización parcial)
  updateUser(id: number, data: any): Observable<any> {
    //return this.http.put(`${this.apiUrl}/${id}`, data);
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }

  //Elimina el usuario por su ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //Activa el usuario (PATCH a una ruta específica)
  activateUser(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/activate`, {});
  }

  //Desactiva el usuario (PATCH a una ruta específica)
  deactivateUser(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/deactivate`, {});
  }
}//de class
