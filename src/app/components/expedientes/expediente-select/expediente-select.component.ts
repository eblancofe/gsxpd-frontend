/**
 * ---------------------------------------------------------------
 *  Archivo:        expediente-select.component.ts
 *  Descripción:    COMPONENTE->Realiza y muestra un listado paginado de
 *                  expedientes y permite seleccionar uno para acceder a su informe detallado.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/04/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene expedientes paginados desde el backend con búsqueda.
 *    - Permite seleccionar un expediente y navegar a su informe.
 *    - Gestiona paginación, búsqueda y refresco de datos.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpedientesService } from '../../../services/expedientes.service';
import { CommonModule } from '@angular/common';

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
  selector: 'app-expediente-select',
  standalone: true,  
  templateUrl: './expediente-select.component.html',
  styleUrls: ['./expediente-select.component.scss'],
  imports: [
    CommonModule, 
    FormsModule,
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
export class ExpedienteSelectComponent {
  //declaración de variables necesarias
  expedientes: any[] = []; //Lista de expedientes mostrada en la tabla
  expedienteSeleccionado: number | null = null; //ID del expediente seleccionado
  search = '';
  page = 1;
  limit = 10;
  total = 0;

  constructor(
    private expedientesService: ExpedientesService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  get lastPage() { //Calcula la última página según el total
    return Math.ceil(this.total / this.limit);
  }

  ngOnInit() { //al iniciar cargamos funciones
    this.loadData();
  }

  loadData() { //Carga los expedientes desde el backend
    this.expedientesService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        console.log('RESPUESTA BACKEND:', res);
        this.expedientes = res.data;
        this.total = res.total;
        this.cdr.detectChanges(); //Fuerza a Angular a refrescar la vista
      });
  }

  onSearchChange() { //Al escribir en el buscador, vuelve a la página 1 y recarga
    this.page = 1;
    this.loadData();
  }

  nextPage() { //siguiente página
    if (this.page < this.lastPage) {
      this.page++;
      this.loadData();
    }
  }

  prevPage() { // página anterior
    if (this.page > 1) {
      this.page--;
      this.loadData();
    }
  }

  verInforme() { //Navega al informe del expediente seleccionado
    if (this.expedienteSeleccionado) {
      this.router.navigate(['/expedientes/informe', this.expedienteSeleccionado]);
    }
  }

  volver_panel() { //Navega de vuelta al panel de Informe
    this.router.navigate(['/informe']);
  }
}//de class
