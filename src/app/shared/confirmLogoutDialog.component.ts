import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-confirm-logout-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    template: `
    <h2 mat-dialog-title>Confirmar cierre de sesión</h2>

    <mat-dialog-content>
      <p>¿Seguro que deseas cerrar sesión?</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">No</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        Sí, cerrar sesión
      </button>
    </mat-dialog-actions>
  `
})
export class ConfirmLogoutDialogComponent { }
