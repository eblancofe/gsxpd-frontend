/**
 * ---------------------------------------------------------------
 *  Archivo:        users-form.ts
 *  Descripción:    COMPONENTE->Realiza y es encargado de crear y editar usuarios del sistema, 
 *                  gestionando un formulario reactivo con validación y carga de datos en modo edición.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Construye un formulario reactivo para crear o editar usuarios.
 *    - Carga los datos del usuario en modo edición.
 *    - Permite actualizar o crear usuarios según el contexto.
 *    - Redirige al listado de usuarios tras guardar.
 * ---------------------------------------------------------------
 */
//Componente de Angular para crear o editar usuarios
//Usa un formulario reactivo con validación y manejo de estados
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

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
  selector: 'app-users-form',
  standalone: true,
  templateUrl: './users-form.html',
  styleUrl: './users-form.scss',
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
export class UsersFormComponent implements OnInit {
  form: any; //Formulario reactivo
  id!: number; //ID del usuario (si está editando)
  editando = false; //Indica si es modo edición

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    //Creamos el  formulario primero con sus correspondientes validaciones
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // opcional en edición
      role: ['', Validators.required],
      isActive: [true]
    });

    //Detectamos el modo edición (si hay ID en URL)
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.editando = !!this.id;

    //Cargamos los datos del formulario si es edición
    if (this.editando) {
      this.usersService.getById(this.id).subscribe(user => {
        this.form.patchValue({
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive
        });
      });
    }
    else {
      //Password obligatoria SÓLO en creación de nuevo usuario
      this.form.get('password')?.addValidators(Validators.required);
    }
  }

  guardar() {   //Guarda el formulario (crea o actualiza)
    const payload = { ...this.form.value };    
    if (!payload.password) delete payload.password; //No envía la contraseña si está vacía (modo edición)

    if (this.editando) {
      this.usersService.updateUser(this.id, payload).subscribe({
        next: () => {
          this.mostrarExito('El Usuario se ha actualizado correctamente');
          this.router.navigate(['/usuarios']);
        },
          error: () => {
            this.mostrarError('Error al actualizar el Usuario');
          }            
      });
    } else { //Crea nuevo usuario
      this.usersService.createUser(payload).subscribe({
        next: () => {
          this.mostrarExito('El Usuario se ha creado correctamente');
          this.router.navigate(['/usuarios']);
        },
          error: () => {
            this.mostrarError('Error al crear Usuario');
          }           
      });
    }
  }

  mostrarExito(mensaje: string) { //Muestra mensaje de éxito
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //duración menaje 4 Seg.
        panelClass: ['snackbar-exito'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  mostrarError(mensaje: string) { //Muestra mensaje de error
    this.snackBar.open(
      mensaje,
      'Cerrar',
      {
        duration: 4000, //duración menaje 4 Seg.
        panelClass: ['snackbar-error'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      }
    );
  }

  volver() { //Vuelve a la página anterior
    this.router.navigate(['/gestion']);
  }
}//de class



