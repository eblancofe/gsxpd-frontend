/**
 * ---------------------------------------------------------------
 *  Archivo:        users-list.ts
 *  Descripción:    COMPONENTE->Realiza y que muestra el listado paginado de usuarios del sistema, 
 *                  permitiendo buscarlos, editarlos o eliminarlos desde la interfaz.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/03/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *    - Obtiene usuarios desde el backend y calcula el total dinámicamente.
 *    - Gestiona búsqueda, paginación y refresco manual de la vista.
 *    - Permite editar o eliminar usuarios desde la lista.
 * ---------------------------------------------------------------
 */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

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

@Component({ //Define el componente
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.scss'],
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
export class UsersListComponent implements AfterViewInit {
  columnas = ['username', 'email', 'acciones']; //Columnas que se muestran en la tabla
  dataSource = new MatTableDataSource<any>([]); //Fuente de datos para la tabla

  @ViewChild(MatPaginator) paginator!: MatPaginator; //se hace referencia a la paginación

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  ngAfterViewInit() {   //ejecución después de que la vista se haya inicializado
    this.dataSource.paginator = this.paginator;
  }
  //Definición de variables para controlar la paginación y búsqueda
  page = 1;
  limit = 5;
  lastPage = 1;
  search = '';

  ngOnInit() {   //ejecución al iniciar el componente
    this.cargarUsuarios(); 
  }
   
  cargarUsuarios() {
    this.usersService.getAll(this.page, this.limit, this.search)
      .subscribe(response => {
        this.dataSource.data = response.data; //Asigna los datos a la tabla
        //Calcular total de páginas
        this.lastPage = Math.ceil(response.total / this.limit); //calcula el paginado real
      });
  }

  filtrar(event: Event) {   //Aplica filtro de búsqueda en la tabla
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  nextPage() { //ADELANTE siguiente pág.
    if (this.page < this.lastPage) {
      this.page++;
      this.cargarUsuarios();
    }
  }

  prevPage() { //ATRÁS vuelta pág.
    if (this.page > 1) {
      this.page--;
      this.cargarUsuarios();
    }
  }

  editUser(user: any) { //Redirige a la edición del usuario
    this.router.navigate(['/usuarios/editar', user.id]);
  }

  deleteUser(id: number) { //Elimina un usuario    
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '380px',
      disableClose: true      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.deleteUser(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== id);
        });
      }
    });
  }
}//de class