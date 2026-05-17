/**
 * ---------------------------------------------------------------
 *  Archivo:        informe.component.ts
 *  Descripción:    COMPONENTE->Realiza la principal del módulo de informes, encargado de 
 *                  mostrar la información del usuario autenticado y permitir el cierre de sesión.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene el nombre y rol del usuario desde sessionStorage.
 *    - Permite cerrar sesión mediante AuthService.
 *    - Redirige al login tras finalizar la sesión.
 * ---------------------------------------------------------------
 */
//Importaciones básicas de Angular
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
  selector: 'app-informe',
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
  templateUrl: './informe.component.html',
  styleUrl: './informe.component.scss',
})
export class InformeComponent {
  username = sessionStorage.getItem('username'); //Nombre del usuario guardado en sesión
  role = sessionStorage.getItem('role'); //Rol del usuario guardado en sesión

  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) { }

  logout() { //cierre de sesión
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      width: '360px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        setTimeout(() => {
          this.authService.logout(); //Limpia la sesión     
          this.router.navigate(['/login']); //Redirige al login
        });
      }
    });
  }
}//de class
