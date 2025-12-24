import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * Application bootstrap entry point.
 * Uses standalone components architecture (Angular 15+).
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
