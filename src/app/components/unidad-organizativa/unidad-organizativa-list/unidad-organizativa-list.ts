/**
 * ---------------------------------------------------------------
 *  Archivo:        unidad-organizativa-list.ts
 *  Descripción:    COMPONENTE->Realiza y que muestra el listado paginado de unidades organizativas,
 *                  permitiendo buscarlas, editarlas o eliminarlas desde la interfaz.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene unidades organizativas paginadas desde el backend.
 *    - Gestiona búsqueda, paginación y refresco de datos.
 *    - Permite editar o eliminar registros desde la lista.
 * ---------------------------------------------------------------
 */
//Componente de Angular para mostrar una lista de las unidades organizativas disponibles
//Muestra los datos en una tabla con paginación, búsqueda y acciones (editar, eliminar)
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UnidadOrganizativaService } from '../../../services/unidad-organizativa.service';
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
  selector: 'app-unidad-organizativa-list',
  standalone: true,
  templateUrl: './unidad-organizativa-list.html',
  styleUrl: './unidad-organizativa-list.scss',
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

export class UnidadOrganizativaListComponent implements OnInit, AfterViewInit {
  columnas = ['nombre', 'acciones']; //Columnas que se muestran en la tabla
  dataSource = new MatTableDataSource<any>([]); //Fuente de datos para la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator; //referencia a la paginación

  constructor(
    private unidadorganizativaService: UnidadOrganizativaService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngAfterViewInit() { //ejecución después de que la vista se haya inicializado
    this.dataSource.paginator = this.paginator; //Asocia la paginación a fuente de datos
  }
  //Variables para controlar la paginación y búsqueda
  page = 1;
  limit = 5;
  lastPage = 1;
  search = '';

  ngOnInit() {
    this.cargarUnidadOrganizativa(); //ejecución al iniciar el componente
  }

  cargarUnidadOrganizativa() { //carga las unidades organizativas desde el servicio
    this.unidadorganizativaService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        this.dataSource.data = res.data; //asigna los datos a la tabla
        this.lastPage = Math.ceil(res.total / this.limit); //calcula el total de páginas
      });
  }

  filtrar(event: Event) { //Aplica filtro de búsqueda en la tabla
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nextPage() { //Pasa a la página siguiente
    if (this.page < this.lastPage) {
      this.page++;
      this.cargarUnidadOrganizativa();
    }
  }

  prevPage() { //Vuelve a la página anterior
    if (this.page > 1) {
      this.page--;
      this.cargarUnidadOrganizativa();
    }
  }

  editUnidadOrganizativa(user: any) { //Redirige a la edición de una unidad organizativa
    this.router.navigate(['/unidad-organizativa/editar', user.id]);
  }

  deleteUnidadOrganizativa(id: number) { //Elimina una unidad organizativa
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
          width: '380px',
          disableClose: true      
        });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.unidadorganizativaService.deleteUnidadOrganizativa(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
        });
      }
    });
  }
}//de class