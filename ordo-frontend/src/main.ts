import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {importProvidersFrom} from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(), withFetch())
  ]
}).catch(err => console.error(err));

