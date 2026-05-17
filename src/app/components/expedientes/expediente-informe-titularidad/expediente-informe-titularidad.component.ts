/**
 * ---------------------------------------------------------------
 *  Archivo:        expediente-informe-titularidad.component.ts
 *  Descripción:    COMPONENTE->Realiza, genera informes filtrados por la titularidad de la línea. 
 *                  Carga expedientes y titulares desde el backend y permite filtrar, visualizar e 
 *                  imprimir/exportar los resultados.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 07/04/2026
 *  Última modif.:  10/04/2026
 *
 *  Detalles:
 *  - Utiliza los servicios ExpedientesService y ExpedienteInformeService para obtener datos de expedientes.
 *  - Implementa filtrado reactivo mediante ngModel y eventos (change).
 *  - Gestiona la visualización del informe y su exportación a PDF utilizando html2pdf.js.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformeService } from '../../../services/informe.service';
import { Router, RouterModule } from '@angular/router';
import { ExpedientesService } from '../../../services/expedientes.service';
import { ExpedienteInformeService } from '../../../services/expediente-informe.service';
import html2pdf from 'html2pdf.js'; //generador de archivos PDF

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
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-expediente-informe-titularidad',
  standalone: true,  
  templateUrl: './expediente-informe-titularidad.component.html',
  styleUrl: './expediente-informe-titularidad.component.scss',
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
    MatSnackBarModule,
    MatTableModule
  ]
})

export class ExpedienteInformeTitularidadComponent implements OnInit {
  //declaración de variables necesarias del componente
  anioSeleccionado: number | null = null;
  titularSeleccionado: number | null = null;
  informes: any[] = [];
  cargando = false;
  expedientesOriginales: any[] = [];
  expedientes: any[] = [];
  expedienteSeleccionado: number | null = null;
  search = '';
  page = 1;
  limit = 10;
  total = 0;
  expediente: any;
  titulares: any[] = [];
  columnas = ['actuacion', 'subactuacion', 'ap', 'fecha', 'titularidad'];

  constructor(
    private expedientesService: ExpedientesService,
    private cdr: ChangeDetectorRef,
    private informeService: InformeService,
    private svc: ExpedienteInformeService,
    private router: Router
  ) { }

  get lastPage() { //Calcula el número total de páginas
    return Math.ceil(this.total / this.limit);
  }
  
  ngOnInit() { //Al iniciar el componente
    //this.loadData();
    //this.cargarInformes();
    this.cargarTitulares(); //Carga la lista de titulares
    this.cargarExpedientes(); //Carga todos los expedientes
  }


  loadData() { //Carga expedientes paginados (usado para búsqueda)
    this.expedientesService.getAll(this.page, this.limit, this.search)
      .subscribe(res => {
        console.log('RESPUESTA BACKEND:', res);
        this.expedientes = res.data;
        this.expediente = res.data;
        this.total = res.total;
        this.cdr.detectChanges(); //Fuerza a Angular a refrescar la vista
      });
  }

  onSearchChange() { //Al cambiar el texto de búsqueda
    this.page = 1;
    this.loadData();
  }

  nextPage() { //siguiente página
    if (this.page < this.lastPage) {
      this.page++;
      this.loadData();
    }
  }

  prevPage() { //anterior página
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

  cargarTitulares() { //Carga la lista de titulares desde el servicio
    this.svc.getTitulares().subscribe(res => {
      this.titulares = Array.isArray(res) ? res : res.data ?? [];
      console.log("TITULARES CARGADOS:", this.titulares);
    });
  }

  getNombreTitular(exp: any): string { //Obtiene el nombre del titular de un expediente
    if (!exp) return '';
    //Si el backend ya trae el nombre resuelto
    if (exp.nombre_Titularidad) return exp.nombre_Titularidad;
    //Si no, buscar en la lista cargada
    const item = this.titulares.find(t => t.id == Number(exp.nombre_Titular_Linea));
    return item ? item.nombre_Titularidad : '';
  }
  
  cargarExpedientes() { //Carga todos los expedientes del sistema
    this.cargando = true;
    this.expedientesService.getAll().subscribe(res => {
      this.expedientesOriginales = res.data; // guardamos el original
      this.cargando = false;
      this.cdr.detectChanges(); //Fuerza a Angular a refrescar la vista
    });
  }
  
  filtrarPorTitularidad() { //Filtra expedientes por titularidad seleccionada
    if (!this.titularSeleccionado) {
      this.expedientes = [];
      return;
    }
    const titularId = Number(this.titularSeleccionado);
    this.expedientes = this.expedientesOriginales.filter(exp =>
      Number(exp.nombre_Titular_Linea) === titularId
    );
  }

  getNombreTitularPorId(id: number | null): string { //Obtiene el nombre de un titular por su ID
    if (!id) return '';
    const item = this.titulares.find(t => t.id === id);
    return item ? item.nombre_Titularidad : '';
  }

  imprimir() { //Imprime la tabla de informe/s en una nueva ventana
    const contenido = document.getElementById('informe');
    if (!contenido) return;

    const ventana = window.open('', '_blank', 'width=1200,height=800');
    if (!ventana) return;

    const html = `
    <html>
      <head>
        <title>Informes de Expedientes por Titularidad de la línea</title>
        <style>
          @page {
            size: A4 landscape;
            margin: 10mm;
          }

          body {
            font-family: Arial, sans-serif;
            margin: 10mm;
          }

          table {
            border-collapse: collapse;
            width: 100%;
            font-size: 12px;
          }

          th, td {
            border: 1px solid #000;
            padding: 4px;
          }

          th {
            background: #eee;
            -webkit-print-color-adjust: exact;
          }
        </style>
      </head>
      <body>
        ${contenido.innerHTML}
      </body>
    </html>
  `;

    ventana.document.documentElement.innerHTML = html;

    //Esperar a que el navegador termine de renderizar
    setTimeout(() => {
      ventana.focus();

      //MUY IMPORTANTE: usar onafterprint para cerrar la ventana
      ventana.onafterprint = () => {
        ventana.close();
      };

      ventana.print();
    }, 300);
  }
  
  descargarPDF() { //Descarga el informe como PDF
    const element = document.getElementById('informe');
    if (!element) {
      console.error('No se encontró el elemento del informe');
      return;
    }

    //Ocultar botones antes de generar el PDF
    const botones = document.querySelectorAll('.no-print');
    botones.forEach(b => (b as HTMLElement).style.display = 'none');

    const options = {
      margin: 10,
      filename: `informe_expediente__titular_${this.getNombreTitularPorId(this.titularSeleccionado)}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    html2pdf() //Genera y descarga el PDF
      .from(element)
      .set(options)
      .save()
      .then(() => {
        // Volver a mostrar los botones después
        botones.forEach(b => (b as HTMLElement).style.display = '');
      });
  }
}//de class
