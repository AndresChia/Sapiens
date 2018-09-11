import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//imports
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';


//routes
import { APP_ROUTING } from "./app.routes";
//componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EstudianteComponent } from './components/bodys/estudiante/estudiante.component';
import { ConsejeroComponent } from './components/bodys/consejero/consejero.component';
import { ProfesorComponent } from './components/bodys/profesor/profesor.component';
import { DirectorComponent } from './components/bodys/director/director.component';
import { PageNotFoundComponent } from './components/bodys/page-not-found/page-not-found.component';
import { EmptyComponent } from './components/bodys/empty/empty.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DemandaComponent } from './components/bodys/director/demanda/demanda.component';
import { AsincronasComponent } from './components/bodys/director/asincronas/asincronas.component';
import { PeriodicasComponent } from './components/bodys/director/periodicas/periodicas.component';
import { AdminComponent } from './components/admin/admin.component';
import { ConsultaPeriodicasComponent } from './components/bodys/director/periodicas/consulta-periodicas/consulta-periodicas.component';
import { ConsultaAsincronasComponent } from './components/bodys/director/asincronas/consulta-asincronas/consulta-asincronas.component';
import { ConsultaDemandaComponent } from './components/bodys/director/demanda/consulta-demanda/consulta-demanda.component';
import { BuscarComponent } from './components/bodys/consejero/buscar/buscar.component';
import { CasincronasComponent } from './components/bodys/consejero/casincronas/casincronas.component';
import { CperiodicasComponent } from './components/bodys/consejero/cperiodicas/cperiodicas.component';

//servicios
import { LogInService } from "./services/log-in.service";
import { ConsultardemandaService } from "./services/consultardemanda.service";


//fonts
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//pipes
import { FiltroEstudiantesCheckedPipe } from './pipes/filtro-estudiantes-checked.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EstudianteComponent,
    ConsejeroComponent,
    ProfesorComponent,
    DirectorComponent,
    PageNotFoundComponent,
    EmptyComponent,
    FooterComponent,
    CarouselComponent,
    LoadingComponent,
    DemandaComponent,
    AsincronasComponent,
    PeriodicasComponent,
    FiltroEstudiantesCheckedPipe,
    AdminComponent,
    ConsultaPeriodicasComponent,
    ConsultaAsincronasComponent,
    ConsultaDemandaComponent,
    BuscarComponent,
    CasincronasComponent,
    CperiodicasComponent
  ],
  imports: [
    BrowserModule, NgbModule.forRoot(), APP_ROUTING, AngularFontAwesomeModule, HttpModule,
    HttpClientModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule
  ],
  providers: [LogInService, ConsultardemandaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
