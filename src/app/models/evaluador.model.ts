/**
 * ---------------------------------------------------------------
 *  Archivo:        evaluador.interface.ts
 *  Descripción:    Interfaz que define la estructura de un evaluador
 *                  externo, utilizada para tipar los datos recibidos
 *                  desde el backend y garantizar consistencia en el
 *                  modelo de información.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Define los campos principales asociados a un evaluador externo:
 *      identificación, datos de contacto, ubicación y sitio web.
 * ---------------------------------------------------------------
 */
//Define la estructura de tabla Evaluador (AsBo)
//Sirve como molde para asegurar que los datos tengan el formato correcto
export interface Evaluador {
    id: number; //Identificador único (obligatorio)
    nombre_Evaluador: string; //Nombre del evaluador (obligatorio)
    pais_Evaluador: string; //País del evaluador (obligatorio)
    direccion_Evaluador: string; //Dirección del evaluador (obligatorio)
    postal_Evaluador: number; //Código postal (obligatorio)
    ciudad_Evaluador: string; //Ciudad del evaluador (obligatorio)
    telefono_Evaluador: string; //Teléfono de contacto (obligatorio)
    email_Evaluador: string; //Correo electrónico (obligatorio)
    contacto_Evaluador: string; //Persona de contacto (obligatorio)
    web_Evaluador: string; //Sitio web del evaluador (obligatorio)
}//de Evaluador
