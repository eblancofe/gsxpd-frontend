//Importa librerías necesarias de Angular
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { environment } from './environments/environment';

registerLocaleData(localeEs);

/* #accented.dev# 
Nos muestra un chequeo de nuestra página Web que partes entran en conflicto para tener
en cuenta a la hora de modificar los elementos, para cumplir los requisitos de accesibilidad WCAG
de momento, se deja comentado, si se descomenta, se comprueba y chequea nuestra aplicación Web "GSXPD"
if (!environment.production) {
  const { accented } = await import('accented');
  accented();
}
*/

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ]
})
.catch(err => console.error(err));
