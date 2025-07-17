import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {provideHttpClient} from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient() ]
});
