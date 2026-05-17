/**
 * ---------------------------------------------------------------
 *  Archivo:        experto.interface.ts
 *  Descripción:    Interfaz que define la estructura de un experto EER,
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
 *    - Define los campos principales asociados a un experto EER: identificación, nombre, apellidos.
 * ---------------------------------------------------------------
 */
// Define la estructura de tabla Experto
// Sirve como molde para asegurar que los datos tengan el formato correcto
export interface Experto {
    id: number; //Identificador único (obligatorio)
    nombre_EER: string; //Nombre del experto (obligatorio)
    apellidos_EER: string; //Apellidos del experto (obligatorio)
}//de Experto
