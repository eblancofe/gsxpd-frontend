/**
 * ---------------------------------------------------------------
 *  Archivo:        titularidad.interface.ts
 *  Descripción:    Interfaz que define la estructura de un tipo de
 *                  titularidad, utilizada para tipar los datos
 *                  recibidos desde el backend y garantizar coherencia
 *                  en el modelo de información.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Define el identificador y el nombre del tipo de titularidad.
 * ---------------------------------------------------------------
 */
// Define la estructura de tabla Titularidad
// Sirve como molde para asegurar que los datos tengan el formato correcto
export interface Titularidad {
    id: number; //Identificador único (obligatorio)
    nombre_Titularidad: string; //Nombre del tipo de titularidad (obligatorio)
}//de Titularidad