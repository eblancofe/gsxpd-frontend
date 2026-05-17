/**
 * ---------------------------------------------------------------
 *  Archivo:        unidad-organizativa.interface.ts
 *  Descripción:    Interfaz que define la estructura de una unidad
 *                  organizativa, utilizada para tipar los datos
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
 *    - Define el identificador y el nombre de la unidad organizativa.
 * ---------------------------------------------------------------
 */
// Define la estructura de tabla Unidad_Organizativa
// Sirve como molde para asegurar que los datos tengan el formato correcto
export interface Unidad_Organizativa {
    id: number; //Identificador único (obligatorio)
    nombre_UnidadOrganizativa: string; //Nombre de la unidad organizativa (obligatorio)
} //de Unidad_Organizativa 
