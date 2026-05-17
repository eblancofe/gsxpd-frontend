/**
 * ---------------------------------------------------------------
 *  Archivo:        app.component.ts
 *  Descripción:    Componente raíz de la aplicación Angular. Gestiona
 *                  la estructura principal del sistema, incluyendo la
 *                  visualización del menú de navegación y el
 *                  enrutamiento global mediante RouterOutlet.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 01/03/2026
 *  Última modif.:  20/04/2026
 *
 *  Detalles:
 *    - Implementado como componente standalone para simplificar la arquitectura y evitar módulos innecesarios.
 *    - Escucha los eventos de navegación para determinar si debe mostrarse el menú lateral, ocultándolo 
 *    automáticamente en la pantalla de login.
 *    - Contiene el RouterOutlet que actúa como contenedor dinámico para todas las vistas del sistema.
 * ---------------------------------------------------------------
 */
//Importa librerías necesarias de Angular
import { ChangeDetectorRef, Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent { 
  showNavbar = true;
  isLoginPage = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('URL actual:', event.urlAfterRedirects);
        const url = event.urlAfterRedirects.toLowerCase();

        //Mostrar u ocultar menú
        this.showNavbar = !url.includes('login');
        //Detectar si estamos en login
        this.isLoginPage = url.includes('/login');
        //actualizamos vista si detectamos cambios
        this.cdr.detectChanges();
      }
    });
  }
}//de class
