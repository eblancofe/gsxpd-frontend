/**
 * ---------------------------------------------------------------
 *  Archivo:        evaluador-form.component.ts
 *  Descripción:    COMPONENTE->Realiza y es encargado de crear y editar evaluadores externos (ASBO), 
 *                  gestionando un formulario reactivo con validación y cargando la lista de países 
 *                  desde el backend.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 17/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Construye un formulario reactivo para crear o editar evaluadores.
 *    - Carga los datos existentes al editar y obtiene la lista de países.
 *    - Guarda los cambios y redirige al listado de evaluadores.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EvaluadorService } from '../../../services/evaluador.service';
import { PaisesService } from '../../../services/paises.service';

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
  selector: 'app-evaluador-form',
  standalone: true,
  templateUrl: './evaluador-form.html',
  styleUrl: './evaluador-form.scss',
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
export class EvaluadorFormComponent implements OnInit {
  //declaración de variables necesarias del componente
  form: any; //Formulario reactivo
  id!: number; //ID del experto (si se está editando)
  editando = false; //Indica si estamos editando o creando
  paises: any[] = []; //Lista de países para el selector

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private evaluadorService: EvaluadorService,
    private paisesService: PaisesService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() { //iniciamos el componente y realizamos función
    const id = this.route.snapshot.paramMap.get('id');
    this.cargarPaises(); //Carga la lista de países al iniciar

    if (id) { 
      this.evaluadorService.getById(+id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Evaluador,
          pais: exp.pais_Evaluador,
          direccion: exp.direccion_Evaluador,
          postal: exp.postal_Evaluador,
          ciudad: exp.ciudad_Evaluador,
          telefono: exp.telefono_Evaluador,
          email: exp.email_Evaluador,
          contacto: exp.contacto_Evaluador,
          web: exp.web_Evaluador
        });
      });
    }    
    //Crea el formulario con validaciones
    //AHORA SÍ: fb ya existe
    this.form = this.fb.group({ 
      nombre: ['', Validators.required], //Campo obligatorio
      pais: ['', Validators.required], //Campo obligatorio
      direccion: [''],
      postal: [''],
      ciudad: [''],
      telefono: ['', [Validators.required, Validators.pattern(/^\+?[0-9 ]{7,15}$/)]], //Campo obligatorio
      email: ['', [Validators.required, Validators.email]], //Campo obligatorio
      contacto: ['', Validators.required], //Campo obligatorio
      web: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/)]] //Campo obligatorio
    });

    //Obtiene el ID de la URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editando = !!this.id; //Si hay ID, es modo edición    

    if (this.editando) { //Si está editando, carga los datos del evaluador
      this.evaluadorService.getById(this.id).subscribe(exp => {
        this.form.patchValue({
          nombre: exp.nombre_Evaluador,
          pais: exp.pais_Evaluador,
          direccion: exp.direccion_Evaluador,
          postal: exp.postal_Evaluador,
          ciudad: exp.ciudad_Evaluador,
          telefono: exp.telefono_Evaluador,
          email: exp.email_Evaluador,
          contacto: exp.contacto_Evaluador,
          web: exp.web_Evaluador
        });
      });
    }
  }
  
  guardar() { //Guarda el formulario (crea o actualiza)
    console.log("DATOS QUE ENVÍO:", this.form.value); //comprobación
    const payload = this.form.value;

    if (this.editando) { //Actualiza evaluador existente
      this.evaluadorService.updateEvaluador(this.id, payload).subscribe({
        next: () => {
          this.mostrarExito('Evaluador (AsBo) se ha actualizado correctamente');
          this.router.navigate(['/evaluador']);
        },
          error: () => {
            this.mostrarError('Error al actualizar Evaluador (AsBo)');
          }    
      });
    } else { //Crea nuevo evaluador si no tiene ID
      this.evaluadorService.createEvaluador(payload).subscribe({
        next: () => {
          this.mostrarExito('Evaluador (AsBo) se ha creado correctamente');
          this.router.navigate(['/evaluador']);
        },
          error: () => {
            this.mostrarError('Error al crear Evaluador (AsBo)');
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
    this.router.navigate(['/evaluador']);
  }

  cargarPaises() { //Carga la lista de países desde el servicio
    this.paisesService.getAll().subscribe(res => {
      this.paises = res;
      this.cdr.detectChanges(); //Fuerza a Angular a refrescar la vista
    });
  }
}//de class
