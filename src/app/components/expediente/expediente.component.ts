/**
 * ---------------------------------------------------------------
 *  Archivo:        expediente.component.ts
 *  Descripción:    COMPONENTE->Realiza la función principal del módulo de expedientes.
 *                  Muestra la información del usuario autenticado y permite cerrar sesión desde la interfaz.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 15/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene el nombre y rol del usuario desde sessionStorage.
 *    - Permite cerrar sesión mediante AuthService.
 *    - Redirige al login tras finalizar la sesión.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RouterModule } from '@angular/router';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutDialogComponent } from '../../shared/confirmLogoutDialog.component';

@Component({
  selector: 'app-expediente',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './expediente.component.html',
  styleUrl: './expediente.component.scss',
})

export class ExpedienteComponent {
  username = sessionStorage.getItem('username');
  role = sessionStorage.getItem('role');

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

  volver_panel() { //Navega de vuelta al panel de control
    this.router.navigate(['/configuracion']);
  }
}//de class
