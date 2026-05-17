/**
 * ---------------------------------------------------------------
 *  Archivo:        cambio.interface.ts
 *  Descripción:    Interfaz que define la estructura de un cambio,
 *                  utilizada para tipar los datos recibidos desde el
 *                  backend y garantizar consistencia en el modelo.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Define el identificador y el nombre del cambio asociado.
 * ---------------------------------------------------------------
 */

//Define la estructura de tabla Cambio
//Sirve como molde para asegurar que los datos tengan el formato correcto
export interface Cambio {
    id: number; //Identificador único (obligatorio)
    nombre_Cambio: string; //Nombre del tipo de cambio (obligatorio)
}//de Cambio
