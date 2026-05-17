/**
 * ---------------------------------------------------------------
 *  Archivo:        user.interface.ts
 *  Descripción:    Interfaz que define la estructura básica de un
 *                  usuario del sistema, utilizada para tipar los datos
 *                  recibidos desde el backend y mantener coherencia en
 *                  el modelo de información.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Define el identificador opcional y los datos principales del usuario:
 *      nombre y correo electrónico.
 * ---------------------------------------------------------------
 */
// Define la estructura de tabla User (usuario), con las propiedades debe tener un usuario
export interface User {
    id?: string; //ID del usuario (opcional, puede no existir)
    nombre_User: string; //Nombre del usuario (obligatorio)
    email_User: string; //Correo electrónico del usuario (obligatorio)
}//de User