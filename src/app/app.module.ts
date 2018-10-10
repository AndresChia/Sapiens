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
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material';


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
import { AdminComponent } from './components/admin/admin.component';
import { ConsultaDemandaComponent } from './components/bodys/director/demanda/consulta-demanda/consulta-demanda.component';
import { BuscarComponent } from './components/bodys/consejero/buscar/buscar.component';

import { IaComponent } from './components/bodys/director/ia/ia.component';
import { CrudadminComponent } from './components/admin/crudadmin/crudadmin.component';
import { CrearComponent } from './components/admin/crudadmin/crear/crear.component';
import { EliminarComponent } from './components/admin/crudadmin/eliminar/eliminar.component';
import { EditarComponent } from './components/admin/crudadmin/editar/editar.component';
import { ConsultarComponent } from './components/admin/crudadmin/consultar/consultar.component';
import { HomeComponent } from './components/home/home.component';
import { HistorialCComponent } from './components/bodys/consejero/historial/historial.component';
import { AlertasComponent } from './components/bodys/director/alertas/alertas.component';
import { HistorialComponent } from './components/bodys/director/historial/historial.component';


//servicios
import { LogInService } from "./services/log-in.service";
import { ConsultardemandaService } from "./services/consultardemanda.service";
import { EstudianteRestService } from "./services/serviciosRest/estudiante-rest.service";

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
    FiltroEstudiantesCheckedPipe,
    AdminComponent,
    ConsultaDemandaComponent,
    BuscarComponent,
    IaComponent,
    CrudadminComponent,
    CrearComponent,
    EliminarComponent,
    EditarComponent,
    ConsultarComponent,
    HomeComponent,
    HistorialComponent,
    AlertasComponent,
    HistorialCComponent
  ],
  imports: [
    BrowserModule, NgbModule.forRoot(), APP_ROUTING, AngularFontAwesomeModule, HttpModule,
    HttpClientModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule, MatStepperModule
  ],
  providers: [LogInService, ConsultardemandaService, EstudianteRestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
