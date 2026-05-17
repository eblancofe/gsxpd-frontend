/**
 * ---------------------------------------------------------------
 *  Archivo:        expediente-informe.component.ts
 *  Descripción:    COMPONENTE->Realiza, genera y muestra el informe detallado de un expediente concreto. 
 *                  Carga el expediente y todas sus listas asociadas (expertos, direcciones, titulares, 
 *                  tipos de cambio, significatividad y ASBO)y permite visualizar e imprimir/exportar el 
 *                  informe como resultado en formato PDF.
 *  Autor:          Eugenio Blanco Fernández
 *  Universidad:    Universitat Oberta de Catalunya (UOC)
 *  Título Máster:  Máster Universitario en Desarrollo de sitios y aplicaciones Web
 *  Proyecto:       TFM - Sistema de Gestión de Expedientes Digitales (GSXPD)
 *  Fecha creación: 26/03/2026
 *  Última modif.:  18/05/2026
 *
 *  Detalles:
 *    - Obtiene un expediente y todas sus listas asociadas desde el backend.
 *    - Resuelve los nombres relacionados (DG, titularidad, expertos, etc.) a partir de sus IDs.
 *    - Permite visualizar, imprimir y exportar el informe completo en formato PDF.
 * ---------------------------------------------------------------
 */
//Importaciones necesarias de Angular
import { Component, OnInit } from '@angular/core';
import { ExpedienteInformeService } from '../../../services/expediente-informe.service';
import { ExpedientesService } from '../../../services/expedientes.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-expediente-informe',
  standalone: true,  
  templateUrl: './expediente-informe.component.html',
  styleUrls: ['./expediente-informe.component.scss'],
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
export class ExpedienteInformeComponent implements OnInit {
  //declaración de variables necesarias del componente
  expediente: any;
  expertos: any[] = [];
  direcciones: any[] = [];
  titulares: any[] = [];
  tiposCambio: any[] = [];
  significatividad: any[] = [];
  asbo: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private expedientesService: ExpedientesService,
    private cdr: ChangeDetectorRef,
    private svc: ExpedienteInformeService,
    private router: Router
  ) { }

  ngOnInit(): void { //Cargamos e iniciamos el componente
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      console.log('ID recibido:', id);

      if (!id) {
        console.error('ID de expediente no válido');
        return;
      }

      this.svc.getExpedienteConListas(id).subscribe(res => {
        console.log("RAW EXPERTOS:", res.expertos);
        console.log("RAW DIRECCIONES:", res.direcciones);
        console.log("RAW TITULARES:", res.titulares);
        console.log("RAW TIPOS CAMBIO:", res.tiposCambio);
        console.log("RAW SIGNIFICATIVIDAD:", res.significatividad);
        console.log("RAW ASBO:", res.asbo);

        this.expediente = res.expediente;
        this.expertos = this.normalizeList(res.expertos);
        this.direcciones = this.normalizeList(res.direcciones);
        this.titulares = this.normalizeList(res.titulares);
        this.tiposCambio = this.normalizeList(res.tiposCambio);
        this.significatividad = this.normalizeList(res.significatividad);
        this.asbo = this.normalizeList(res.asbo);
        this.cdr.detectChanges();
        
        console.log("NORMALIZADO EXPERTOS:", this.expertos);
        console.log("NORMALIZADO DIRECCIONES:", this.direcciones);
        console.log("NORMALIZADO TITULARES:", this.titulares);
        console.log("NORMALIZADO TIPOS CAMBIO:", this.tiposCambio);
        console.log("NORMALIZADO SIGNIFICATIVIDAD:", this.significatividad);
        console.log("NORMALIZADO ASBO:", this.asbo);
      });
    });
  }

  getNombreDG(): string { //Obtiene el nombre de la unidad organizativa de un expediente
    if (!this.expediente || !this.direcciones?.length) return '';
    const item = this.direcciones.find(d => d.id == Number(this.expediente.nombre_DG));
    return item ? item.nombre_UnidadOrganizativa : '';
  }

  getNombreTitular(): string { //Obtiene el nombre del titular de la línea de un expediente
    if (!this.expediente || !this.titulares?.length) return '';
    const item = this.titulares.find(t => t.id == Number(this.expediente.nombre_Titular_Linea));
    return item ? item.nombre_Titularidad : '';
  }

  getNombreCambioTipo(): string { //Obtiene el nombre del tipo de cambio de un expediente
    if (!this.expediente || !this.tiposCambio?.length) return '';
    const item = this.tiposCambio.find(t => t.id == Number(this.expediente.nombre_Cambio_Tipo));
    return item ? item.nombre_Cambio : '';
  }

  getNombreCambioSignificativo(): string { //Obtiene el nombre del cambio de un expediente
    if (!this.expediente || !this.significatividad?.length) return '';
    const item = this.significatividad.find(s => s.id == Number(this.expediente.nombre_Cambio_Significativo));
    return item ? item.nombre_Significatividad : '';
  }

  getNombreEvaluadorASBO(): string { //Obtiene el nombre del evaluador (AsBo) de un expediente
    if (!this.expediente || !this.asbo?.length) return '';
    const item = this.asbo.find(a => a.id == Number(this.expediente.nombre_Evaluador_ASBO));
    return item ? item.nombre_Evaluador : '';
  }

  getNombresExpertos(): string { //Obtiene el nombre de expertos (EER) de un expediente
    if (
      !this.expediente ||
      !this.expediente.nombre_ExpertoEER ||
      typeof this.expediente.nombre_ExpertoEER !== 'string' ||
      !this.expertos?.length
    ) {
      return '';
    }

    const ids = this.expediente.nombre_ExpertoEER
      .split(',')
      .map((x: string) => Number(x.trim()))
      .filter((n: number) => !isNaN(n));

    const encontrados = this.expertos.filter(e => ids.includes(e.id));

    return encontrados
      .map(e => `${e.nombre_EER} ${e.apellidos_EER}`)
      .join(', ');
  }

  imprimir() { //función imprimir del sistema operativo
    window.print();
  }

  descargarPDF() { //Descarga el informe como PDF
    const element = document.getElementById('informe');
    if (!element) {
      console.error('No se encontró el elemento del informe');
      return;
    }
    const options = {
      margin: 10,
      filename: `informe_${this.expediente.id}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'landscape' as const }
    };
    html2pdf().from(element).set(options).save(); //Genera y posiblita la descarga el PDF
  }

  private normalizeList(list: any): any[] {
    if (!list) return [];
    if (Array.isArray(list)) return list;
    if (list.data && Array.isArray(list.data)) return list.data;
    return [];
  }

  volver_panel() { //Navega de vuelta al panel Informe
    this.router.navigate(['/informe']);
  }
}//de class
