/**
 * ---------------------------------------------------------------
 *  Archivo:        expedientes.interface.ts
 *  Descripción:    Interfaz que define la estructura completa de un
 *                  expediente digital, organizada en bloques temáticos
 *                  que representan la información general, extractos,
 *                  significatividad, gestión compartida, pruebas de
 *                  aplicación e informes de seguridad (AsBo).
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Modelo principal del sistema, que agrupa toda la información asociada a un expediente digital.
 *    - Incluye relaciones con tablas auxiliares: Experto EER, Unidad Organizativa, Titularidad, 
 *      Cambio, Significatividad y Evaluadores externos.
 *    - Organiza los datos en seis bloques: General, Extracto, Significatividad, Ficha de Gestión 
 *      Compartida (FGC), Informe de Pruebas de Aplicación (IPA) y AsBo.
 * ---------------------------------------------------------------
 */
// Define la estructura de tabla Expedientes
// Sirve como molde para asegurar que los datos tengan el formato correcto
export interface Expedientes {
    id: number;
    //1º bloque (General)
    nombre_ExpertoEER: string; //relación con tabla Experto/nombre_EER
    nombre_DG: string; //relación con tabla unidad-organziativa/nombre_UnidadOrganizativa
    nombre_Titular_Linea: string; ////relación con tabla Titularidad/nombre_Titularidad
    nombre_Actuacion: string; //campo nombre de la Actuación Global del expediente
    nombre_Subactuacion: string; //campo nombre de la Subactuación Global del 
    nombre_Actuacion_Particular: string; //campo nombre de la Actuación Particular del expediente
    nombre_Carpeta: string; //campo nombre de la Carpeta del registro del expediente
    //2º bloque (Extracto)
    nombre_Extracto: string; //campo nombre del extracto de la Definición del Sistema (DS)
    nombre_Extracto_Referencia: string; //campo nombre de Referencia del extracto de la (DS)    
    nombre_Extracto_Version: string; //campo nombre de la versión Referencia del extracto de la (DS)
    nombre_Extracto_EEFF: boolean; //campo Sí/No sobre envío de Extracto a EEFF
    nombre_Extracto_Fecha: Date; //campo Fecha() sobre la realziación del envío de Extracto a EEFF
    nombre_Extracto_Archivo: string; //campo nombre de la ubicación de la carga del Extracto de la DS
    //3º bloque (Significatividad)
    nombre_Cambio_Tipo: string; //relación con tabla Cambio/nombre_Cambio
    nombre_Cambio_Titulo: string; //campo con el título del cambio del expediente
    nombre_Cambio_Significativo: string; //relación con tabla Significatividad/nombre_Significatividad
    nombre_Cambio_Version: string; //campo con la versión del documento de Significatividad
    nombre_Cambio_Fecha: Date; //campo Fecha() sobre la fecha del documento de Significatividad    
    nombre_Cambio_Archivo: string; //campo nombre de la ubicación de la carga del documento de Significatividad
    
    //4º bloque (Ficha Gestión Compartida)
    nombre_FGC: string; //campo nombre de Ficha de Gestión Compartida (FGC)
    nombre_FGC_Version: string; //campo con la versión del documento de (FGC)
    nombre_FGC_Fecha: Date; //campo Fecha() sobre la fecha de Ficha de Gestión Compartida (FGC)
    nombre_FGC_Archivo: string; //campo nombre de la ubicación de la carga de (FGC)
    
    //5º bloque (Informe Pruebas Aplicación)
    nombre_IPA: string; //campo nombre Informe Pruebas Aplicación (IPA)
    nombre_IPA_Referencia: String; //campo nombre de Referencia del documento (IPA)
    nombre_IPA_Version: string; //campo con la versión Referencia del documento (IPA)
    nombre_IPA_Fecha: Date; //campo Fecha sobre la fecha del documento (IPA)
    nombre_IPA_Archivo: string; //campo nombre de la ubicación de la carga de documento (IPA)    
    //6º bloque (AsBo)
    nombre_Evaluador_ASBO: string; //campo nombre del evaluador de seguridad (AsBo)
    nombre_Evaluador_Contrata: boolean; //campo Sí/No sobre subcontratación de evaluador (AsBo)
    nombre_Evaluador_Fecha_Prevista: Date; //campo Fecha() sobre fecha PREVISTA del evaluador (AsBo)
    nombre_Evaluador_Fecha_Ejecucion: Date; //campo Fecha() sobre fecha EJECUCIÓN del evaluador (AsBo)
    nombre_Evaluador_Version: string; //campo con la versión del documento evaluador (AsBo)
    nombre_Evaluador_Archivo: string; //campo nombre de la ubicación de la carga de documento evaluador (AsBo)
}//de Expedientes
