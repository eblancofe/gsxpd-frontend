/**
 * ---------------------------------------------------------------
 *  Archivo:        titularidad-list.ts
 *  Descripción:    COMPONENTE->Realiza y que muestra el listado paginado de tipos de,
 *                  titularidad, permitiendo buscarlos, editarlos o eliminarlos desde la interfaz.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene tipos de titularidad paginados desde el backend.
 *    - Gestiona búsqueda, paginación y refresco de datos.
 *    - Permite editar o eliminar registros desde la lista.
 * ---------------------------------------------------------------
 */
//Importamos herramientas necesarias de Angular
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TitularidadService } from '../../../services/titularidad.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-titularidad-list',
  standalone: true,
  templateUrl: './titularidad-list.html',
  styleUrl: './titularidad-list.scss',
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

export class TitularidadListComponent implements OnInit, AfterViewInit {
  //Columnas que se muestran en la tabla: nombre y acciones (editar/eliminar)
  columnas = ['nombre', 'acciones'];
  //Fuente de datos para la tabla (almacena los registros que se muestran)
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator; //Referencia a paginación

  constructor(
    private titularidadService: TitularidadService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  
  ngAfterViewInit() { //ejecución después de que la vista se haya cargado
    this.dataSource.paginator = this.paginator;
  }
  //Definimos variables 
  page = 1;
  limit = 5;
  lastPage = 1;
  search = '';

  ngOnInit() { //Se ejecuta al iniciar el componente
    this.cargarTitularidad(); //Carga los datos desde el servidor
  }

  cargarTitularidad() { 
    this.titularidadService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        this.dataSource.data = res.data; //Guarda los datos recibidos en la tabla
        this.lastPage = Math.ceil(res.total / this.limit); //Calcula cuántas páginas hay en total
      });
  }
  
  filtrar(event: Event) { //Aplica filtro de búsqueda en la tabla
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nextPage() { //Pasa a la página siguiente
    if (this.page < this.lastPage) {
      this.page++;
      this.cargarTitularidad();
    }
  }

  prevPage() { //Vuelve a la página anterior
    if (this.page > 1) {
      this.page--;
      this.cargarTitularidad();
    }
  }

  editTitularidad(user: any) { //Redirige a la edición de Titularidad
    this.router.navigate(['/titularidad/editar', user.id]);
  }

  deleteTitularidad(id: number) { //Elimina una Titularidad
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
          width: '380px',
          disableClose: true      
        });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.titularidadService.deleteTitularidad(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
        });
      }
    });
  }
}//de class