import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { TravelingFormComponent } from './components/traveling-form/traveling-form.component';
import { TravelingTableComponent } from './components/traveling-table/traveling-table.component';
import { TravelingPreviewComponent } from './components/traveling-preview/traveling-preview.component'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CountriesModalComponent } from './components/countries-modal/countries-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TravelingFormComponent,
    TravelingTableComponent,
    TravelingPreviewComponent,
    CountriesModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
