/**
 * ---------------------------------------------------------------
 *  Archivo:        cambio-form.component.ts
 *  Descripción:    COMPONENTE->Realiza y es encargado de crear y editar tipos de cambio, 
 *                  gestionando un formulario reactivo con validación y guardando los datos en el backend.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Construye un formulario reactivo para crear o editar un tipo de cambio.
 *    - Carga los datos existentes cuando se edita un registro.
 *    - Guarda los cambios y redirige al listado de tipos de cambio.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CambioService } from '../../../services/cambio.service';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cambio-form',
  standalone: true,
  templateUrl: './cambio-form.html',
  styleUrl: './cambio-form.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ]
})
export class CambioFormComponent implements OnInit {
  //declaración de variables necesarias del componente
  form: any; //Formulario reactivo
  id!: number; //ID del experto (si se está editando)
  editando = false; //Indica si se está editando un registro

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cambioService: CambioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() { //carga al iniciar el componente
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) { //Indica si estamos editando o creando
      this.cambioService.getById(+id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Cambio
        });
      });
    }   

    //AHORA SÍ: fb ya existe
    this.form = this.fb.group({ //Crea el formulario con validaciones
      nombre: ['', Validators.required] //Campo obligatorio
    });

    //Obtiene el ID de la URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editando = !!this.id; //Si hay ID, es modo edición

    if (this.editando) { //Si está editando, carga los datos del cambio
      this.cambioService.getById(this.id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Cambio
        });
      });
    }
  }

  guardar() { //Guarda el formulario (crea o actualiza)
    const payload = this.form.value;

    if (this.editando) { //Actualiza el cambio existente
      this.cambioService.updateCambio(this.id, payload).subscribe({
        next: () => {
          this.mostrarExito('Tipo de Cambio se ha actualizado correctamente');
          this.router.navigate(['/cambio']);
        },
          error: () => {
            this.mostrarError('Error al actualizar el tipo de Cambio');
          }   
      });
    } else { //Crea nuevo cambio
      this.cambioService.createCambio(payload).subscribe({
        next: () => {
          this.mostrarExito('Tipo de Cambio se ha creado correctamente');
          this.router.navigate(['/cambio']);
        },
          error: () => {
            this.mostrarError('Error al crear tipo de Cambio');
          }            
      });
    }
  }

  mostrarExito(mensaje: string) { //Muestra un mensaje de éxito
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //mensaje duración 4 Seg.
        panelClass: ['snackbar-exito'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  mostrarError(mensaje: string) { //Muestra un mensaje de error
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //mensaje duración 4 Seg.
        panelClass: ['snackbar-error'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  volver() { //Navega de vuelta a la lista
    this.router.navigate(['/cambio']);
  }
}//de class
