/**
 * ---------------------------------------------------------------
 *  Archivo:        expedientes-list.component.ts
 *  Descripción:    COMPONENTE->Realiza y muestra el listado paginado de
 *                  expedientes, permitiendo buscarlos, editarlos o eliminarlos desde la interfaz.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/04/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene expedientes paginados desde el backend con soporte de búsqueda.
 *    - Permite navegar entre páginas y refrescar los datos dinámicamente.
 *    - Incluye acciones para editar o eliminar expedientes desde la lista.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular y Material
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ExpedientesService } from '../../../services/expedientes.service';

//Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../../../shared/confirmDeleteDialog.component';

@Component({
  selector: 'app-expedientes-list',
  standalone: true,
  templateUrl: './expedientes-list.html',
  styleUrl: './expedientes-list.scss',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule
  ]
})

export class ExpedientesListComponent implements OnInit, AfterViewInit {
  //Columnas que se muestran en la tabla
  columnas = ['nombre_actuacion', 'nombre_subactuacion', 'nombre_actuacion_particular', 'acciones'];
  dataSource = new MatTableDataSource<any>([]); //Fuente de datos para la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator; //Referencia a la paginación

  constructor(
    private expedientesService: ExpedientesService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; //asignamos datos antes de iniciar DOM    
  }
  //declaramos variables a utilizar
  page = 1; //empieza en pág.1
  limit = 5; //con límite de 5 registros x pág.
  lastPage = 1; //última pág.1 al inicio
  search = ''; //búsqueda en vacío
  userRole = (sessionStorage.getItem('role') || '').toLowerCase(); //obtenemos el rol de usuario actual

  ngOnInit() {
    this.cargarExpediente(); 
  }

  cargarExpediente() { //Carga la lista de expedientes desde el servicio
    this.expedientesService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        this.dataSource.data = res.data; // Asigna los datos
        this.lastPage = Math.ceil(res.total / this.limit); // Calcula el total de páginas
      });
  }

  filtrar(event: Event) { 
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nextPage() { //Cambia de página (siguiente)
    if (this.page < this.lastPage) {
      this.page++;
      this.cargarExpediente();
    }
  }

  prevPage() { //Página anterior (atrás)
    if (this.page > 1) {
      this.page--;
      this.cargarExpediente();
    }
  }

  editExpedientes(user: any) { //Navega al formulario de edición
    this.router.navigate(['/expedientes/editar', user.id]);
  }

  deleteExpedientes(id: number) { //Elimina un expediente
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
        width: '380px',
        disableClose: true      
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.expedientesService.deleteExpedientes(id).subscribe(() => { 
          //Actualiza la lista eliminando el expediente
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
        });
      }
    });
  }
}//de class