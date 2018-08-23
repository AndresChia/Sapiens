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
import { BusquedaComponent } from "./components/bodys/consejero/busqueda/busqueda.component";
import { AlertaComponent } from "./components/bodys/consejero/alerta/alerta.component";


const ROUTES: Routes = [
    {
        path: 'consejero/:id', component: ConsejeroComponent,
        children: [
            { path: 'busqueda', component: BusquedaComponent },
            { path: 'alertar', component: AlertaComponent },
        ]
    },
    {
        path: 'director/:id',
        component: DirectorComponent,
        children: [
            { path: 'demanda', component: DemandaComponent },
            { path: 'asincrono', component: AsincronasComponent },
            { path: 'periodico', component: PeriodicasComponent },
            { path: '', component: EmptyComponent },
            { path: '**', component: PageNotFoundComponent },
        ]
    },


    { path: 'estudiante/:id', component: EstudianteComponent },
    { path: 'profesor/:id', component: ProfesorComponent },
    { path: '', component: EmptyComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, { useHash: true })],
    exports: [RouterModule]
})
// tslint:disable-next-line:class-name
export class APP_ROUTING { }

