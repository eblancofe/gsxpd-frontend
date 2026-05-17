/**
 * ---------------------------------------------------------------
 *  Archivo:        evaluador-list.component.ts
 *  Descripción:    COMPONENTE->Realiza y muestra el listado paginado de evaluadores externos (ASBO), 
 *                  permitiendo buscarlos, editarlos o eliminarlos desde la interfaz.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 17/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene evaluadores paginados desde el backend con soporte de búsqueda.
 *    - Gestiona paginación, refresco de datos y filtrado por texto.
 *    - Permite editar o eliminar evaluadores desde la lista.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EvaluadorService } from '../../../services/evaluador.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
//import { BotonVolverComponent } from "../../../shared/boton-volver/boton-volver";

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
  selector: 'app-evaluador-list',
  standalone: true,
  templateUrl: './evaluador-list.html',
  styleUrl: './evaluador-list.scss',
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

export class EvaluadorListComponent implements OnInit, AfterViewInit {
  columnas = ['nombre', 'web', 'acciones']; //Define las columnas que se muestran en la tabla
  dataSource = new MatTableDataSource<any>([]); //Fuente de datos para la tabla de Angular Material
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; //Referencia a la paginación

  constructor(
    private evaluadorService: EvaluadorService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngAfterViewInit() { //Asocia el paginador a la fuente de datos después de que la vista se inicializa
    this.dataSource.paginator = this.paginator;
  }
  //Variables para controlar la paginación y búsqueda
  page = 1;
  limit = 5;
  lastPage = 1;
  search = '';

  ngOnInit() { //inicia y carga del componente
    this.cargarEvaluador();
  }

  cargarEvaluador() { //Obtiene la lista de evaluadores del servicio
    this.evaluadorService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        this.dataSource.data = res.data; //Asigna los datos a la tabla
        this.lastPage = Math.ceil(res.total / this.limit); //Calcula el total de páginas
      });
  }

  filtrar(event: Event) { //Filtra/búsqueda evaluadores (AsBo) en la tabla según el texto ingresado
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nextPage() { //siguiente página
    if (this.page < this.lastPage) {
      this.page++;
      this.cargarEvaluador();
    }
  }

  prevPage() { //anterior página
    if (this.page > 1) {
      this.page--;
      this.cargarEvaluador();
    }
  }

  editEvaluador(user: any) { //edición/modificación de evaluador (AsBo)
    this.router.navigate(['/evaluador/editar', user.id]); //Navega a la página de edición del evaluador seleccionado
  }

  deleteEvaluador(id: number) { //Elimina un evaluador (AsBo) tras confirmación del usuario
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
          width: '380px',
          disableClose: true      
        });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.evaluadorService.deleteEvaluador(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
        });
      }
    });
  }  
}//de class
