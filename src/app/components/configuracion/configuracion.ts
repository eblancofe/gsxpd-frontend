/**
 * ---------------------------------------------------------------
 *  Archivo:        configuracion.component.ts
 *  Descripción:    COMPONENTE->Realiza y muesta la configuración del usuario que muestra
 *                  su nombre y rol, y permite cerrar sesión desde la interfaz principal del sistema.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 04/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene el usuario y rol almacenados en sessionStorage.
 *    - Permite cerrar sesión mediante AuthService.
 *    - Redirige al login tras finalizar la sesión.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { ConfirmLogoutDialogComponent } from '../../shared/confirmLogoutDialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [
    RouterLink, 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.scss',
})
export class ConfiguracionComponent {
  //Obtiene el nombre de usuario y rol desde la sesión
  username = sessionStorage.getItem('username');
  role = sessionStorage.getItem('role');
  
  //Inyección de servicios para autenticación y navegación
  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) { }

  logout() { //función de cierre de sesión
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      width: '360px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        setTimeout(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        });
      }
    });
  }
}//de class
