/**
 * ---------------------------------------------------------------
 *  Archivo:        app.routes.ts
 *  Descripción:    Definición de las rutas principales de la aplicación, incluyendo la carga de componentes,
 *                  la protección mediante guards y la asignación de permisos por rol para cada sección del sistema.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  09/05/2026
 *
 *  Detalles:
 *    - Define rutas para módulos de administración, catálogos, expedientes e informes.
 *    - Aplica guards de autenticación y control de roles para restringir el acceso según permisos del usuario.
 *    - Incluye carga diferida (lazy loading) para componentes específicos como login, panel y gestión.
 *    - Establece la ruta por defecto redirigiendo al login.
 * ---------------------------------------------------------------
 */
//Importa librerías necesarias de Angular
import { Routes } from '@angular/router';
import { ExpertosListComponent } from './components/experto/expertos-list/expertos-list';
import { ExpertosFormComponent } from './components/experto/expertos-form/expertos-form';
import { TitularidadListComponent } from './components/titularidad/titularidad-list/titularidad-list';
import { TitularidadFormComponent } from './components/titularidad/titularidad-form/titularidad-form';
import { UnidadOrganizativaListComponent } from './components/unidad-organizativa/unidad-organizativa-list/unidad-organizativa-list';
import { UnidadOrganizativaFormComponent } from './components/unidad-organizativa/unidad-organizativa-form/unidad-organizativa-form';
import { CambioListComponent } from './components/cambio/cambio-list/cambio-list';
import { CambioFormComponent } from './components/cambio/cambio-form/cambio-form';
import { SignificatividadListComponent } from './components/significatividad/significatividad-list/significatividad-list';
import { SignificatividadFormComponent } from './components/significatividad/significatividad-form/significatividad-form';
import { EvaluadorListComponent } from './components/evaluador/evaluador-list/evaluador-list';
import { EvaluadorFormComponent } from './components/evaluador/evaluador-form/evaluador-form';
import { ConfiguracionComponent } from './components/configuracion/configuracion';
import { UsersListComponent } from './components/users/users-list/users-list';
import { UsersFormComponent } from './components/users/users-form/users-form';
import { ExpedientesListComponent } from './components/expedientes/expedientes-list/expedientes-list';
import { ExpedientesFormComponent } from './components/expedientes/expedientes-form/expedientes-form';
import { authGuard } from './auth/auth-guard';
import { roleGuard } from './auth/role-guard';
import { ExpedienteSelectComponent } from './components/expedientes/expediente-select/expediente-select.component';
import { ExpedienteInformeComponent } from './components/expedientes/expediente-informe/expediente-informe.component';
import { noAuthGuard } from './auth/no-auth.guard';
import { ExpedienteComponent } from './components/expediente/expediente.component';
import { InformeComponent } from './components/informe/informe.component';
import { ExpedienteInformeAnualComponent } from './components/expedientes/expediente-informe-anual/expediente-informe-anual.component';
import { ExpedienteInformeTitularidadComponent } from './components/expedientes/expediente-informe-titularidad/expediente-informe-titularidad.component';
import { ExpedienteInformeOrganizativaComponent } from './components/expedientes/expediente-informe-organizativa/expediente-informe-organizativa.component';

export const routes: Routes = [

    // --- USUARIOS (solo admin) ---
    { path: 'usuarios', component: UsersListComponent, canActivate: [authGuard, roleGuard(['admin'])] },
    { path: 'usuarios/crear', component: UsersFormComponent, canActivate: [authGuard, roleGuard(['admin'])] },
    { path: 'usuarios/editar/:id', component: UsersFormComponent, canActivate: [authGuard, roleGuard(['admin'])] },

    {
        path: 'gestion',
        loadComponent: () =>
            import('./components/gestion/gestion.component').then(m => m.GestionComponent),
        canActivate: [authGuard, roleGuard(['admin'])]
    },

    // --- CONFIGURACIÓN (admin + eer) ---
    { path: 'configuracion', component: ConfiguracionComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },

    // --- EXPERTOS (admin + err) ---
    { path: 'expertos', component: ExpertosListComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'expertos/crear', component: ExpertosFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'expertos/editar/:id', component: ExpertosFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },

    // --- TITULARIDAD (admin + eer) ---
    { path: 'titularidad', component: TitularidadListComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'titularidad/crear', component: TitularidadFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'titularidad/editar/:id', component: TitularidadFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },

    // --- UNIDAD ORGANIZATIVA (admin + eer) ---
    { path: 'unidad-organizativa', component: UnidadOrganizativaListComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'unidad-organizativa/crear', component: UnidadOrganizativaFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'unidad-organizativa/editar/:id', component: UnidadOrganizativaFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },

    // --- CAMBIO (admin + eer) ---
    { path: 'cambio', component: CambioListComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'cambio/crear', component: CambioFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'cambio/editar/:id', component: CambioFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },

    // --- SIGNIFICATIVIDAD (admin + eer) ---
    { path: 'significatividad', component: SignificatividadListComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'significatividad/crear', component: SignificatividadFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'significatividad/editar/:id', component: SignificatividadFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },

    // --- EVALUADOR (admin + eer) ---
    { path: 'evaluador', component: EvaluadorListComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'evaluador/crear', component: EvaluadorFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'evaluador/editar/:id', component: EvaluadorFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },

    // --- EXPEDIENTES (admin + secretaria + eer) ---
    { path: 'expedientes', component: ExpedientesListComponent, canActivate: [authGuard, roleGuard(['admin', 'secretaria', 'eer'])] },
    { path: 'expedientes/crear', component: ExpedientesFormComponent, canActivate: [authGuard, roleGuard(['admin', 'eer'])] },
    { path: 'expedientes/editar/:id', component: ExpedientesFormComponent, canActivate: [authGuard, roleGuard(['admin', 'secretaria', 'eer'])] },
    { path: 'expediente', component: ExpedienteComponent, canActivate: [authGuard, roleGuard(['admin', 'secretaria', 'eer'])] },

    // --- INFORMES (admin + secretaria + lectura) ---
    { path: 'expedientes/seleccionar', component: ExpedienteSelectComponent, canActivate: [authGuard, roleGuard(['admin', 'secretaria', 'lectura'])] },
    { path: 'expedientes/informe/:id', component: ExpedienteInformeComponent, canActivate: [authGuard, roleGuard(['admin', 'secretaria', 'lectura'])] },
    { path: 'informe', component: InformeComponent, canActivate: [authGuard, roleGuard(['admin', 'secretaria', 'lectura'])] },
    { path: 'informe/anual', component: ExpedienteInformeAnualComponent, canActivate: [authGuard, roleGuard(['admin', 'secretaria', 'lectura'])] },
    { path: 'informe/titularidad', component: ExpedienteInformeTitularidadComponent, canActivate: [authGuard, roleGuard(['admin', 'secretaria', 'lectura'])] },
    { path: 'informe/direcciones', component: ExpedienteInformeOrganizativaComponent, canActivate: [authGuard, roleGuard(['admin', 'secretaria', 'lectura'])] },

    // --- LOGIN ---
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login/login.component').then(m => m.LoginComponent),
        canActivate: [noAuthGuard]
    },

    // --- PANEL (cualquier usuario autenticado) ---
    {
        path: 'panel',
        loadComponent: () =>
            import('./components/panel/panel.component').then(m => m.PanelComponent),
        canActivate: [authGuard]
    },

    // --- REDIRECCIÓN ---
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // --- RUTA COMODÍN (cualquier URL desconocida que nos dirija a login) ---
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
