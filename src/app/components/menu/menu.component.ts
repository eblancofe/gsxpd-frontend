/**
 * ---------------------------------------------------------------
 *  Archivo:        menu.component.ts
 *  Descripción:    COMPONENTE->Realiza y es encargado de construir dinámicamente el menú principal
 *                  del sistema según el rol del usuario autenticado, mostrando solo las opciones permitidas.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene el usuario y rol desde AuthService y sessionStorage.
 *    - Reconstruye el menú automáticamente al iniciar sesión o cambiar el rol.
 *    - Muestra opciones distintas para admin, secretaria, EER y lectura.
 *    - Permite cerrar sesión y redirige al login.
 * ---------------------------------------------------------------
 */
//Importaciones básicas de Angular
//import { Component } from '@angular/core';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutDialogComponent } from '../../shared/confirmLogoutDialog.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  //Nombre del usuario guardado en sesión
  username = sessionStorage.getItem('username');
  //Datos del usuario y estado de sesión
  usuario: any = null;
  loggedIn: boolean = false;
  role: string = '';
  //Opciones del menú que se mostrarán
  menuItems: { label: string, route: string }[] = [];

  @ViewChild('logoutDialog') logoutDialog!: TemplateRef<any>;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    //Escucha cambios en el estado de sesión
    this.authService.loggedIn$.subscribe(value => {
      this.loggedIn = value;

      if (this.loggedIn) {
        this.role = this.authService.getUser()?.role; //Obtiene el rol del usuario
        this.buildMenu(); //reconstruye el menú
      } else {
        this.menuItems = []; //vaciado de menú
      }
    });

    this.authService.user$.subscribe(user => {
      this.usuario = user;
    });
    this.loggedIn = this.authService.isLoggedIn(); //Verifica si ya hay sesión activa
  }

  buildMenu() { //construcción del menú de navegación
    this.menuItems = [];
    this.role = (this.authService.getUser()?.role || '').toLowerCase();

    //Opción común para todos
    this.menuItems.push({ label: 'Panel', route: '/panel' });

    // Opciones para Administrador
    //ADMINISTRACIÓN = CONFIGURACIÓN
    if (this.role === 'admin') {
      this.menuItems.push({ label: 'Gestión de usuarios', route: '/gestion' });
      this.menuItems.push({ label: 'Administración', route: '/configuracion' });
      this.menuItems.push({ label: 'Expediente', route: '/expediente' });
      //this.menuItems.push({ label: 'Informes', route: '/expedientes/seleccionar' });
      this.menuItems.push({ label: 'Informes', route: '/informe' });
    }
    
    //Opciones para secretaria
    if (this.role === 'secretaria') {
      //this.menuItems.push({ label: 'Secretaría', route: '/secretaria' });
      //this.menuItems.push({ label: 'Administración', route: '/configuracion' });
      this.menuItems.push({ label: 'Expediente', route: '/expedientes' });
      this.menuItems.push({ label: 'Informes', route: '/informe' });
    }

    // Opciones para usuarios avanzado (EER)
    if (this.role === 'eer') {
      this.menuItems.push({ label: 'Administración', route: '/configuracion' });
      this.menuItems.push({ label: 'Expediente', route: '/expediente' });
    }

    // Opciones para Visualizar (Lectura)
    if (this.role === 'lectura') {
      this.menuItems.push({ label: 'Informes', route: '/informe' });
    }
  }

  logout() { //cierre de sesión      
    sessionStorage.removeItem('token'); //removemos datos de usuario
    this.loggedIn = false;
    this.usuario = null;
    this.authService.logout(); //Limpia la sesión    
    this.router.navigate(['/login']); //Redirige al login
  }

  cerrarSesion() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      width: '350px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado del diálogo:', result);      
        if (result) {
          setTimeout(() => {
            sessionStorage.removeItem('token'); //removemos datos de usuario
            this.loggedIn = false;
            this.usuario = null;
            this.authService.logout(); //Limpia la sesión    
            this.router.navigate(['/login']); //Redirige al login
            console.log('Sesión cerrada'); 
          });
        }      
    });
  }
}//de class
