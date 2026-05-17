/**
 * ---------------------------------------------------------------
 *  Archivo:        expediente-informe-organizativa.component.ts
 *  Descripción:    COMPONENTE->Realiza, genera informes filtrados por Unidad Organizativa. 
 *                  Carga expedientes desde el backend, obtiene las direcciones disponibles y
 *                  permite filtrar, visualizar e imprimir/exportar los resultados en PDF.
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
import html2pdf from 'html2pdf.js';

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
  selector: 'app-expediente-informe-organizativa',
  standalone: true,  
  templateUrl: './expediente-informe-organizativa.component.html',
  styleUrl: './expediente-informe-organizativa.component.scss',
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
export class ExpedienteInformeOrganizativaComponent implements OnInit {
  //declaración de variables necesarias del componente
  unidadorganizativaSeleccionado: number | null = null;
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
  unidades: any[] = [];
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
    this.cargarOrganizativa(); //primero
    this.cargarTitulares(); //durante
    this.cargarExpedientes(); //después
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

  cargarOrganizativa() { //Carga la lista de Unidad Organizativa desde el servicio
    this.svc.getDirecciones().subscribe(res => {
      this.unidades = Array.isArray(res) ? res : res.data ?? [];
      console.log("UNIDADES CARGADAS:", this.unidades);
    });
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
      this.expedientesOriginales = res.data; //guardamos el original
      this.cargando = false;
      this.cdr.detectChanges(); //Fuerza a Angular a refrescar la vista
    });
  }

  filtrarPorUnidadOrganizativa() { //Filtra expedientes por Unidad Organizativa seleccionada
    if (!this.unidadorganizativaSeleccionado) {
      this.expedientes = [];
      return;
    }
    const uoId = Number(this.unidadorganizativaSeleccionado);
    this.expedientes = this.expedientesOriginales.filter(exp =>
      Number(exp.nombre_DG) === uoId
    );
  }

  getNombreUOrganizativaporId(id: number | null): string { //Obtiene el nombre de la Unidad Organizativa por ID
    if (!id) return '';
    const item = this.unidades.find(u => u.id === id);
    return item ? item.nombre_UnidadOrganizativa : '';
  }
  
  imprimir() { //Imprime la tabla de informe/s en una nueva ventana
    const contenido = document.getElementById('informe');
    if (!contenido) return;

    const ventana = window.open('', '_blank', 'width=1200,height=800');
    if (!ventana) return;

    const html = `
    <html>
      <head>
        <title>Informes de Expedientes por Unidad Organizativa</title>
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
      filename: `informe_expedientes_${this.unidadorganizativaSeleccionado}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    html2pdf() //Genera y posibilita la descarga el PDF
      .from(element)
      .set(options)
      .save()
      .then(() => {
        //Volver a mostrar los botones después
        botones.forEach(b => (b as HTMLElement).style.display = '');
      });
  }
}//de class

