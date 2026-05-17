/**
 * ---------------------------------------------------------------
 *  Archivo:        expertos-list.ts
 *  Descripción:    COMPONENTE->Realiza y muestra el listado paginado de expertos internos (EER), 
 *                  permitiendo buscarlos, editarlos o eliminarlos desde la interfaz.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene expertos paginados desde el backend con soporte de búsqueda.
 *    - Gestiona paginación, refresco de datos y filtrado por texto.
 *    - Permite editar o eliminar expertos desde la lista.
 * ---------------------------------------------------------------
 */
//Importaciones básicas de Angular
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExpertosService } from '../../../services/experto.service';
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
  selector: 'app-expertos-list',
  standalone: true,
  templateUrl: './expertos-list.html',
  styleUrl: './expertos-list.scss',
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
export class ExpertosListComponent implements OnInit, AfterViewInit {
  //variables de columnas y la tabla donde escribir los datos
  columnas = ['nombre',	'apellidos', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator; //habilitamos paginación en la tabla

  constructor(
    private expertosService: ExpertosService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  
  ngAfterViewInit() { //asignamos datos antes de iniciar DOM
    this.dataSource.paginator = this.paginator;
  }
  //declaramos variables a utilizar
  page = 1; //empieza en pág.1
  limit = 5; //con límite de 5 registros x pág.
  lastPage = 1; //última pág.1 al inicio
  search = ''; //búsqueda en vacío

  ngOnInit() { //inicia función cargarExpertos()
    this.cargarExpertos();
  }

  cargarExpertos() { //función CARGA DATOS de la tabla Expertos
    this.expertosService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        this.dataSource.data = res.data;   
        this.lastPage = Math.ceil(res.total / this.limit);
      });
  }

  filtrar(event: Event) { //función FILTRAR registro texto en minúscula
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nextPage() { //función ADELANTE página
    if (this.page < this.lastPage) {
      this.page++;
      this.cargarExpertos();
    }
  }

  prevPage() { //función ATRÁS página
    if (this.page > 1) {
      this.page--;
      this.cargarExpertos();
    }
  }

  editExperto(user: any) { //función EDITAR registro Experto (EER)
    this.router.navigate(['/expertos/editar', user.id]);
  }

  deleteExperto(id: number) { //función ELIMINAR registro Experto (EER)
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
          width: '380px',
          disableClose: true      
        });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.expertosService.deleteExperto(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
        });
      }
    });
  }  
}//de class