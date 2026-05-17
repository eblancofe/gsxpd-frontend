/**
 * ---------------------------------------------------------------
 *  Archivo:        titularidad-form.ts
 *  Descripción:    COMPONENTE-> Realiza y es encargado de crear y editar tipos de titularidad, 
 *                  gestionando un formulario reactivo con validación y cargando los datos existentes
 *                  al editar un registro.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Construye un formulario reactivo para crear o editar tipos de titularidad.
 *    - Carga los datos existentes cuando se edita un registro.
 *    - Guarda los cambios y redirige al listado de titularidad.
 * ---------------------------------------------------------------
 */
//Importa herramientas de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TitularidadService } from '../../../services/titularidad.service';

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
  selector: 'app-titularidad-form',
  standalone: true,
  templateUrl: './titularidad-form.html',
  styleUrl: './titularidad-form.scss',
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
export class TitularidadFormComponent implements OnInit {
  //definimos variables a utilizar
  form: any; //Aquí se guarda el formulario
  id!: number; //ID del registro (si se está editando)
  editando = false; //Indica si es edición (true) o creación (false)

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titularidadService: TitularidadService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {  //Se ejecuta al cargar el componente
    const id = this.route.snapshot.paramMap.get('id'); //Obtiene el ID de la URL (si existe)

    if (id) {
      this.titularidadService.getById(+id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Titularidad
        });
      });
    }

    //Crea el formulario con validación
    this.form = this.fb.group({ //AHORA SÍ: fb ya existe
      nombre: ['', Validators.required] //Campo obligatorio   
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editando = !!this.id; //Si hay ID, es modo edición

    if (this.editando) { //Si está editando, carga los datos del registro
      this.titularidadService.getById(this.id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Titularidad          
        });
      });
    }
  }

  guardar() { //Guarda el formulario (crear o editar)
    const payload = this.form.value; //Obtiene los datos del formulario

    if (this.editando) { //Si es edición, actualiza
      this.titularidadService.updateTitularidad(this.id, payload).subscribe({
        next: () => {          
          this.mostrarExito('La Titularidad se ha actualizado correctamente');
          this.router.navigate(['/titularidad']);
        },
        error: () => {
          this.mostrarError('Error al actualizar la Titularidad de la línea');
        }  
      });
    } else { //Si es nuevo, crea
      this.titularidadService.createTitularidad(payload).subscribe({
        next: () => {
          this.mostrarExito('Titularidad de la línea se ha creado correctamente');
          this.router.navigate(['/titularidad']);
        },
        error: () => {
          this.mostrarError('Error al crear la Titularidad del Expediente');
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
    this.router.navigate(['/titularidad']);
  }
}//de class
