import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-confirm-delete-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatIconModule],
    template: `
    <h2 mat-dialog-title>Eliminar registro</h2>

    <mat-dialog-content>
      <p>¿Seguro que deseas eliminar este registro? Esta acción no se puede deshacer.</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancelar</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">Aceptar</button>
    </mat-dialog-actions>
  `  
})
export class ConfirmDeleteDialogComponent { }
