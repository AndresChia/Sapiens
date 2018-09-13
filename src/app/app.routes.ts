import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsejeroComponent } from "./components/bodys/consejero/consejero.component";
import { DirectorComponent } from "./components/bodys/director/director.component";
import { EstudianteComponent } from "./components/bodys/estudiante/estudiante.component";
import { ProfesorComponent } from "./components/bodys/profesor/profesor.component";
import { PageNotFoundComponent } from "./components/bodys/page-not-found/page-not-found.component";
import { EmptyComponent } from "./components/bodys/empty/empty.component";
import { DemandaComponent } from './components/bodys/director/demanda/demanda.component';
import { AsincronasComponent } from './components/bodys/director/asincronas/asincronas.component';
import { PeriodicasComponent } from './components/bodys/director/periodicas/periodicas.component';
import { AdminComponent } from "./components/admin/admin.component";
import { ConsultaDemandaComponent } from "./components/bodys/director/demanda/consulta-demanda/consulta-demanda.component";
import { BuscarComponent } from './components/bodys/consejero/buscar/buscar.component';
import { CasincronasComponent } from './components/bodys/consejero/casincronas/casincronas.component';
import { CperiodicasComponent } from './components/bodys/consejero/cperiodicas/cperiodicas.component';
import { BalertarComponent } from './components/bodys/consejero/buscar/balertar/balertar.component';
import { IaComponent } from './components/bodys/director/ia/ia.component';

const ROUTES: Routes = [
    {
        path: 'consejero/:id', component: ConsejeroComponent,
        children: [
            { path: 'buscar', component: BuscarComponent },
            { path: 'buscar/:id', component: BalertarComponent },
            { path: 'asincrono', component: CasincronasComponent },
            { path: 'periodico', component: CperiodicasComponent },
            { path: '', component: EmptyComponent },
            { path: '**', component: PageNotFoundComponent },
        ]

    },
    {
        path: 'director/:id',
        component: DirectorComponent,
        children: [
            { path: 'demanda', component: DemandaComponent },
            { path: 'asincrono', component: AsincronasComponent },
            { path: 'periodico', component: PeriodicasComponent },
            { path: 'ia', component: IaComponent },
            { path: '', component: EmptyComponent },
            { path: '**', component: PageNotFoundComponent },
        ]
    },


    { path: 'estudiante/:id', component: EstudianteComponent },
    { path: 'profesor/:id', component: ProfesorComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'consultaDemanda', component: ConsultaDemandaComponent },
    { path: 'Home', component: EmptyComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'Home' }

];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
// tslint:disable-next-line:class-name
export class APP_ROUTING { }

