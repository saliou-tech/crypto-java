import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

import { AcceuilComponent } from './acceuil/acceuil.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CryptoService } from './crypto.service';
import {  HttpClientModule  } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';






@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent
  ],
  imports: [
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule
    //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
