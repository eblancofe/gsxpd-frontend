/**
 * ---------------------------------------------------------------
 *  Archivo:        expertos-form.ts
 *  Descripción:    COMPONENTE->Realiza y es encargado de crear y editar expertos internos (EER), 
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
 *    - Construye un formulario reactivo para crear o editar expertos.
 *    - Carga los datos del experto cuando se edita un registro.
 *    - Guarda los cambios y redirige al listado de expertos.
 * ---------------------------------------------------------------
 */
//Importaciones básicas de Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ExpertosService } from '../../../services/experto.service';

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
  selector: 'app-expertos-form',
  standalone: true,
  templateUrl: './expertos-form.html',
  styleUrl: './expertos-form.scss',
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
export class ExpertosFormComponent implements OnInit {
  //definimos variables a utilizar
  form: any; //Formulario reactivo
  id!: number; //ID del experto (si se está editando)
  editando = false; //Indica si se está editando un registro

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private expertosService: ExpertosService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() { //iniciamos el componente y realizamos función
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.expertosService.getById(+id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_EER,
          apellidos: exp.apellidos_EER,
        });
      });
    }    

    //AHORA SÍ entramos: fb ya existe
    this.form = this.fb.group({ //Crea el formulario con validación
      nombre: ['', Validators.required], //Campo obligatorio
      apellidos: ['', Validators.required] //Campo obligatorio
    });

    //Obtiene el ID de la URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editando = !!this.id; //Si hay ID, es modo edición

    if (this.editando) { //Si está editando, carga los datos del experto (EER)
      this.expertosService.getById(this.id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_EER,
          apellidos: exp.apellidos_EER
        });
      });
    }
  }

  guardar() { //función guardar o editar registro según selección
    const payload = this.form.value;

    if (this.editando) { //Actualiza si ya existe
      this.expertosService.updateExperto(this.id, payload).subscribe({
        next: () => {
          this.mostrarExito('Experto (EER) actualizado correctamente'); //mensaje satisfactorio
          this.router.navigate(['/expertos']);
        },
          error: () => {
            this.mostrarError('Error al actualizar Experto (EER)'); //mensaje erróneo
          }        
      });
    } else { //Crea uno nuevo si no tiene ID
      this.expertosService.createExperto(payload).subscribe({
        next: () => {
          this.mostrarExito('Experto (EER) creado correctamente'); //mensaje satisfactorio
          this.router.navigate(['/expertos']);
        },
          error: () => {
            this.mostrarError('Error al crear Experto (EER)'); //mensaje erróneo
          }        
      });
    }
  }

  mostrarExito(mensaje: string) { //función muestra mensaje satisfactorio
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //mostramos mensaje 4 Seg.
        panelClass: ['snackbar-exito'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  mostrarError(mensaje: string) { //función muestra mensaje error
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //mostramos mensaje 4 Seg.
        panelClass: ['snackbar-error'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  volver() { //función volver a ruta
    this.router.navigate(['/expertos']);
  }
}//de class
