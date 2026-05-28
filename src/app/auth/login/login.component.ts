/**
 * ---------------------------------------------------------------
 *  Archivo:        login.component.ts
 *  Descripción:    COMPONENTE->Realiza y es encargado de gestionar el inicio de sesión del
 *                  usuario, validando credenciales y redirigiendo al panel principal tras autenticarse.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/04/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Envía las credenciales al servicio de autenticación.
 *    - Gestiona errores de login y muestra mensajes al usuario.
 *    - Redirige al panel principal tras un inicio de sesión válido.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-login',
  standalone: true, 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class LoginComponent {
  //definimos variables utilizar
  form: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private cdr: ChangeDetectorRef, 
    private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.form.invalid) { //si el formulario no es válido
      this.form.markAllAsTouched(); //Marca los controles del formulario para mostrar errores 
      //this.form.updateValueAndValidity(); //actualiza los valores del formulario
      this.errorMessage = 'Debes introducir usuario y contraseña';
      this.cdr.detectChanges(); //si detecta cambios, actualiza vista
      return;
    }

    this.errorMessage = '';

    const { username, password } = this.form.value;
    
    this.authService.login({ 
      username: username.toLowerCase(), //convertimos siempre usuario a minúsculas
      password: password 
    })
      .subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.access_token); //Guardar token correctamente
          this.router.navigate(['/panel']); //Redirigir al panel de control
        },
        error: (err) => { //Mostrar mensaje real del backend
            console.error('Error de login:', err);
            this.errorMessage =
              err?.error?.message ||
              err?.message ||
              'Usuario o contraseña incorrectos';
            this.cdr.detectChanges(); //si detecta cambios, actualiza vista
        }
    });
  }
}//de class
