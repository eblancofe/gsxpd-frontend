/**
 * ---------------------------------------------------------------
 *  Archivo:        significatividad.interface.ts
 *  Descripción:    Interfaz que define la estructura de un nivel de
 *                  significatividad, utilizada para tipar los datos
 *                  recibidos desde el backend y mantener coherencia
 *                  en el modelo de información.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Define el identificador y el nombre del nivel de significatividad.
 * ---------------------------------------------------------------
 */
// Define la estructura de tabla Significatividad
// Sirve como molde para asegurar que los datos tengan el formato correcto
export interface Significatividad {
    id: number; //Identificador único (obligatorio)
    nombre_Significatividad: string; //Nombre del nivel de significatividad (obligatorio)
}//de Significatividad
