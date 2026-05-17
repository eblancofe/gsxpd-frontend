/**
 * ---------------------------------------------------------------
 *  Archivo:        significatividad-form.ts
 *  Descripción:    COMPONENTE->Realiza y es encargado de crear y editar niveles de significatividad, 
 *                  gestionando un formulario reactivo con validación y cargando los datos existentes al
 *                  editar un registro.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Construye un formulario reactivo para crear o editar niveles de significatividad.
 *    - Carga los datos existentes cuando se edita un registro.
 *    - Guarda los cambios y redirige al listado de significatividad.
 * ---------------------------------------------------------------
 */
//Importa herramientas de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SignificatividadService } from '../../../services/significatividad.service';

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
  selector: 'app-significatividad-form',
  standalone: true,
  templateUrl: './significatividad-form.html',
  styleUrl: './significatividad-form.scss',
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
export class SignificatividadFormComponent implements OnInit {
  //definimos variables a utilizar
  form: any; //Aquí se guardará el formulario
  id!: number; //ID del registro (si se está editando)
  editando = false; //Indica si estamos editando (true) o creando (false)

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private significatividadService: SignificatividadService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() { //iniciamos el componente y realizamos función
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.significatividadService.getById(+id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Significatividad
        });
      });
    }

    // AHORA SÍ: fb ya existe
    this.form = this.fb.group({ //Crea el formulario con validación
      nombre: ['', Validators.required] //Campo obligatorio
    });

    //Obtiene el ID de la URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editando = !!this.id; //Si hay ID, es modo edición

    if (this.editando) { //Si está editando, carga los datos del experto (EER)
      this.significatividadService.getById(this.id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Significatividad
        });
      });
    }
  }

  guardar() { //función guardar o editar registro según selección
    const payload = this.form.value;

    if (this.editando) { //Actualiza si ya existe
      this.significatividadService.updateSignificatividad(this.id, payload).subscribe({
        next: () => {
          this.mostrarExito('Significatividad de Expediente actualizado correctamente');
          this.router.navigate(['/significatividad']);
        },
          error: () => {
            this.mostrarError('Error al actualizar la Significatividad del Expediente');
          }        
      });
    } else { //Crea uno nuevo si no tiene ID
      this.significatividadService.createSignificatividad(payload).subscribe({
        next: () => {
          this.mostrarExito('Significatividad de Expediente creada correctamente');
          this.router.navigate(['/significatividad']);
        },
          error: () => {
            this.mostrarError('Error al crear la Significatividad del Expediente');
          }
      });
    }
  }

  //Muestra un mensaje de éxito
  mostrarExito(mensaje: string) {
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //duración mensaje 4 Seg.
        panelClass: ['snackbar-exito'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  //Muestra un mensaje de error  
  mostrarError(mensaje: string) {
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //duración mensaje 4 Seg.
        panelClass: ['snackbar-error'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  volver() { //Vuelve al listado
    this.router.navigate(['/significatividad']);
  }
}//de class
