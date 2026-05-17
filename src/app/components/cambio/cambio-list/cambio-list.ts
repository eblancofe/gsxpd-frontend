/**
 * ---------------------------------------------------------------
 *  Archivo:        cambio-list.component.ts
 *  Descripción:    COMPONENTE->Realiza y muestra el listado paginado de tipos de cambios,
 *                  permitiendo buscarlos, editarlos o eliminarlos desde la interfaz.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene tipos de cambio paginados desde el backend con búsqueda.
 *    - Gestiona paginación, refresco de datos y filtrado por texto.
 *    - Permite editar o eliminar registros desde la lista.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CambioService } from '../../../services/cambio.service';
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
  selector: 'app-cambio-list',
  standalone: true,
  templateUrl: './cambio-list.html',
  styleUrl: './cambio-list.scss',
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

export class CambioListComponent implements OnInit, AfterViewInit {
  columnas = ['nombre', 'acciones']; //Columnas a mostrar en la tabla
  dataSource = new MatTableDataSource<any>([]); //Fuente de datos para la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator; //referencia a la paginación

  constructor(
    private cambioService: CambioService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngAfterViewInit() { //Asocia el paginador al dataSource después de que la vista se inicializa
    this.dataSource.paginator = this.paginator;
  }
  //declaración de variables para controlar paginación
  page = 1;
  limit = 5;
  lastPage = 1;
  search = '';

  ngOnInit() { //Carga los datos al iniciar el componente
    this.cargarCambio();
  }

  cargarCambio() { //Carga tipos de cambio desde el servicio
    this.cambioService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        this.dataSource.data = res.data; //asignación de datos
        this.lastPage = Math.ceil(res.total / this.limit); //Calcula últ. página
      });
  }

  filtrar(event: Event) { //Filtra los datos en tiempo real según el texto ingresado
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nextPage() { //siguiente página
    if (this.page < this.lastPage) {
      this.page++;
      this.cargarCambio();
    }
  }

  prevPage() { //anterior página
    if (this.page > 1) {
      this.page--;
      this.cargarCambio();
    }
  }

  editCambio(user: any) { //Navega al formulario de edición del tipo de cambio
    this.router.navigate(['/cambio/editar', user.id]);
  }

  deleteCambio(id: number) { //Elimina un tipo de cambio tras confirmación
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '380px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cambioService.deleteCambio(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
        });
      }
    });
  }
}//de class